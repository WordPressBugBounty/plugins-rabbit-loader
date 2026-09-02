(function () {
    'use strict';

    function cfg() {
        return window.RL5Config || {};
    }

    function setStatus(message, type) {
        var el = document.getElementById('rl5-connect-status');
        if (!el) {
            return;
        }

        el.textContent = message || '';
        el.dataset.type = type || '';
    }

    function openConnectPopup(event) {
        if (event) {
            event.preventDefault();
        }

        var config = cfg();
        var button = document.getElementById('rl5-connect-button');

        if (!button) {
            return;
        }

        var url = new URL(config.connectBaseUrl || 'https://dash.rabbitloader.com/connect');
        url.searchParams.set('site_url', window.location.origin);
        url.searchParams.set('redirect_url', window.location.href);
        url.searchParams.set('source', 'wordpress');
        url.searchParams.set('action', 'connect');

        var width = 600;
        var height = 700;
        var left = Math.max(0, Math.round((window.screen.width - width) / 2));
        var top = Math.max(0, Math.round((window.screen.height - height) / 2));

        var popup = window.open(
            url.toString(),
            'Connect',
            [
                'width=' + width,
                'height=' + height,
                'left=' + left,
                'top=' + top,
                'resizable=yes',
                'scrollbars=yes'
            ].join(',')
        );

        if (!popup) {
            setStatus('The login popup was blocked by the browser.', 'error');
            return;
        }

        button.disabled = true;
        button.dataset.originalLabel = button.textContent;
        button.textContent = 'Waiting for RabbitLoader…';
        setStatus('Complete the RabbitLoader login in the popup.', 'info');

        var timer = window.setInterval(function () {
            if (!popup || popup.closed) {
                window.clearInterval(timer);

                if (!window.RL5ConnectionCompleted) {
                    button.disabled = false;
                    button.textContent = button.dataset.originalLabel || 'Connect RabbitLoader';
                    setStatus('Popup closed. You can try connecting again.', 'info');
                }
            }
        }, 500);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var button = document.getElementById('rl5-connect-button');
        if (button) {
            button.addEventListener('click', openConnectPopup);
        }
    });

    window.RL5ConnectUI = {
        status: setStatus
    };
})();
