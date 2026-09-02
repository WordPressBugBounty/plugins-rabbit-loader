<?php

if (!defined('ABSPATH')) {
    exit;
}

final class RL5_Settings
{
    /**
     * Keep the existing RabbitLoader credential option contract.
     * This lets the rebuilt admin remain compatible with the existing runtime/SDK.
     */
    const OPTION_KEY = 'rabbit_loader_wp_options';

    public static function all()
    {
        $value = get_option(self::OPTION_KEY, []);
        return is_array($value) ? $value : [];
    }

    public static function get($key, $default = '')
    {
        $all = self::all();
        return array_key_exists($key, $all) ? $all[$key] : $default;
    }

    public static function api_token()
    {
        return trim((string) self::get('api_token', ''));
    }

    public static function domain()
    {
        return trim((string) self::get('domain', ''));
    }

    public static function did()
    {
        return trim((string) self::get('did', ''));
    }

    public static function is_connected()
    {
        return self::api_token() !== '' && preg_match('/^[a-f0-9]{24}$/i', self::did()) === 1;
    }

    public static function save_connection($api_token, $domain, $did, $cdn_prefix = '')
    {
        $api_token = trim((string) $api_token);
        $domain = strtolower(trim((string) $domain));
        $did = trim((string) $did);

        if ($api_token === '') {
            return new WP_Error('rl_missing_api_token', 'RabbitLoader did not return an API token.');
        }

        if (preg_match('/^[a-f0-9]{24}$/i', $did) !== 1) {
            return new WP_Error('rl_invalid_domain_id', 'RabbitLoader returned an invalid domain ID.');
        }

        if ($domain === '') {
            return new WP_Error('rl_missing_domain', 'Could not determine the WordPress site hostname.');
        }

        $options = self::all();
        $options['api_token'] = $api_token;
        $options['domain'] = $domain;
        $options['did'] = $did;
        $options['comments'] = '';
        $options['token_update_ts'] = time();

        update_option(self::OPTION_KEY, $options, false);

        if ($cdn_prefix !== '') {
            update_option('rabbitloader_cdn_prefix', sanitize_text_field($cdn_prefix), false);
        }

        return true;
    }

    public static function clear_connection()
    {
        $old_did = self::did();
        $options = self::all();
        $options['api_token'] = '';
        $options['domain'] = '';
        $options['did'] = '';
        $options['comments'] = 'user action disconnect';
        $options['token_update_ts'] = time();

        update_option(self::OPTION_KEY, $options, false);
        if ($old_did !== '') {
            delete_transient('rl5_dashboard_' . md5($old_did));
        }
        delete_transient('rabbitloader_trans_overview_data');
    }
}
