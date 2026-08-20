<?php

class RabbitLoader_21_Conflicts
{

    private static $messages = [];
    private static $items = [];
    private static $currentContextKey = null;

    public static function &getMessages($isActivationFlow)
    {
        $key = self::ensureContext($isActivationFlow);
        return self::$messages[$key];
    }

    public static function &getItems($isActivationFlow)
    {
        $key = self::ensureContext($isActivationFlow);
        return self::$items[$key];
    }

    public static function getConflictState($isActivationFlow)
    {
        $items = self::getItems($isActivationFlow);
        $messages = [];
        $blocking_count = 0;

        foreach ($items as $item) {
            $messages[] = $item['message'];
            if (!empty($item['blocks_activation'])) {
                $blocking_count++;
            }
        }

        return [
            'result' => true,
            'context' => $isActivationFlow ? 'activation' : 'connected',
            'items' => $items,
            'messages' => $messages,
            'message' => empty($messages) ? '' : $messages[0],
            'warning_count' => count($items),
            'blocking_count' => $blocking_count,
            'activation_blocked' => $blocking_count > 0,
        ];
    }

    private static function ensureContext($isActivationFlow)
    {
        $key = $isActivationFlow ? 'activation' : 'connected';
        if (!array_key_exists($key, self::$messages)) {
            self::$messages[$key] = [];
            self::$items[$key] = [];
            self::$currentContextKey = $key;
            self::runSystemChecks();
            self::runConflictsCheck($isActivationFlow);
            self::$currentContextKey = null;
        }

        return $key;
    }

    private static function addConflict($message, $blocksActivation = false, $severity = '', $code = '', $source = '')
    {
        if (self::$currentContextKey === null || empty($message)) {
            return;
        }

        if (in_array($message, self::$messages[self::$currentContextKey], true)) {
            return;
        }

        if (empty($severity)) {
            $severity = $blocksActivation ? 'error' : 'warning';
        }

        self::$messages[self::$currentContextKey][] = $message;
        self::$items[self::$currentContextKey][] = [
            'message' => $message,
            'blocks_activation' => !empty($blocksActivation),
            'severity' => $severity,
            'code' => $code,
            'source' => $source,
        ];
    }

    private static function addPluginConflict($plugName, $isActivationFlow, $blocksActivation = true)
    {
        if ($isActivationFlow) {
            $message = sprintf(
                RL21UtilWP::__("It seems you are also using %s plugin which conflicts with RabbitLoader optimizations. We suggest deactivating %s and reload this page."),
                $plugName,
                $plugName
            );
        } else {
            $message = sprintf(
                RL21UtilWP::__("It seems you are also using %s plugin which conflicts with RabbitLoader optimizations. We suggest deactivating %s and hit the 'Purge All Pages' button on the RabbitLoader home tab."),
                $plugName,
                $plugName
            );
        }

        self::addConflict($message, $blocksActivation, '', 'plugin_conflict', $plugName);
    }

    private static function runSystemChecks()
    {
        if (defined('PHP_VERSION') && version_compare(PHP_VERSION, '5.6.0') < 0) {
            self::addConflict(
                sprintf(
                    RL21UtilWP::__("RabbitLoader requires PHP 5.6 or higher. You're still on version %s which may expose your site to security vulnerabilities. <a href='%s' target='_blank'>Learn more</a>."),
                    PHP_VERSION,
                    "https://wordpress.org/support/update-php/"
                ),
                true,
                'error',
                'php_version',
                'PHP'
            );
        }
    }

