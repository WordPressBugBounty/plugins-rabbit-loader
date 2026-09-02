<?php

if (!defined('ABSPATH')) {
    exit;
}

final class RL5_API
{
    private $host_v1;
    private $host_v2;

    public function __construct()
    {
        $override = '';

        if (defined('RL_PHP_SDK_HOST') && is_string(RL_PHP_SDK_HOST)) {
            $override = RL_PHP_SDK_HOST;
        } elseif (getenv('RL_PHP_SDK_HOST')) {
            $override = (string) getenv('RL_PHP_SDK_HOST');
        } elseif (!empty($_ENV['RL_PHP_SDK_HOST'])) {
            $override = (string) $_ENV['RL_PHP_SDK_HOST'];
        }

        if ($override !== '') {
            $override = trailingslashit($override);
            $this->host_v1 = $override;
            $this->host_v2 = $override;
        } else {
            $this->host_v1 = 'https://api-v1.rabbitloader.com/';
            $this->host_v2 = 'https://api-v2.rabbitloader.com/';
        }
    }

    public function overview()
    {
        if (!RL5_Settings::is_connected()) {
            return new WP_Error('rl_not_connected', 'RabbitLoader credentials are incomplete.');
        }

        $query = [
            'domain' => RL5_Settings::domain(),
            'plugin_cms' => 'wp',
            'plugin_v' => RL5_VERSION,
            'cms_v' => get_bloginfo('version'),
        ];

        $url = add_query_arg($query, $this->host_v1 . 'api/v1/report/overview');

        return $this->request_json('GET', $url, [
            'Authorization' => 'Bearer ' . RL5_Settings::api_token(),
            'Accept' => 'application/json',
        ]);
    }

    /**
     * POST domain/heartbeat. Registers the site as live, clears
     * domain_flags.plugin_uninstalled, refreshes plugin_instance_rec, and
     * drives URL discovery on the backend.
     *
     * Body always includes domain/plugin_cms/plugin_v/cms_v (matches old
     * callPOSTAPI). $extra merges in disconnect/uninstall flags when needed.
     *
     * @param array $extra Optional extra body fields (e.g. ['disconnect'=>1]).
     * @return array|WP_Error
     */
    public function heartbeat($extra = [])
    {
        if (!RL5_Settings::is_connected()) {
            return new WP_Error('rl_not_connected', 'RabbitLoader credentials are incomplete.');
        }

        $body = array_merge([
            'domain' => RL5_Settings::domain(),
            'plugin_cms' => 'wp',
            'plugin_v' => RL5_VERSION,
            'cms_v' => get_bloginfo('version'),
            // Backend reads these: cdn_loop auto-tags Cloudflare/Incapsula.
            'cdn_loop' => isset($_SERVER['HTTP_CDN_LOOP']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_CDN_LOOP'])) : '',
            'server_addr' => isset($_SERVER['SERVER_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['SERVER_ADDR'])) : '',
        ], is_array($extra) ? $extra : []);

        // IMPORTANT: heartbeat must be FORM-encoded (like the old callPOSTAPI),
        // not JSON. The apiv1-php handler reads fields from $request (form POST).
        // Passing an array body to wp_remote_post form-encodes it.
        return $this->request_form('POST', $this->host_v1 . 'api/v1/domain/heartbeat', [
            'Authorization' => 'Bearer ' . RL5_Settings::api_token(),
            'Accept' => 'application/json',
        ], $body);
    }

    /**
     * POST with a form-encoded body (array). Mirrors old plugin's callPOSTAPI.
     */
    private function request_form($method, $url, $headers, $body)
    {
        $response = wp_remote_post($url, [
            'method' => strtoupper($method),
            'timeout' => 30,
            'headers' => $headers,
            'body' => $body, // array → WP form-encodes
        ]);

        if (is_wp_error($response)) {
            return $response;
        }

        $status = (int) wp_remote_retrieve_response_code($response);
        $decoded = json_decode((string) wp_remote_retrieve_body($response), true);

        if (!is_array($decoded)) {
            return new WP_Error('rl_non_json_response', 'RabbitLoader returned a non-JSON response.', ['status' => $status]);
        }
        if ($status < 200 || $status >= 300) {
            $message = !empty($decoded['message']) ? sanitize_text_field((string) $decoded['message']) : 'RabbitLoader API request failed.';
            return new WP_Error('rl_api_http_error', $message, ['status' => $status, 'response' => $decoded]);
        }
        return $decoded;
    }

    /**
     * Trigger a full purge + re-optimize on the backend.
     * Plugin only sends the Bearer token; backend resolves the domain,
     * clears Cloudflare cache, and rebuilds pages.
     *
     * Endpoint: api/v1/?api_entity=purge&api_action=request
     * (VERIFY api_action against index.php when testing; change the constant below if wrong.)
     *
     * @return array|WP_Error
     */
    public function purge()
    {
        if (!RL5_Settings::is_connected()) {
            return new WP_Error('rl_not_connected', 'RabbitLoader credentials are incomplete.');
        }

        $url = add_query_arg(
            ['api_entity' => 'purge', 'api_action' => 'request'],
            $this->host_v1 . 'api/v1/'
        );

        // Empty body = full purge (/*). Backend handles CDN + re-optimize.
        return $this->request_form('POST', $url, [
            'Authorization' => 'Bearer ' . RL5_Settings::api_token(),
            'Accept' => 'application/json',
        ], [
            'purge_source' => 'wp_plugin_manual',
        ]);
    }

    public function redeem_connect_proof($challenge_id, $challenge_nonce, $site_url)
    {
        $url = $this->host_v2 . 'domain/v2/reconnect-challenge/redeem';

        return $this->request_json('POST', $url, [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ], [
            'challenge_id' => $challenge_id,
            'challenge_nonce' => $challenge_nonce,
            'site_url' => $site_url,
            'plugin_version' => RL5_VERSION,
            'wp_admin_url' => admin_url('admin.php?page=rabbitloader'),
        ], false);
    }

    private function request_json($method, $url, $headers = [], $body = null, $require_result = true)
    {
        $args = [
            'method' => strtoupper($method),
            'timeout' => 30,
            'headers' => $headers,
        ];

        if ($body !== null) {
            $args['body'] = wp_json_encode($body);
        }

        $response = wp_remote_request($url, $args);

        if (is_wp_error($response)) {
            return $response;
        }

        $status = (int) wp_remote_retrieve_response_code($response);
        $raw = (string) wp_remote_retrieve_body($response);
        $decoded = json_decode($raw, true);

        if (!is_array($decoded)) {
            return new WP_Error(
                'rl_non_json_response',
                'RabbitLoader returned a non-JSON response.',
                ['status' => $status]
            );
        }

        if ($status < 200 || $status >= 300) {
            $message = !empty($decoded['message'])
                ? sanitize_text_field((string) $decoded['message'])
                : 'RabbitLoader API request failed.';

            return new WP_Error(
                'rl_api_http_error',
                $message,
                ['status' => $status, 'response' => $decoded]
            );
        }

        if ($require_result && array_key_exists('result', $decoded) && empty($decoded['result'])) {
            $message = !empty($decoded['message'])
                ? sanitize_text_field((string) $decoded['message'])
                : 'RabbitLoader API rejected the request.';

            return new WP_Error(
                'rl_api_result_error',
                $message,
                ['status' => $status, 'response' => $decoded]
            );
        }

        return $decoded;
    }
}
