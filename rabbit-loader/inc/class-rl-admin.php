<?php

if (!defined('ABSPATH')) {
    exit;
}

final class RL5_Admin
{



    /**
     * Sidebar menu icon: the bunny SVG as a data URI (crisp at any DPI).
     * Uses the brand-blue file directly — simple and always visible.
     */
    private static function menu_icon()
    {
        // White 20x20 bunny — correct for the dark admin menu background.
        $file = RL5_DIR . 'assets/menu-icon.png';
        if (is_readable($file)) {
            return RL5_URL . 'assets/menu-icon.png';
        }
        return 'dashicons-performance';
    }

    private const TABS = [
        'dashboard' => 'Dashboard',
        'optimization' => 'Optimization',
        'usage' => 'Usage',
        'settings' => 'Settings',
        'help' => 'Help',
    ];

    public static function init()
    {
        add_action('admin_menu', [__CLASS__, 'menu']);
        add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue']);

        add_action('wp_ajax_rabbitloader_connect_proof', [__CLASS__, 'ajax_connect_proof']);
        add_action('wp_ajax_rl_connect_proof', [__CLASS__, 'ajax_connect_proof']);

        add_action('wp_ajax_rabbitloader_save_keys', [__CLASS__, 'ajax_save_keys']);
        add_action('wp_ajax_rl_save_keys', [__CLASS__, 'ajax_save_keys']);

        add_action('wp_ajax_rabbitloader_disconnect', [__CLASS__, 'ajax_disconnect']);
        add_action('wp_ajax_rl_disconnect', [__CLASS__, 'ajax_disconnect']);

        add_action('wp_ajax_rabbitloader_purge', [__CLASS__, 'ajax_purge']);
        add_action('wp_ajax_rl_purge', [__CLASS__, 'ajax_purge']);
    }

    public static function menu()
    {
        add_menu_page(
            'RabbitLoader',
            'RabbitLoader',
            'manage_options',
            'rabbitloader',
            [__CLASS__, 'render'],
            self::menu_icon(),
            20
        );
    }

    public static function enqueue($hook)
    {
        if ($hook !== 'toplevel_page_rabbitloader') {
            return;
        }

        wp_enqueue_style(
            'rl6-manrope',
            'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
            [],
            null
        );

        wp_enqueue_style(
            'rl5-admin',
            RL5_URL . 'admin/css/admin.css',
            ['rl6-manrope'],
            RL5_VERSION
        );

        wp_enqueue_script(
            'rl5-connect',
            RL5_URL . 'admin/js/connect.js',
            [],
            RL5_VERSION,
            true
        );

        wp_enqueue_script(
            'rl5-connect-proof',
            RL5_URL . 'admin/js/connect-proof.js',
            ['rl5-connect'],
            RL5_VERSION,
            true
        );

        wp_enqueue_script(
            'rl5-admin',
            RL5_URL . 'admin/js/admin.js',
            ['rl5-connect-proof'],
            RL5_VERSION,
            true
        );

        $allowed_origins = ['https://dash.rabbitloader.com'];

        if (defined('WP_DEBUG') && WP_DEBUG) {
            $allowed_origins[] = 'https://dash.rabbitloader.local';
            $allowed_origins[] = 'http://localhost:3000';
        }

        wp_localize_script('rl5-connect', 'RL5Config', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('rl-ajax-nonce'),
            'homeUrl' => home_url(),
            'dashboardUrl' => admin_url('admin.php?page=rabbitloader'),
            'connectBaseUrl' => 'https://dash.rabbitloader.com/connect',
            'allowedOrigins' => $allowed_origins,
            'connected' => RL5_Settings::is_connected(),
            'debug' => defined('WP_DEBUG') && WP_DEBUG,
        ]);