    private static function runConflictsCheck($isActivationFlow)
    {

        $otherConflictPlugins = [];
        $constants_to_check = [
            'AUTOPTIMIZE_PLUGIN_VERSION' => ['name' => 'Autoptimize', 'blocks_activation' => true],
            'BREEZE_PLUGIN_DIR' => ['name' => 'Breeze', 'blocks_activation' => true],
            'COMET_CACHE_PLUGIN_FILE' => ['name' => 'Comet Cache', 'blocks_activation' => true],
            'CYBVC_PLUGIN_DIR' => ['name' => 'ViperCache', 'blocks_activation' => true],
            'DEBLOAT_PLUGIN_FILE' => ['name' => 'Debloat', 'blocks_activation' => true],
            'JETPACK_BOOST_VERSION' => ['name' => 'Jetpack Boost', 'blocks_activation' => true],
            'LSCACHE_ADV_CACHE' => ['name' => 'LiteSpeed Cache', 'blocks_activation' => true],
            'LSCWP_DIR' => ['name' => 'LiteSpeed Cache', 'blocks_activation' => true],
            'LSCWP_V' => ['name' => 'LiteSpeed Cache', 'blocks_activation' => true],
            'PEGASAAS_ACCELERATOR_VERSION' => ['name' => 'Pegasaas Accelerator WP', 'blocks_activation' => true],
            'PERFMATTERS_VERSION' => ['name' => 'Perfmatters', 'blocks_activation' => true],
            'PERFMATTERS_CACHE_DIR' => ['name' => 'Perfmatters', 'blocks_activation' => true],
            'PHASTPRESS_VERSION' => ['name' => 'PhastPress', 'blocks_activation' => true],
            'SW_CLOUDFLARE_PAGECACHE' => ['name' => 'WP Cloudflare Super Page Cache', 'blocks_activation' => true],
            'TENWEB_SO_VERSION' => ['name' => '10Web Booster', 'blocks_activation' => true],
            'NITROPACK_VERSION' => ['name' => 'NitroPack', 'blocks_activation' => true],
            'W3TC' => ['name' => 'W3 Total Cache', 'blocks_activation' => true],
            'WMAC_PLUGIN_VERSION' => ['name' => 'Clearfy Cache', 'blocks_activation' => true],
            'WP_ROCKET_VERSION' => ['name' => 'WP-Rocket', 'blocks_activation' => true],
            'WP_SMUSH_VERSION' => ['name' => 'Smush', 'blocks_activation' => false],
            'WPFC_WP_PLUGIN_DIR' => ['name' => 'WP Fastest Cache', 'blocks_activation' => true],
            'WPFC_MAIN_PATH' => ['name' => 'WP Fastest Cache', 'blocks_activation' => true],
            'WPHB_SUI_VERSION' => ['name' => 'Hummingbird', 'blocks_activation' => true], // WPHB_VERSION conflicts with WP Hotel Booking plugin
            'WPMETEOR_VERSION' => ['name' => 'WP Meteor', 'blocks_activation' => true],
        ];

        $classes_to_check = [
            'BJLL' => ['name' => 'BJ Lazy Load', 'blocks_activation' => false],
            'PagespeedNinja' => ['name' => 'PageSpeed Ninja', 'blocks_activation' => true],
            'Swift_Performance' => ['name' => 'Swift Performance', 'blocks_activation' => true],
            'Swift_Performance_Lite' => ['name' => 'Swift Performance', 'blocks_activation' => true],
            'SWCFPC_Backend' => ['name' => 'WP Cloudflare Super Page Cache', 'blocks_activation' => true],
            'WPO_Cache_Config' => ['name' => 'WP Optimize page caching', 'blocks_activation' => false],
        ];

        foreach ($constants_to_check as $plugConst => $plugData) {
            if (defined($plugConst)) {
                $otherConflictPlugins[$plugData['name']] = $plugData;
            }
        }

        foreach ($classes_to_check as $className => $plugData) {
            if (class_exists($className)) {
                $otherConflictPlugins[$plugData['name']] = $plugData;
            }
        }

        if (!empty($otherConflictPlugins)) {
            foreach ($otherConflictPlugins as $plugData) {
                self::addPluginConflict($plugData['name'], $isActivationFlow, !empty($plugData['blocks_activation']));
            }
        }

        if (defined('WPCACHEHOME') && function_exists("wp_cache_phase2")) {
            self::addConflict(
                sprintf(
                    RL21UtilWP::__("It seems you are using %s plugin which conflicts with RabbitLoader optimizations. We suggest deactivating it and hit the 'Purge All Pages' button on the RabbitLoader home tab. If you think it is an error, please follow <a href='%s' target='_blank'>this guide</a>."),
                    "WP Super Cache",
                    "https://rabbitloader.com/kb/wordpress-plugin-activation-errors/"
                ),
                true,
                'error',
                'wp_super_cache',
                'WP Super Cache'
            );
        }

        try {
            if (defined('JETPACK__VERSION')) {
                $jp_options = get_option('jetpack_active_modules');
                if (is_array($jp_options) && in_array('lazy-images', $jp_options)) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "image lazy loading option in Jetpack"), false, 'warning', 'jetpack_lazy_images', 'Jetpack');
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('POWERKIT')) {
                $powerkit_enabled_lazyload = get_option('powerkit_enabled_lazyload');
                if (!empty($powerkit_enabled_lazyload)) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "image lazy loading option in Powerkit"), false, 'warning', 'powerkit_lazyload', 'Powerkit');
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (class_exists('Flatsome_Default')) {
                $theme_mods_flatsome = [];
                if (function_exists('of_get_options')) {
                    $theme_mods_flatsome = of_get_options();
                } else {
                    $theme_mods_flatsome = get_option('theme_mods_flatsome-child');
                }
                if (!empty($theme_mods_flatsome)) {
                    if (!empty($theme_mods_flatsome['lazy_load_images'])) {
                        self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "IMAGE lazy loading options in Flatsome Advanced Options"), false, 'warning', 'flatsome_lazy_images', 'Flatsome');
                    }
                    if (!empty($theme_mods_flatsome['lazy_load_backgrounds'])) {
                        self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "BANNER AND SECTION BACKGROUNDS lazy loading options in Flatsome Advanced Options"), false, 'warning', 'flatsome_lazy_backgrounds', 'Flatsome');
                    }
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('ET_BUILDER_THEME') && defined('TEMPLATEPATH')) {
                $themeName = explode('/', TEMPLATEPATH);
                if (!empty($themeName)) {
                    $themeName_c = end($themeName);
                    $themeName_s = strtolower($themeName_c);
                    $theme_options = get_option('et_' . $themeName_s);
                    if (!empty($theme_options)) {
                        $et_check_options = ['critical_css', 'dynamic_css'];
                        $is_on = false;
                        foreach ($et_check_options as $et_check_option) {
                            $et_current_option = $themeName_s . '_' . $et_check_option;
                            $is_on = !empty($theme_options[$et_current_option]) && $theme_options[$et_current_option] == "on";
                            if ($is_on) {
                                break;
                            }
                        }
                        if ($is_on) {
                            self::addConflict(
                                sprintf(
                                    RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader <a href='%s' target='_blank'>Check screenshots</a>."),
                                    "all performance optimizations in $themeName_c theme",
                                    "https://rabbitloader.com/kb/settings-for-wordpress-divi-theme-users/"
                                ),
                                false,
                                'warning',
                                'divi_performance_options',
                                $themeName_c
                            );
                        }
                    }

                    if (!empty($theme_options['et_pb_static_css_file']) && strcasecmp($theme_options['et_pb_static_css_file'], "on") === 0) {
                        self::addConflict(
                            sprintf(
                                RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader. <a href='%s' target='_blank'>Check screenshots</a>."),
                                "Static CSS File Generation option in $themeName_c theme",
                                "https://rabbitloader.com/kb/settings-for-wordpress-divi-theme-users/"
                            ),
                            false,
                            'warning',
                            'divi_static_css',
                            $themeName_c
                        );
                    }
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('WPO_VERSION')) {
                if (class_exists('WPO_Cache_Config')) {
                    $wpo_inst = WPO_Cache_Config::instance();
                    if ($wpo_inst->get_option('enable_page_caching', false)) {
                        self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "page caching option in WP Optimize plugin"), false, 'warning', 'wp_optimize_page_cache', 'WP Optimize');
                    }
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (function_exists('ewww_image_optimizer_get_option')) {
                if (ewww_image_optimizer_get_option('ewww_image_optimizer_lazy_load')) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "image lazy loading in EWWW Image Optimizer"), false, 'warning', 'ewww_lazyload', 'EWWW Image Optimizer');
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('WOOCS_VERSION')) {
                if (empty(get_option('woocs_shop_is_cached'))) {
                    self::addConflict(
                        sprintf(
                            RL21UtilWP::__("Please enable %s to be compatible with RabbitLoader. <a href='%s' target='_blank'>Check screenshot</a>"),
                            "<i><b>I am using cache plugin</b></i> option in WOOCS Currency Switcher Settings",
                            "https://rabbitloader.com/kb/woocs-currency-switcher-for-woocommerce/"
                        ),
                        false,
                        'warning',
                        'woocs_cache_compatibility',
                        'WOOCS'
                    );
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('WOOMULTI_CURRENCY_F_VERSION') && class_exists('WOOMULTI_CURRENCY_F_Admin_Settings')) {
                if (empty(WOOMULTI_CURRENCY_F_Admin_Settings::get_field('cache_compatible'))) {
                    self::addConflict(
                        sprintf(
                            RL21UtilWP::__("Please enable %s to be compatible with RabbitLoader. <a href='%s' target='_blank'>Check screenshot</a>"),
                            "<i><b>Use Cache Plugin</b></i> option in CURCY - Multi Currency for WooCommerce",
                            "https://rabbitloader.com/kb/curcy-multi-currency-for-woocommerce/"
                        ),
                        false,
                        'warning',
                        'curcy_cache_compatibility',
                        'CURCY'
                    );
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('FLYING_PRESS_VERSION')) {
                $fp_options = get_option('FLYING_PRESS_CONFIG');
                if (!empty($fp_options['css_extract_used'])) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "CSS optimizations in Flying Press"), false, 'warning', 'flying_press_css', 'Flying Press');
                }
                if (!empty($fp_options['js_preload_links']) || !empty($fp_options['js_defer']) || !empty($fp_options['js_interaction'])) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "all JavaScript optimizations such as Preload, Defer, Interaction etc in Flying Press"), false, 'warning', 'flying_press_js', 'Flying Press');
                }
                if (!empty($fp_options['cache'])) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader."), "cache option in Flying Press"), false, 'warning', 'flying_press_cache', 'Flying Press');
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        if (defined('SiteGround_Optimizer\VERSION')) {
            $sg_combine_css = get_option('siteground_optimizer_combine_css');
            if (!empty($sg_combine_css)) {
                self::addConflict(sprintf(RL21UtilWP::__("Please disable %s in %s to avoid conflict with RabbitLoader."), "Combine CSS option", "Siteground Optimizer"), false, 'warning', 'siteground_combine_css', 'SiteGround Optimizer');
            }
        }

        if (defined('EZOIC_INTEGRATION_VERSION')) {
            self::addConflict(sprintf(RL21UtilWP::__("Currently RabbitLoader is not compatible with %s."), "Ezoic"), true, 'error', 'ezoic', 'Ezoic');
        }

        if (defined('WPACU_PLUGIN_ID') && defined('WPACU_PLUGIN_TITLE')) {
            $wpassetcleanup_settings = get_option('wpassetcleanup_settings');
            if (!empty($wpassetcleanup_settings)) {
                if (!empty($wpassetcleanup_settings['combine_loaded_css_for']) && strcmp($wpassetcleanup_settings['combine_loaded_css_for'], 'guests') === 0) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s in %s to avoid conflict with RabbitLoader."), "Combine CSS option", WPACU_PLUGIN_TITLE), false, 'warning', 'asset_cleanup_combine_css', WPACU_PLUGIN_TITLE);
                }
                if (!empty($wpassetcleanup_settings['critical_css_status']) && strcmp($wpassetcleanup_settings['critical_css_status'], 'off') !== 0) {
                    self::addConflict(sprintf(RL21UtilWP::__("Please disable %s in %s to avoid conflict with RabbitLoader."), "Critical CSS option", WPACU_PLUGIN_TITLE), false, 'warning', 'asset_cleanup_critical_css', WPACU_PLUGIN_TITLE);
                }
            }
        }

        try {
            if (defined('FUSION_BUILDER_VERSION')) {
                $template = explode('/', TEMPLATEPATH);
                if (!empty($template)) {
                    $themeName = end($template);
                } else {
                    $themeName = 'current';
                }
                $fb_options = get_option('fusion_options');
                $empty_checks = [
                    'lazy_load' => ['none', 'off'],
                    'js_compiler' => ['0'],
                    'defer_jquery' => ['0'],
                    'defer_styles' => ['0'],
                    'css_cache_method' => ['none', 'off'],
                    'css_combine_third_party_assets' => ['0'],
                    'media_queries_async' => ['0'],
                    'critical_css' => ['0'],
                ];
                foreach ($empty_checks as $key => $expValues) {
                    if (empty($fb_options[$key])) {
                        continue;
                    } else if (in_array($fb_options[$key], $expValues)) {
                        continue;
                    } else {
                        self::addConflict(
                            sprintf(
                                RL21UtilWP::__("Please disable %s to avoid conflict with RabbitLoader. For help, refer <a href='%s' target='_blank'>this guide</a>."),
                                "all performance options in $themeName theme performance settings such as \"" . str_ireplace("_", " ", $key) . '"',
                                "https://rabbitloader.com/kb/settings-required-for-themefusion-users/"
                            ),
                            false,
                            'warning',
                            'themefusion_performance_options',
                            $themeName
                        );
                        break;
                    }
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }

        try {
            if (defined('ASP_PLUGIN_NAME')) {
                $asp_compatibility = get_option('asp_compatibility');
                $script_loading_method = empty($asp_compatibility['script_loading_method']) ? '' : $asp_compatibility['script_loading_method'];
                $css_loading_method = empty($asp_compatibility['css_loading_method']) ? '' : $asp_compatibility['css_loading_method'];
                if ($script_loading_method != 'classic' || $css_loading_method != 'file') {
                    self::addConflict(
                        sprintf(
                            RL21UtilWP::__("In the Ajax Search Pro plugin, under the Compatibility and Other Settings, go to CSS and JS loading option. Please choose 'classic' option for Script loading method and file option for Style (CSS) loading method. <a href='%s' target='_blank'>Check screenshot</a>"),
                            "https://rabbitloader.com/kb/settings-required-for-ajax-search-pro-users/"
                        ),
                        false,
                        'warning',
                        'ajax_search_pro_loading',
                        'Ajax Search Pro'
                    );
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }
}
