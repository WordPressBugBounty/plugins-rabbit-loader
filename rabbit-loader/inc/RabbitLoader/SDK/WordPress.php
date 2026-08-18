<?php

namespace RabbitLoader\SDK;

class WordPress
{
    public static function isWp()
    {
        return defined('ABSPATH') && function_exists('apply_filters') && function_exists('get_option');
    }

    public static function &plugins()
    {
        $plugins = [];
        if (!self::isWp()) {
            return $plugins;
        }
        $activePlugins = apply_filters('active_plugins', get_option('active_plugins'));
        if (!is_array($activePlugins)) {
            $activePlugins = [];
        }
        //Yoast SEO
        if (class_exists('WPSEO_Options') || in_array('wordpress-seo/wp-seo.php', $activePlugins, true)) {
            self::appendUniquePlugin($plugins, 'wordpress-seo');
        }

        //Rank Math
        if (class_exists('RankMath') || in_array('seo-by-rank-math/rank-math.php', $activePlugins, true)) {
            self::appendUniquePlugin($plugins, 'seo-by-rank-math');
        }

        //Squirrly SEO
        if (defined('SQ_VERSION') || in_array('squirrly-seo/squirrly.php', $activePlugins, true)) {
            self::appendUniquePlugin($plugins, 'squirrly-seo');
        }
        return $plugins;
    }

    private static function appendUniquePlugin(&$plugins, $plugin)
    {
        if (!in_array($plugin, $plugins, true)) {
            $plugins[] = $plugin;
        }
    }
}
