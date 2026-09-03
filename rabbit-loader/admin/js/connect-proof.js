(function () {
    'use strict';

    var savingToken = false;
    var proofInFlight = false;

    // If the dashboard delivers a token but saving stalls, don't sit on
    // "Saving…" forever. Fail open into a retry after this many ms.
    var SAVE_TIMEOUT_MS = 20000;

    function config() {
        return window.RL5Config || {};
    }

    function debug() {
        var cfg = config();
        if (!cfg.debug || !window.console) {
            return;
        }
        var args = Array.prototype.slice.call(arguments);
        args.unshift('[RabbitLoader connect]');
        console.log.apply(console, args);
    }

    function status(message, type) {
        if (window.RL5ConnectUI && typeof window.RL5ConnectUI.status === 'function') {
            window.RL5ConnectUI.status(message, type);
        }
    }

    function resetConnectButton() {
        var button = document.getElementById('rl5-connect-button');
        if (button) {
            button.disabled = false;
            button.textContent = button.dataset.originalLabel || 'Connect RabbitLoader';
        }
    }

    function parseMessage(raw) {
        if (raw && typeof raw === 'object') {
            return raw;
        }

        if (typeof raw === 'string') {
            try {
                var parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch (e) {
                return {};
            }
        }

        return {};
    }

    function layers(data) {
        var out = [data];
        ['payload', 'data', 'detail', 'message'].forEach(function (key) {
            if (data && data[key] && typeof data[key] === 'object') {
                out.push(data[key]);
            }
        });
        return out;
    }

    function field(data, names) {
        var candidates = layers(data);

        for (var i = 0; i < candidates.length; i++) {
            for (var j = 0; j < names.length; j++) {
                var value = candidates[i][names[j]];
                if (value !== undefined && value !== null && String(value).trim() !== '') {
                    return String(value);
                }
            }
        }

        return '';
    }

    function allowedOrigin(origin) {
        var allowed = config().allowedOrigins || [];
        return allowed.indexOf(origin) !== -1;
    }

    async function readJsonResponse(response) {
        var text = await response.text();
        var body = {};

        try {
            body = text ? JSON.parse(text) : {};
        } catch (e) {
            body = {
                result: false,
                message: text || ('HTTP ' + response.status)
            };
        }

        return {
            response: response,
            body: body
        };
    }

    // Rejects if the fetch doesn't settle within `ms`. Lets a stalled save
    // surface as a clear retry instead of an endless "Saving…" spinner.
    function withTimeout(promise, ms, message) {
        return new Promise(function (resolve, reject) {
            var timer = window.setTimeout(function () {
                reject(new Error(message || 'Request timed out.'));
            }, ms);

            promise.then(
                function (value) {
                    window.clearTimeout(timer);
                    resolve(value);
                },
                function (error) {
                    window.clearTimeout(timer);
                    reject(error);
                }
            );
        });
    }

    async function postForm(values) {
        var cfg = config();
        var params = new URLSearchParams();

        Object.keys(values).forEach(function (key) {
            if (values[key] !== undefined && values[key] !== null) {
                params.set(key, String(values[key]));
            }
        });

        var response = await fetch(cfg.ajaxUrl, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: params.toString()
        });

        return readJsonResponse(response);
    }

    async function handleProof(event, data) {
        if (proofInFlight) {
            return;
        }

        var cfg = config();
        var challengeId = field(data, ['challenge_id', 'challengeId']);
        var challengeNonce = field(data, ['challenge_nonce', 'challengeNonce']);
        var siteUrl = field(data, ['site_url', 'siteUrl']) || cfg.homeUrl || '';

        debug('proof message', {
            origin: event.origin,
            challenge_id_present: !!challengeId,
            challenge_nonce_present: !!challengeNonce,
            site_url: siteUrl
        });

        if (!challengeId || !challengeNonce || !siteUrl) {
            status('RabbitLoader sent an incomplete reconnect challenge.', 'error');

            if (event.source && typeof event.source.postMessage === 'function') {
                event.source.postMessage({
                    type: 'rabbitloader:connect-proof-response',
                    source: 'rabbitloader-wordpress-plugin',
                    result: false,
                    success: false,
                    challenge_id: challengeId,
                    site_url: siteUrl,
                    message: 'Incomplete reconnect challenge.'
                }, event.origin);
            }
            return;
        }

        proofInFlight = true;
        status('Verifying this WordPress site…', 'info');

        try {
            var result = await postForm({
                action: 'rabbitloader_connect_proof',
                rl_nonce: cfg.nonce || '',
                challenge_id: challengeId,
                challenge_nonce: challengeNonce,
                site_url: siteUrl
            });

            debug('proof ajax', result.response.status, result.body);

            if (!result.response.ok || !result.body || result.body.result !== true || !result.body.redeem_token) {
                throw new Error(
                    result.body && result.body.message
                        ? result.body.message
                        : 'WordPress could not redeem the RabbitLoader reconnect challenge.'
                );
            }

            if (event.source && typeof event.source.postMessage === 'function') {
                event.source.postMessage({
                    type: 'rabbitloader:connect-proof-response',
                    source: 'rabbitloader-wordpress-plugin',
                    result: true,
                    success: true,
                    challenge_id: challengeId,
                    site_url: result.body.site_url || siteUrl,
                    redeem_token: result.body.redeem_token,
                    expires_at: result.body.expires_at || 0
                }, event.origin);
            }

            status('Site verified. Finishing RabbitLoader connection…', 'success');
        } catch (error) {
            debug('proof failed', error);

            if (event.source && typeof event.source.postMessage === 'function') {
                event.source.postMessage({
                    type: 'rabbitloader:connect-proof-response',
                    source: 'rabbitloader-wordpress-plugin',
                    result: false,
                    success: false,
                    challenge_id: challengeId,
                    site_url: siteUrl,
                    message: error && error.message ? error.message : 'Reconnect proof failed.'
                }, event.origin);
            }

            status(error && error.message ? error.message : 'Reconnect proof failed.', 'error');
        } finally {
            proofInFlight = false;
        }
    }

    async function handleFinalToken(data) {
        if (savingToken) {
            return;
        }

        var token = field(data, ['token', 'rl-token', 'rl_token']);

        if (!token) {
            return;
        }

        savingToken = true;
        status('Saving RabbitLoader connection…', 'info');

        try {
            var cfg = config();
            var result = await withTimeout(
                postForm({
                    action: 'rabbitloader_save_keys',
                    rl_nonce: cfg.nonce || '',
                    'rl-token': token
                }),
                SAVE_TIMEOUT_MS,
                'Login completed but saving timed out. Please click Connect again.'
            );

            debug('save token ajax', result.response.status, result.body);

            if (!result.response.ok || !result.body || result.body.result !== true) {
                throw new Error(
                    result.body && result.body.message
                        ? result.body.message
                        : 'RabbitLoader login completed, but WordPress could not save the connection.'
                );
            }

            window.RL5ConnectionCompleted = true;
            status('Connected. Loading your RabbitLoader dashboard…', 'success');

            window.setTimeout(function () {
                window.location.assign(result.body.redirect_url || cfg.dashboardUrl || window.location.href);
            }, 150);
        } catch (error) {
            savingToken = false;
            debug('save token failed', error);
            status(error && error.message ? error.message : 'Could not save RabbitLoader connection.', 'error');
            resetConnectButton();
        }
    }

    window.addEventListener('message', function (event) {
        if (!allowedOrigin(event.origin)) {
            return;
        }

        var data = parseMessage(event.data);
        var type = field(data, ['type']);

        debug('message', event.origin, type, data);

        if (type === 'rabbitloader:connect-proof-request') {
            void handleProof(event, data);
            return;
        }

        if (type === 'rabbitloader:connect') {
            void handleFinalToken(data);
            return;
        }

        // Fallback: some dashboard builds deliver the credentials under a
        // different message type. If any message from an allowed origin
        // carries a token, treat it as the final connect step.
        var maybeToken = field(data, ['token', 'rl-token', 'rl_token']);
        if (maybeToken) {
            debug('final token via fallback type', type);
            void handleFinalToken(data);
        }
    });
})();
