<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Heartbeat manager.
 *
 * The heartbeat is what makes the backend treat this site as LIVE:
 *  - clears domain_flags.plugin_uninstalled
 *  - creates/refreshes plugin_instance_rec
 *  - keeps the domain active and drives URL discovery
 *
 * Fires:
 *  - immediately on connect (rl_site_connected)
 *  - on a twice-daily cron while connected
 *  - a disconnect heartbeat when the user disconnects
 *
 * Contract matches the old plugin: POST api/v1/domain/heartbeat, Bearer token,
 * body includes domain/plugin_cms/plugin_v/cms_v (added by RL5_API::heartbeat()).
 */
final class RL5_Heartbeat
{
    const CRON_HOOK = 'rl5_heartbeat_cron';

    public static function init()
    {
        // Fire right after credentials are saved on connect.
        add_action('rl_site_connected', [__CLASS__, 'send_now'], 20);

        // Periodic keepalive.
        add_action(self::CRON_HOOK, [__CLASS__, 'send_now']);
        add_action('init', [__CLASS__, 'ensure_scheduled']);

        // Disconnect notice to backend (best-effort) before local clear.
        add_action('rl_site_disconnecting', [__CLASS__, 'send_disconnect']);
    }

    /**
     * Make sure the cron is scheduled while connected, and cleared when not.
     */
    public static function ensure_scheduled()
    {
        $scheduled = wp_next_scheduled(self::CRON_HOOK);

        if (RL5_Settings::is_connected()) {
            if (!$scheduled) {
                wp_schedule_event(time() + HOUR_IN_SECONDS, 'twicedaily', self::CRON_HOOK);
            }
        } elseif ($scheduled) {
            wp_clear_scheduled_hook(self::CRON_HOOK);
        }
    }

    /**
     * Send a normal heartbeat. Best-effort: never fatal, never block the UI.
     */
    public static function send_now()
    {
        if (!RL5_Settings::is_connected()) {
            return;
        }

        try {
            $api = new RL5_API();
            $res = $api->heartbeat();

            // Debug trace (visible in wp-content/debug.log when WP_DEBUG_LOG is on).
            if (defined('WP_DEBUG') && WP_DEBUG) {
                if (is_wp_error($res)) {
                    error_log('RL5 heartbeat WP_Error: ' . $res->get_error_code() . ' ' . $res->get_error_message());
                } else {
                    error_log('RL5 heartbeat OK: ' . wp_json_encode(is_array($res) ? $res : ['raw' => $res]));
                }
            }

            // If backend says auth/domain invalid, drop local creds so the user reconnects.
            if (!is_wp_error($res) && is_array($res) && !empty($res['message'])) {
                $msg = (string) $res['message'];
                if ($msg === 'AUTH_REQUIRED' || $msg === 'INVALID_DOMAIN') {
                    RL5_Settings::clear_connection();
                }
            }
        } catch (\Throwable $e) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('RL5 heartbeat threw: ' . $e->getMessage());
            }
        }
    }

    /**
     * Tell the backend we're disconnecting (best-effort), before local clear.
     */
    public static function send_disconnect()
    {
        if (!RL5_Settings::is_connected()) {
            return;
        }
        try {
            $api = new RL5_API();
            $api->heartbeat(['disconnect' => 1]);
        } catch (\Throwable $e) {
            // swallow
        }
    }

    /**
     * Clear the cron (call on deactivation).
     */
    public static function clear_cron()
    {
        wp_clear_scheduled_hook(self::CRON_HOOK);
    }
}
