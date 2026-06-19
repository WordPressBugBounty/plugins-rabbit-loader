(function () {
  const config = window.RLConnectProofConfig || {};

  if (!config.admin_ajax || !config.rl_nonce || !config.can_manage_options) {
    return;
  }

  const allowedOrigins = Array.isArray(config.allowed_dashboard_origins)
    ? config.allowed_dashboard_origins
    : [];

  const isAllowedOrigin = (origin) => allowedOrigins.includes(origin);

  const sendResponse = (source, origin, payload) => {
    if (!source || !origin) {
      return;
    }

    source.postMessage(
      {
        type: 'rabbitloader:connect-proof-response',
        source: 'rabbitloader-wordpress-admin',
        ...payload,
      },
      origin,
    );
  };

  window.addEventListener('message', async (event) => {
    const data = event.data || {};
    if (data.type !== 'rabbitloader:connect-proof-request') {
      return;
    }

    if (!isAllowedOrigin(event.origin)) {
      return;
    }

    if (!data.challenge_id || !data.challenge_nonce || !data.site_url) {
      sendResponse(event.source, event.origin, {
        result: false,
        message: 'Missing reconnect challenge data.',
      });
      return;
    }

    try {
      const body = new URLSearchParams({
        action: 'rabbitloader_connect_proof',
        rl_nonce: config.rl_nonce,
        challenge_id: data.challenge_id,
        challenge_nonce: data.challenge_nonce,
        site_url: data.site_url,
      });

      const response = await fetch(config.admin_ajax, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: body.toString(),
      });
      const json = await response.json();

      if (!response.ok || !json || !json.result || !json.redeem_token) {
        sendResponse(event.source, event.origin, {
          result: false,
          challenge_id: data.challenge_id,
          message:
            json && json.data && json.data.message
              ? json.data.message
              : 'Reconnect proof failed.',
        });
        return;
      }

      sendResponse(event.source, event.origin, {
        result: true,
        challenge_id: data.challenge_id,
        redeem_token: json.redeem_token,
        expires_at: json.expires_at || 0,
      });
    } catch (_error) {
      sendResponse(event.source, event.origin, {
        result: false,
        challenge_id: data.challenge_id,
        message: 'Reconnect proof request failed.',
      });
    }
  });
})();