        // admin.js (dashboard actions like Purge) uses its OWN config object.
        // MUST NOT reuse 'RL5Config' — that would overwrite connect's allowedOrigins
        // and silently break the connect handshake.
        wp_localize_script('rl5-admin', 'RL5AdminConfig', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('rl-ajax-nonce'),
            'homeUrl' => home_url(),
        ]);
    }

    public static function render()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        if (!RL5_Settings::is_connected()) {
            include RL5_DIR . 'admin/views/connect.php';
            return;
        }

        $tab = isset($_GET['tab']) ? sanitize_key(wp_unslash($_GET['tab'])) : 'dashboard';
        if (!isset(self::TABS[$tab])) {
            $tab = 'dashboard';
        }

        $tabs = self::TABS;
        $domain = RL5_Settings::domain();
        $did = RL5_Settings::did();

        // Keep using the already-working overview data for screens that need account/performance context.
        $dashboard = in_array($tab, ['dashboard', 'optimization', 'usage'], true)
            ? RL5_Entitlement::dashboard_data()
            : [];

        $view_file = RL5_DIR . 'admin/views/' . $tab . '.php';

        include RL5_DIR . 'admin/views/partials/header.php';

        if (is_readable($view_file)) {
            include $view_file;
        }

        include RL5_DIR . 'admin/views/partials/footer.php';
    }

    public static function ajax_connect_proof()
    {
        self::require_admin_nonce();

        $challenge_id = self::post_text(['challenge_id', 'challengeId']);
        $challenge_nonce = self::post_text(['challenge_nonce', 'challengeNonce']);
        $site_url = self::post_url(['site_url', 'siteUrl']);

        if ($challenge_id === '' || $challenge_nonce === '' || $site_url === '') {
            self::json_error('Missing reconnect challenge data.', 400, [
                'received' => [
                    'challenge_id' => $challenge_id !== '',
                    'challenge_nonce' => $challenge_nonce !== '',
                    'site_url' => $site_url !== '',
                ],
            ]);
        }

        $site_host = self::normalize_host($site_url);
        $home_host = self::normalize_host(home_url());

        if ($site_host === '' || $home_host === '' || $site_host !== $home_host) {
            self::json_error('Reconnect challenge site mismatch.', 400, [
                'site_host' => $site_host,
                'home_host' => $home_host,
            ]);
        }

        $api = new RL5_API();
        $response = $api->redeem_connect_proof($challenge_id, $challenge_nonce, home_url());

        if (is_wp_error($response)) {
            $error_data = $response->get_error_data();
            $status = is_array($error_data) && !empty($error_data['status']) ? (int) $error_data['status'] : 502;

            self::json_error(
                $response->get_error_message(),
                ($status >= 400 && $status <= 599) ? $status : 502,
                ['backend_status' => $status]
            );
        }

        if (empty($response['result']) || empty($response['redeem_token'])) {
            self::json_error('Reconnect challenge was not accepted.', 400);
        }

        wp_send_json([
            'result' => true,
            'challenge_id' => $challenge_id,
            'site_url' => home_url(),
            'redeem_token' => sanitize_text_field((string) $response['redeem_token']),
            'expires_at' => !empty($response['expires_at']) ? (int) $response['expires_at'] : 0,
        ], 200);
    }

    public static function ajax_save_keys()
    {
        self::merge_json_body_into_post();
        self::require_admin_nonce();

        $encoded = self::post_text(['rl-token', 'token']);

        if ($encoded === '') {
            self::json_error('RabbitLoader connection token is missing.', 400);
        }

        $decoded = self::decode_connection_token($encoded);

        if (!is_array($decoded)) {
            self::json_error('RabbitLoader connection token could not be decoded.', 400);
        }

        $api_token = !empty($decoded['api_token']) ? (string) $decoded['api_token'] : '';
        $did = !empty($decoded['did']) ? (string) $decoded['did'] : (!empty($decoded['domain_id']) ? (string) $decoded['domain_id'] : '');
        $cdn_prefix = !empty($decoded['cdn_prefix']) ? (string) $decoded['cdn_prefix'] : '';

        $host = wp_parse_url(home_url(), PHP_URL_HOST);
        $host = is_string($host) ? strtolower($host) : '';

        $saved = RL5_Settings::save_connection($api_token, $host, $did, $cdn_prefix);

        if (is_wp_error($saved)) {
            self::json_error($saved->get_error_message(), 400, [
                'token_fields' => array_values(array_map('sanitize_key', array_keys($decoded))),
            ]);
        }

        delete_transient('rl5_dashboard_' . md5($did));
        delete_transient('rabbitloader_trans_overview_data');

        do_action('rl_site_connected');

        wp_send_json([
            'result' => true,
            'is_connected' => true,
            'domain' => $host,
            'did' => $did,
            'redirect_url' => admin_url('admin.php?page=rabbitloader'),
        ], 200);
    }

    public static function ajax_disconnect()
    {
        self::require_admin_nonce();

        do_action('rl_site_disconnecting');
        RL5_Settings::clear_connection();

        wp_send_json([
            'result' => true,
            'is_connected' => false,
            'redirect_url' => admin_url('admin.php?page=rabbitloader'),
        ], 200);
    }

    /**
     * Purge all pages: tells the backend to clear Cloudflare cache + rebuild.
     * Plugin just fires the request; backend does the work.
     */
    public static function ajax_purge()
    {
        self::require_admin_nonce();

        $api = new RL5_API();
        $response = $api->purge();

        if (is_wp_error($response)) {
            $error_data = $response->get_error_data();
            $status = is_array($error_data) && !empty($error_data['status']) ? (int) $error_data['status'] : 502;
            self::json_error(
                $response->get_error_message(),
                ($status >= 400 && $status <= 599) ? $status : 502
            );
        }

        // Backend accepted the purge. Clear local overview cache so the
        // dashboard reflects the fresh state on next load.
        delete_transient('rl5_dashboard_' . md5(RL5_Settings::did()));
        delete_transient('rabbitloader_trans_overview_data');

        wp_send_json([
            'result' => true,
            'message' => 'Purge started. Your pages will be cleared and rebuilt shortly.',
        ], 200);
    }

    private static function require_admin_nonce()
    {
        if (!current_user_can('manage_options')) {
            self::json_error('You are not allowed to manage RabbitLoader.', 403);
        }

        $nonce = self::post_text(['rl_nonce', '_ajax_nonce']);

        if ($nonce === '' || !wp_verify_nonce($nonce, 'rl-ajax-nonce')) {
            self::json_error('RabbitLoader security nonce is invalid or expired.', 403);
        }
    }

    private static function merge_json_body_into_post()
    {
        $raw = file_get_contents('php://input');
        if (!$raw) {
            return;
        }

        $json = json_decode($raw, true);
        if (!is_array($json)) {
            return;
        }

        foreach ($json as $key => $value) {
            if (!array_key_exists($key, $_POST)) {
                $_POST[$key] = $value;
            }
        }
    }

    private static function post_text($keys)
    {
        foreach ($keys as $key) {
            if (isset($_POST[$key]) && !is_array($_POST[$key])) {
                return sanitize_text_field(wp_unslash($_POST[$key]));
            }
        }

        return '';
    }

    private static function post_url($keys)
    {
        foreach ($keys as $key) {
            if (isset($_POST[$key]) && !is_array($_POST[$key])) {
                return esc_url_raw(wp_unslash($_POST[$key]));
            }
        }

        return '';
    }

    private static function normalize_host($url)
    {
        $host = wp_parse_url($url, PHP_URL_HOST);

        if (!$host && is_string($url) && strpos($url, '://') === false) {
            $host = wp_parse_url('https://' . ltrim($url, '/'), PHP_URL_HOST);
        }

        if (!$host) {
            return '';
        }

        $host = strtolower(trim((string) $host));
        $host = preg_replace('/^www\./i', '', $host);
        return rtrim($host, '.');
    }

    private static function decode_connection_token($encoded)
    {
        $encoded = trim((string) $encoded);

        $decoded = base64_decode($encoded, true);

        if ($decoded === false) {
            $normalized = strtr($encoded, '-_', '+/');
            $padding = strlen($normalized) % 4;
            if ($padding) {
                $normalized .= str_repeat('=', 4 - $padding);
            }
            $decoded = base64_decode($normalized, true);
        }

        if ($decoded === false || $decoded === '') {
            return null;
        }

        $payload = json_decode($decoded, true);
        return is_array($payload) ? $payload : null;
    }

    private static function json_error($message, $status = 400, $extra = [])
    {
        $body = [
            'result' => false,
            'message' => sanitize_text_field((string) $message),
        ];

        if (!empty($extra) && is_array($extra)) {
            $body['debug'] = $extra;
        }

        wp_send_json($body, $status);
        exit;
    }
}
