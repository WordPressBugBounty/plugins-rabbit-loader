<?php

if (!defined('ABSPATH')) {
    exit;
}

final class RL5_Plugin
{
    private static $booted = false;

    public static function init()
    {
        if (self::$booted) {
            return;
        }

        self::$booted = true;
        RL5_Admin::init();
        RL5_Heartbeat::init();

        // Frontend runtime: serve optimized pages + capture misses.
        // Safe path (template_redirect) — runs after WP loads. The
        // advanced-cache.php early-serve is a later optimization.
        if ( ! is_admin() ) {
            RL5_Runtime::hooks();
        }
    }
}
