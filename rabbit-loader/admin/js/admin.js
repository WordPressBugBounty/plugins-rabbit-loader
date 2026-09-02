(function () {
    'use strict';

    function toast(message) {
        var el = document.getElementById('rl6-toast');
        if (!el) {
            return;
        }

        el.textContent = message;
        el.classList.add('is-visible');

        window.clearTimeout(toast.timer);
        toast.timer = window.setTimeout(function () {
            el.classList.remove('is-visible');
        }, 4200);
    }

    function closeModal() {
        var modal = document.getElementById('rl6-modal');
        var body = document.getElementById('rl6-modal-body');

        if (modal) {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
        }

        if (body) {
            body.innerHTML = '';
        }
    }

    function openVideo(videoId) {
        var modal = document.getElementById('rl6-modal');
        var body = document.getElementById('rl6-modal-body');

        if (!modal || !body || !videoId) {
            return;
        }

        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?rel=0';
        iframe.title = 'RabbitLoader help video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.className = 'rl6-video-frame';

        body.appendChild(iframe);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var disconnect = document.getElementById('rl5-disconnect-button');

        if (disconnect) {
            disconnect.addEventListener('click', async function (event) {
                event.preventDefault();

                if (!window.confirm('Disconnect this WordPress site from RabbitLoader?')) {
                    return;
                }

                disconnect.disabled = true;
                var original = disconnect.textContent;
                disconnect.textContent = 'Disconnecting…';

                try {
                    var cfg = window.RL5AdminConfig || window.RL5Config || {};
                    var params = new URLSearchParams({
                        action: 'rabbitloader_disconnect',
                        rl_nonce: cfg.nonce || ''
                    });

                    var response = await fetch(cfg.ajaxUrl, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        body: params.toString()
                    });

                    var body = await response.json();

                    if (!response.ok || !body || body.result !== true) {
                        throw new Error(body && body.message ? body.message : 'Disconnect failed.');
                    }

                    window.location.assign(body.redirect_url || cfg.dashboardUrl || window.location.href);
                } catch (error) {
                    disconnect.disabled = false;
                    disconnect.textContent = original;
                    window.alert(error && error.message ? error.message : 'Disconnect failed.');
                }
            });
        }

        var refresh = document.getElementById('rl5-refresh-dashboard');
        if (refresh) {
            refresh.addEventListener('click', function (event) {
                event.preventDefault();
                window.location.reload();
            });
        }

        var purge = document.getElementById('rl5-purge-all');
        if (purge) {
            purge.addEventListener('click', async function (event) {
                event.preventDefault();

                if (!window.confirm('Purge all pages? This clears the optimized cache for every page on this site and rebuilds them. It may briefly increase load on your server.')) {
                    return;
                }

                var status = document.getElementById('rl5-purge-status');
                purge.disabled = true;
                var original = purge.textContent;
                purge.textContent = 'Purging…';
                if (status) { status.textContent = ''; }

                try {
                    var cfg = window.RL5AdminConfig || window.RL5Config || {};
                    var params = new URLSearchParams({
                        action: 'rabbitloader_purge',
                        rl_nonce: cfg.nonce || ''
                    });

                    var response = await fetch(cfg.ajaxUrl, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        body: params.toString()
                    });

                    var body = await response.json();

                    if (!response.ok || !body || body.result !== true) {
                        throw new Error(body && body.message ? body.message : 'Purge failed.');
                    }

                    if (status) { status.textContent = body.message || 'Purge started.'; }
                    toast(body.message || 'Purge started.');
                } catch (error) {
                    if (status) { status.textContent = ''; }
                    window.alert(error && error.message ? error.message : 'Purge failed.');
                } finally {
                    purge.disabled = false;
                    purge.textContent = original;
                }
            });
        }

        document.querySelectorAll('.rl6-ui-preview').forEach(function (button) {
            button.addEventListener('click', function () {
                toast(button.getAttribute('data-message') || 'This control will be wired after the UI is approved.');
            });
        });

        document.querySelectorAll('.rl6-profile-card').forEach(function (card) {
            card.addEventListener('click', function () {
                document.querySelectorAll('.rl6-profile-card').forEach(function (item) {
                    item.classList.remove('is-selected');
                });
                card.classList.add('is-selected');
                toast((card.getAttribute('data-rl6-profile') || 'Profile') + ' selected for UI preview only. No live setting was changed.');
            });
        });

        document.querySelectorAll('.rl6-video-card').forEach(function (card) {
            card.addEventListener('click', function () {
                openVideo(card.getAttribute('data-video-id') || '');
            });
        });

        document.querySelectorAll('[data-rl6-close-modal]').forEach(function (button) {
            button.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        var copy = document.getElementById('rl6-copy-diagnostics');
        if (copy) {
            copy.addEventListener('click', async function () {
                var value = copy.getAttribute('data-diagnostics') || '';

                try {
                    var parsed = JSON.parse(value);
                    var text = Object.keys(parsed).map(function (key) {
                        return key + ': ' + parsed[key];
                    }).join('\n');

                    await navigator.clipboard.writeText(text);
                    toast('Diagnostics copied.');
                } catch (error) {
                    toast('Could not copy diagnostics.');
                }
            });
        }
    });
})();
