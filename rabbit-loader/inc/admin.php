<?php

class RabbitLoader_21_Admin
{

    public static $rabbitloader_cache_warnings = false;
    public static $admin_notice_shown = false;

    const PURGE_POST_CHANGE = "PURGE_POST";
    const PURGE_THEME_CHANGE = "PURGE_THEME";
    const PURGE_PLUG_CHANGE = "PURGE_PLUGIN";
    const PURGE_MANUAL_USER = "PURGE_USER";
    const SURVEY_DIS_PERMA = 999;

    public static function addActions()
    {
        add_action('admin_notices', 'RabbitLoader_21_Admin::admin_notices');
        add_action('admin_init', 'RabbitLoader_21_Admin::admin_init');
        add_action('network_admin_notices', 'RabbitLoader_21_Admin::admin_notices');
        add_action('admin_menu', 'RabbitLoader_21_Admin::leftMenuOption');
        add_action('admin_enqueue_scripts', function () {
            $is_rl_page = RabbitLoader_21_Util_Core::isRLPage();
            $dependencies = ['jquery'];
            if ($is_rl_page) {
                wp_enqueue_script('rabbitloader-react', 'no', [], false);
                wp_enqueue_script('rabbitloader-react-dom', 'no', [], false);
                $dependencies[] = 'rabbitloader-react';
                $dependencies[] = 'rabbitloader-react-dom';
            }

            wp_enqueue_script('rabbitloader-index', RABBITLOADER_PLUG_URL . 'admin/js/index.js', $dependencies, RABBITLOADER_PLUG_VERSION);
            if ($is_rl_page) {
                $guard_config = wp_json_encode([
                    'adminAjax' => admin_url('admin-ajax.php'),
                    'isConnected' => self::isPluginActivated(),
                ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
                if ($guard_config !== false) {
                    wp_add_inline_script('rabbitloader-index', 'window.RLConflictGuardConfig = ' . $guard_config . ';', 'before');
                }

                wp_enqueue_script('rabbitloader-conflict-guard', RABBITLOADER_PLUG_URL . 'admin/js/conflict-guard.js', ['rabbitloader-index'], RABBITLOADER_PLUG_VERSION, true);
            }
            if ($is_rl_page && self::isPluginActivated()) {
                $boot_data = wp_json_encode(self::getAdminBootData(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
                if ($boot_data !== false) {
                    wp_add_inline_script('rabbitloader-index', 'window.rabbitloader_local_vars = ' . $boot_data . ';', 'before');
                }
            }
        });

        $purge_func = function () {
            RL21UtilWP::verifyAjaxNonce();
            $response = [
                'result' => false,
                'lpc' => 0 //local purge count
            ];
            if (!empty($_POST['post_id'])) {
                $post_id = RabbitLoader_21_Util_Core::get_param('post_id', true);
                RL21UtilWP::onPostChange($post_id);
                $response['result'] = true;
            } else {
                RL21UtilWP::onPostChange(RL21UtilWP::POST_ID_ALL);
                $response['result'] = true;
            }
            RL21UtilWP::execute_purge($response['lpc']);
            delete_transient('rabbitloader_trans_overview_data');
            RabbitLoader_21_Core::sendJsonResponse($response);
        };

        add_action('wp_ajax_rabbitloader_ajax_purge', $purge_func);
        add_action('wp_ajax_nopriv_rabbitloader_ajax_purge', $purge_func);

        $mode_change_func = function () {
            RL21UtilWP::verifyAjaxNonce();

            if (!RabbitLoader_21_Admin::canAccessModeAjax()) {
                wp_send_json_error(null, 403);
                return;
            }

            $private_mode = !empty($_POST['private_mode']);
            RabbitLoader_21_Admin::updateModeValue($private_mode);
            $response = [
                'result' => true,
                'private_mode' => $private_mode,
                'me_mode' => $private_mode,
                'mode' => $private_mode ? 'me' : 'everyone'
            ];

            RabbitLoader_21_Core::sendJsonResponse($response);
        };

        add_action('wp_ajax_rabbitloader_mode_change', $mode_change_func);
        add_action('wp_ajax_nopriv_rabbitloader_mode_change', $mode_change_func);

        $mode_get_func = function () {
            if (empty($_POST['rl_nonce'])) {
                $request_nonce = RabbitLoader_21_Util_Core::get_param('rl_nonce', true);
                if (!empty($request_nonce)) {
                    $_POST['rl_nonce'] = $request_nonce;
                }
            }

            if (empty($_POST['token'])) {
                $request_token = RabbitLoader_21_Util_Core::get_param('token', true);
                if (!empty($request_token)) {
                    $_POST['token'] = $request_token;
                }
            }

            RL21UtilWP::verifyAjaxNonce();

            if (!RabbitLoader_21_Admin::canAccessModeAjax()) {
                wp_send_json_error(null, 403);
                return;
            }

            RabbitLoader_21_Core::getWpUserOption($user_options);
            $private_mode = !empty($user_options['private_mode_val']);
            $response = [
                'result' => true,
                'private_mode' => $private_mode,
                'me_mode' => $private_mode,
                'mode' => $private_mode ? 'me' : 'everyone'
            ];

            RabbitLoader_21_Core::sendJsonResponse($response);
        };

        add_action('wp_ajax_rabbitloader_mode_get', $mode_get_func);
        add_action('wp_ajax_nopriv_rabbitloader_mode_get', $mode_get_func);
        add_action('wp_ajax_rabbitloader_get_exclusions', function () {
            RL21UtilWP::verifyAjaxNonce();

            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            $response = self::getExcludePatternsState();
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_add_exclusion', function () {
            $json_body = json_decode(file_get_contents('php://input'), true);
            if (is_array($json_body)) {
                foreach ($json_body as $key => $value) {
                    $_POST[$key] = $value;
                }
            }

            RL21UtilWP::verifyAjaxNonce();

            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            $incoming_patterns = [];
            $single_pattern = '';

            if (isset($_POST['pattern'])) {
                $single_pattern = wp_unslash($_POST['pattern']);
            } elseif (isset($_GET['pattern'])) {
                $single_pattern = wp_unslash($_GET['pattern']);
            }

            if (!empty($single_pattern)) {
                $incoming_patterns[] = $single_pattern;
            }

            if (!empty($_POST['patterns']) && is_array($_POST['patterns'])) {
                foreach ($_POST['patterns'] as $pattern) {
                    $incoming_patterns[] = $pattern;
                }
            }

            $normalized_patterns = self::normalizeExcludePatterns($incoming_patterns);
            if (empty($normalized_patterns)) {
                wp_send_json_error(['message' => 'At least one valid exclusion pattern is required.'], 400);
                return;
            }

            $response = self::addExcludePatterns($normalized_patterns);
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_remove_exclusion', function () {
            $json_body = json_decode(file_get_contents('php://input'), true);
            if (is_array($json_body)) {
                foreach ($json_body as $key => $value) {
                    $_POST[$key] = $value;
                }
            }

            RL21UtilWP::verifyAjaxNonce();

            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            $incoming_patterns = [];
            $single_pattern = '';

            if (isset($_POST['pattern'])) {
                $single_pattern = wp_unslash($_POST['pattern']);
            } elseif (isset($_GET['pattern'])) {
                $single_pattern = wp_unslash($_GET['pattern']);
            }

            if (!empty($single_pattern)) {
                $incoming_patterns[] = $single_pattern;
            }

            if (!empty($_POST['patterns']) && is_array($_POST['patterns'])) {
                foreach ($_POST['patterns'] as $pattern) {
                    $incoming_patterns[] = $pattern;
                }
            }

            $normalized_patterns = self::normalizeExcludePatterns($incoming_patterns);
            if (empty($normalized_patterns)) {
                wp_send_json_error(['message' => 'At least one valid exclusion pattern is required.'], 400);
                return;
            }

            $response = self::removeExcludePatterns($normalized_patterns);
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_conflicts', function () {
            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            $context = sanitize_text_field(RabbitLoader_21_Util_Core::get_param('context'));
            $isActivationFlow = strcmp($context, 'connected') !== 0;
            $response = RabbitLoader_21_Conflicts::getConflictState($isActivationFlow);
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_admin_boot', function () {
            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            RabbitLoader_21_Core::sendJsonResponse(self::getAdminBootData());
        });
        add_action('wp_ajax_rabbitloader_save_keys', function () {
            $json_body = json_decode(file_get_contents('php://input'), true);
            if (is_array($json_body)) {
                foreach ($json_body as $key => $value) {
                    $_POST[$key] = $value;
                }
            }

            RL21UtilWP::verifyAjaxNonce();

            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            $conflict_state = RabbitLoader_21_Conflicts::getConflictState(true);
            if (!empty($conflict_state['activation_blocked'])) {
                $conflict_state['result'] = false;
                if (empty($conflict_state['message'])) {
                    $conflict_state['message'] = RL21UtilWP::__('Resolve the blocking RabbitLoader conflict(s) before connecting this site.');
                }

                status_header(409);
                RabbitLoader_21_Core::sendJsonResponse($conflict_state);
            }

            $encoded_token = RabbitLoader_21_Util_Core::get_param('rl-token', true);
            $decoded_token = !empty($encoded_token) ? base64_decode($encoded_token, true) : false;
            if (empty($decoded_token)) {
                wp_send_json_error(['message' => 'Invalid token'], 400);
                return;
            }

            $tokens = json_decode($decoded_token, true);
            if (empty($tokens['api_token'])) {
                wp_send_json_error(['message' => 'Invalid token'], 400);
                return;
            }

            $urlparts = parse_url(home_url());
            RabbitLoader_21_Core::update_api_tokens($tokens['api_token'], $urlparts['host'], $tokens['did'], '');
            if (isset($tokens['cdn_prefix'])) {
                update_option('rabbitloader_cdn_prefix', $tokens['cdn_prefix'], true);
            }

            do_action('rl_site_connected');

            $response = self::getAdminBootData();
            $response['result'] = true;
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_disconnect', function () {
            RL21UtilWP::verifyAjaxNonce();

            if (!current_user_can('manage_options')) {
                wp_send_json_error(null, 403);
                return;
            }

            self::disconnectPlugin();

            $response = [
                'result' => true,
                'admin_ajax' => admin_url('admin-ajax.php'),
                'rl_nonce' => wp_create_nonce('rl-ajax-nonce'),
                'rl_acct' => false,
                'is_connected' => false,
                'api_token' => '',
                'did' => '',
                'domain' => '',
                'plan_title' => '',
                'home_page_url_id' => ''
            ];
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        add_action('wp_ajax_rabbitloader_ajax_cron', function () {
            //self::deferred_exe();
            RL21UtilWP::verifyAjaxNonce();
        });
        add_action('wp_ajax_rabbitloader_warmup_urls', function () {
            RL21UtilWP::verifyAjaxNonce();
            $response = [
                'poffset' => intval($_POST['poffset']),
                'posts_per_page' => intval($_POST['posts_per_page']),
            ];
            RabbitLoader_21_Core::get_recent_posts($response['poffset'], $response['posts_per_page'], $response['published_count'], $response['permalinks']);
            RabbitLoader_21_Core::sendJsonResponse($response);
        });
        // add_action('wp_ajax_rabbitloader_ajax_survey_dismissed', function () {
        //     RL21UtilWP::verifyAjaxNonce();
        //     self::survey_dismissed(self::SURVEY_DIS_PERMA);
        // });
        add_action('rl_site_connected', function () {
            self::rl_site_connected();
        });
        add_action('plugins_loaded', 'RabbitLoader_AD_AD::on_plugins_loaded');
        //listeners for taxonomy changes

        add_action('wp_print_scripts', function () {
            if (RabbitLoader_21_Util_Core::isRLPage()) {
                wp_dequeue_script('monsterinsights-vue-frontend'); //vue JS conflict with apexcharts window.SVG().addTo fails
            }
        }, 100);
    }

    public static function init() {}

    private static function canAccessModeAjax()
    {
        if (!empty($_POST['token'])) {
            return true;
        }

        return current_user_can('manage_options');
    }

    private static function normalizeExcludePatterns($patterns)
    {
        if (!is_array($patterns)) {
            $patterns = [$patterns];
        }

        $normalized = [];
        foreach ($patterns as $pattern) {
            if (!is_scalar($pattern)) {
                continue;
            }

            $pattern = sanitize_text_field((string) $pattern);
            $pattern = preg_replace('/[\r\n\t]+/', '', $pattern);
            $pattern = trim($pattern);

            if ($pattern === '' || strpos($pattern, "\0") !== false) {
                continue;
            }

            $normalized[$pattern] = true;
        }

        return array_keys($normalized);
    }

    private static function getExcludePatternsState()
    {
        RabbitLoader_21_Core::getWpUserOption($user_options);
        $patterns = self::normalizeExcludePatterns(explode("\n", $user_options['exclude_patterns']));

        return [
            'result' => true,
            'patterns' => $patterns,
            'exclude_patterns' => implode("\n", $patterns),
            'count' => count($patterns),
        ];
    }

    private static function addExcludePatterns($patterns)
    {
        RabbitLoader_21_Core::getWpUserOption($user_options);
        $existing_patterns = self::normalizeExcludePatterns(explode("\n", $user_options['exclude_patterns']));
        $existing_map = [];
        foreach ($existing_patterns as $pattern) {
            $existing_map[$pattern] = true;
        }

        $added_patterns = [];
        foreach ($patterns as $pattern) {
            if (isset($existing_map[$pattern])) {
                continue;
            }

            $existing_map[$pattern] = true;
            $existing_patterns[] = $pattern;
            $added_patterns[] = $pattern;
        }

        $user_options['exclude_patterns'] = implode("\n", $existing_patterns);
        RabbitLoader_21_Core::updateUserOption($user_options);

        if (!empty($added_patterns)) {
            RL21UtilWP::onPostChange(RL21UtilWP::POST_ID_ALL);
        }

        return [
            'result' => true,
            'message' => empty($added_patterns) ? 'Exclusion pattern already exists.' : 'Exclusion pattern(s) added successfully.',
            'added_patterns' => $added_patterns,
            'patterns' => $existing_patterns,
            'exclude_patterns' => $user_options['exclude_patterns'],
            'count' => count($existing_patterns),
        ];
    }

    private static function removeExcludePatterns($patterns)
    {
        RabbitLoader_21_Core::getWpUserOption($user_options);
        $existing_patterns = self::normalizeExcludePatterns(explode("\n", $user_options['exclude_patterns']));
        $remove_map = [];
        foreach ($patterns as $pattern) {
            $remove_map[$pattern] = true;
        }

        $remaining_patterns = [];
        $removed_patterns = [];
        foreach ($existing_patterns as $pattern) {
            if (isset($remove_map[$pattern])) {
                $removed_patterns[] = $pattern;
                continue;
            }

            $remaining_patterns[] = $pattern;
        }

        $user_options['exclude_patterns'] = implode("\n", $remaining_patterns);
        RabbitLoader_21_Core::updateUserOption($user_options);

        if (!empty($removed_patterns)) {
            RL21UtilWP::onPostChange(RL21UtilWP::POST_ID_ALL);
        }

        return [
            'result' => true,
            'message' => empty($removed_patterns) ? 'Exclusion pattern not found.' : 'Exclusion pattern(s) removed successfully.',
            'removed_patterns' => $removed_patterns,
            'patterns' => $remaining_patterns,
            'exclude_patterns' => $user_options['exclude_patterns'],
            'count' => count($remaining_patterns),
        ];
    }

    private static function updateModeValue($private_mode)
    {
        RabbitLoader_21_Core::getWpUserOption($user_options);
        $user_options['private_mode_val'] = !empty($private_mode);
        $user_options['private_mode_ts'] = date('c');
        RabbitLoader_21_Core::updateUserOption($user_options);

        try {
            // remove public pages cache, main purpose is to purge TPV
            RabbitLoader_21_TP::purge_all($tp_purge_count);
        } catch (\Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }

    protected static function disconnectPlugin()
    {
        RabbitLoader_21_Core::update_api_tokens('', '', '', 'user action disconnect');
        delete_transient('rabbitloader_trans_overview_data');
    }

    public static function leftMenuOption()
    {
        self::get_warnings($notification_count, false);
        add_menu_page(
            'RabbitLoader',
            $notification_count ? sprintf('RabbitLoader <span class="awaiting-mod">%d</span>', $notification_count) : 'RabbitLoader',
            'manage_options',
            'rabbitloader',
            'RabbitLoader_21_Tab_Init::echoPluginPage',
            dirname(plugin_dir_url(__FILE__)) . '/images/icon_16.png',
            //'',
            20
        );

        if (RabbitLoader_21_Util_Core::isRLPage()) {
            add_action('admin_head', 'admin_styles', 10, 1);
            function admin_styles($a)
            {
                echo '<link rel="stylesheet" href="' . RABBITLOADER_PLUG_URL . 'admin/css/bootstrap.v5.1.3.min.css' . '" type="text/css" media="all" />
                <link rel="stylesheet" href="' . RABBITLOADER_PLUG_URL . 'admin/css/style.css?v=' . RABBITLOADER_PLUG_VERSION . '" type="text/css" media="all" />
                 <link rel="stylesheet" href="' . RABBITLOADER_PLUG_URL . 'admin/css/mfe-patches.css?v=' . RABBITLOADER_PLUG_VERSION . '" type="text/css" media="all" />';
            }
        }
        add_action('admin_head', function () {
            echo '<link rel="stylesheet" href="' . RABBITLOADER_PLUG_URL . 'admin/css/style-common.css?v=' . RABBITLOADER_PLUG_VERSION . '" type="text/css" media="all" />';
        }, 10, 1);
    }


    protected static function isPluginActivated()
    {

        return !empty(RabbitLoader_21_Core::getWpOptVal('api_token'));
    }

    protected static function getAdminBootData()
    {
        $overview = RabbitLoader_21_Tab_Init::getOverviewData();
        $is_connected = self::isPluginActivated();

        return [
            'admin_ajax' => admin_url('admin-ajax.php'),
            'rl_nonce' => wp_create_nonce('rl-ajax-nonce'),
            'rl_acct' => $is_connected,
            'is_connected' => $is_connected,
            'api_token' => RabbitLoader_21_Core::getWpOptVal('api_token'),
            'did' => RabbitLoader_21_Core::getWpOptVal('did'),
            'domain' => RabbitLoader_21_Core::getWpOptVal('domain'),
            'plan_title' => isset($overview['plan_title']) ? $overview['plan_title'] : '',
            'home_page_url_id' => isset($overview['home_page_url_id']) ? $overview['home_page_url_id'] : ''
        ];
    }

    public static function admin_notices()
    {

        //self::survey();

        try {
            $page = RabbitLoader_21_Util_Core::get_param('page');

            if (self::$admin_notice_shown || ($page == 'rabbitloader')) {
                return;
            }

            self::$admin_notice_shown = true;

            $plug_url = admin_url("admin.php?page=rabbitloader");


            if (!self::isPluginActivated()) {
                echo '
                <div class="notice notice-error is-dismissible"><p>';
                printf(RL21UtilWP::__('RabbitLoader is disconnected. Your pages are not optimized. <a href="%s">Click here to connect</a>'), $plug_url);
                echo '</p></div>';
            } else {
                self::get_warnings($notification_count, false);

                if ($notification_count > 0) {
                    echo '<div class="notice notice-error is-dismissible"><p>';
                    printf(RL21UtilWP::_n('RabbitLoader has %d warning which is affecting your website\'s optimizations. <a href="%s">check details</a>', 'RabbitLoader has %d warnings which may affect your website\'s optimizations. <a href="%s">check details</a>', $notification_count), $notification_count, $plug_url);
                    echo '</p></div>';
                }
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        } catch (Exception $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }

    private static function survey()
    {
        $showSurvey = false;
        $integration_start_time = RabbitLoader_21_Core::getWpOptVal('token_update_ts');
        if (!empty($integration_start_time)) {
            $maxTimeSec = 1 * 3600; //after 1hour
            $elapsedTimeSec = time() - $integration_start_time;
            $showSurvey =  $elapsedTimeSec > $maxTimeSec;
        }

        if (!$showSurvey) {
            return;
        }

        $user_id = get_current_user_id();
        if (empty($user_id)) {
            return;
        }
        //delete_user_meta($user_id, 'rl_survey_dismissed');
        $dismiss_time = intval(get_user_meta($user_id, 'rl_survey_dismissed', true));
        if (self::SURVEY_DIS_PERMA === $dismiss_time) {
            //permanently dismissed
            return;
        } else if (!empty($dismiss_time) && ($dismiss_time > strtotime('-7 days'))) {
            //dismiss within last 7 days
            return;
        }

        $remindLaterURL = esc_url(add_query_arg('rl_survey_dismissed', time()));
        $remindNeverURL = esc_url(add_query_arg('rl_survey_dismissed', self::SURVEY_DIS_PERMA));
        echo '<div class="notice notice-info is-dismissible rl_survey_notice" style="background: #f4f4f4; color: #1d2327; border-width: 1px; border-style: solid; border-color: #1d2327; padding: 1rem 1rem; border-radius: 5px;"><div style="float:left; padding-right:1rem;"><img src="' . RABBITLOADER_PLUG_URL . '/assets/icon-dark.svg" width="100" /></div>';
        echo '<p class="p1">';
        RL21UtilWP::_e("Enjoying RabbitLoader? 🚀");
        echo '</p>';
        echo '<p>';
        RL21UtilWP::_e('Share your thoughts in a quick 10-second anonymous survey. Your feedback helps us hop forward! 🐇');
        echo '</p>';
        echo '<p class="p" style="margin-top: 1.5rem;"><button id="rl_show_survey" class="rl-btn rl-btn-primary mt-2 mb-sm-0">';
        RL21UtilWP::_e('Yes, Continue');
        echo '</button> <a href="' . $remindLaterURL  . '" class="rl-btn" style="color:#0076CE;">';
        RL21UtilWP::_e('Ask me later');
        echo '</a><a href="' . $remindNeverURL . '" class="rl-btn" style="color:#0076CE;">';
        RL21UtilWP::_e('I already did');
        echo '</a></p>';
        echo '</div>';
    }

    // private static function survey_dismissed($forceTime)
    // {
    //     $user_id = get_current_user_id();
    //     if (empty($user_id)) {
    //         wp_send_json_error(null, 403);
    //     }
    //     if (isset($_GET['rl_survey_dismissed'])) {
    //         delete_user_meta($user_id, 'rl_survey_dismissed');
    //         update_user_meta($user_id, 'rl_survey_dismissed', intval($_GET['rl_survey_dismissed']), false);
    //     }
    //     if ($forceTime) {
    //         delete_user_meta($user_id, 'rl_survey_dismissed');
    //         update_user_meta($user_id, 'rl_survey_dismissed', $forceTime, false);
    //     }
    // }
    public static function admin_init()
    {
        // if (isset($_GET['rl_survey_dismissed'])) {
        //     self::survey_dismissed(0);
        // }
    }

    protected static function get_warnings(&$count, $print)
    {

        if (self::$rabbitloader_cache_warnings === false) {

            self::$rabbitloader_cache_warnings = [];

            $otherConflictPluginMessages = RabbitLoader_21_Conflicts::getMessages(false);
            foreach ($otherConflictPluginMessages as $plugMessage) {
                self::$rabbitloader_cache_warnings[] = $plugMessage;
            }

            $adv_cache_msg = RL21UtilWP::__("The file /wp-content/advanced-cache.php is not writable. Please make sure that the PHP script has write access to the /wp-content/ directory and refresh this page to make RabbitLoader work efficiently.");

            if (!defined('RABBITLOADER_AC_ACTIVE') || (RABBITLOADER_PLUG_VERSION != RABBITLOADER_AC_PLUG_VERSION) || (LOGGED_IN_COOKIE != RABBITLOADER_AC_LOGGED_IN_COOKIE)) {
                $aac_code = self::activate_advanced_cache();
                if ($aac_code === 4) {
                    self::$rabbitloader_cache_warnings[] = $adv_cache_msg;
                }
            }

            if ((!defined("WP_CACHE") || !WP_CACHE)) {
                if (RL21UtilWP::is_flywheel()) {
                    self::$rabbitloader_cache_warnings[] = sprintf(RL21UtilWP::__('Please enable WP_CACHE from the Flywheel settings <a href="%s">check details</a>'), "https://rabbitloader.com/kb/settings-for-flywheel/");
                } else if (!self::update_wp_config_const('WP_CACHE', 'true')) {
                    self::$rabbitloader_cache_warnings[] = RL21UtilWP::__("The file /wp-config.php is not writable. Please make sure the file is writable or set WP_CACHE value to true to make RabbitLoader work efficiently.");
                }
            }

            RabbitLoader_21_Core::getWpOption($rl_wp_options);
            if (!empty($rl_wp_options['rl_hb_messages'])) {
                foreach ($rl_wp_options['rl_hb_messages'] as $message) {
                    if (!empty($message['fd'])) {
                        self::$rabbitloader_cache_warnings[] = RL21UtilWP::__($message['fd']);
                    }
                }
            }
            if (!empty($rl_wp_options['rl_latest_plugin_v'])) {
                if (version_compare(RABBITLOADER_PLUG_VERSION, $rl_wp_options['rl_latest_plugin_v']) == -1) {
                    self::$rabbitloader_cache_warnings[] = RL21UtilWP::__("You are using an outdated version of RabbitLoader plugin. Please update it for a better experience.");
                }
            }
        }

        $count = count(self::$rabbitloader_cache_warnings);

        if ($print) {
            foreach (self::$rabbitloader_cache_warnings as $message) {
                // echo '<div class="alert alert-danger" role="alert">';
                // _e($message, RABBITLOADER_TEXT_DOMAIN);
                // echo '</div>';
                echo '<div class="notice notice-error"><p><b>';
                RL21UtilWP::_e('Warning');
                echo ': </b>';
                _e($message, RABBITLOADER_TEXT_DOMAIN);
                echo '</div>';
            }
        }
    }

    public static function activate_advanced_cache()
    {

        try {
            if (!empty(RabbitLoader_21_Conflicts::getMessages(false))) {
                return 1;
            }

            // if (!RabbitLoader_21_Core::htaccessExists()) {
            //     return 2;
            // }

            $adv_cache_sample = RABBITLOADER_PLUG_DIR . "advanced-cache.php";
            $file_updated = false;
            if (file_exists($adv_cache_sample)) {
                $adv_cache_contents = file_get_contents($adv_cache_sample);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_ABSPATH%%", ABSPATH, $adv_cache_contents);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_PLUG_DIR%%", RABBITLOADER_PLUG_DIR, $adv_cache_contents);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_LOGGED_IN_COOKIE%%", LOGGED_IN_COOKIE, $adv_cache_contents);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_CACHE_DIR%%", RABBITLOADER_CACHE_DIR, $adv_cache_contents);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_PLUG_VERSION%%", RABBITLOADER_PLUG_VERSION, $adv_cache_contents);
                $adv_cache_contents = str_replace("%%RABBITLOADER_AC_PLUG_ENV%%", RABBITLOADER_PLUG_ENV, $adv_cache_contents);

                $advanced_cache_file = WP_CONTENT_DIR . DIRECTORY_SEPARATOR . 'advanced-cache.php';
                $file_updated = RabbitLoader_21_Util_Core::fpc($advanced_cache_file, $adv_cache_contents, WP_DEBUG);
            }

            if ($file_updated) {
                self::update_wp_config_const('WP_CACHE', 'true');
                return 3;
            } else {
                return 4;
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }

    private static function update_wp_config_const($const_name, $const_val)
    {
        $wp_config_path = RL21UtilWP::get_wp_config();
        //check if config file is writable
        if (empty($wp_config_path) || !is_writable($wp_config_path)) {
            //echo 'rl_not_writable__';
            return;
        }

        $lines = file($wp_config_path);
        $last_line = count($lines) - 1;

        $new_file = array();
        $const_added  = false;
        foreach ($lines as $current_line => $line_content) {
            //check if constant is already defined
            if (preg_match("/define\(\s*'{$const_name}'/i", $line_content)) {
                $const_added = true;
                $new_file[] = "if (!defined('{$const_name}')) { define( '{$const_name}', {$const_val} );}\n\n";
                continue; //dont't break here, its a complete file rewrite
            }

            $thatsAllLine = (preg_match("/\/\* That's all, stop editing!.*/i", $line_content)); //constants should be before this line.
            $isLast = ($thatsAllLine && !defined($const_name)) || ($last_line == $current_line);

            // If we reach the end and no define - add it.
            if (empty($const_added) && $isLast) {
                $const_added = true;
                $new_file[] = "if (!defined('{$const_name}')) { define( '{$const_name}', {$const_val} );}\n\n";
            }

            $new_file[] = $line_content;
        }
        $file_contents = implode("", $new_file);
        return RabbitLoader_21_Util_Core::fpc($wp_config_path, $file_contents, WP_DEBUG);
    }

    public static function plugin_deactivate()
    {
        try {
            self::update_wp_config_const('WP_CACHE', 'false');
            $advanced_cache_file = WP_CONTENT_DIR . DIRECTORY_SEPARATOR . 'advanced-cache.php';
            if (file_exists($advanced_cache_file)) { //during uninstall RABBITLOADER_AC_ACTIVE will not be there
                $adv_cache_contents = "";
                $file_updated = RabbitLoader_21_Util_Core::fpc($advanced_cache_file, $adv_cache_contents, WP_DEBUG);
            }
        } catch (Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }

    public static function plugin_uninstall()
    {
        self::plugin_deactivate();

        $post_data['uninstall'] = 1;
        $http = RabbitLoader_21_Core::callPOSTAPI('domain/heartbeat', $post_data, $apiError, $apiMessage);

        try {
            RabbitLoader_21_Core::cleanAllCachedFiles();
            RabbitLoader_21_Core::delete_log_file(RabbitLoader_21_Core::LOCAL_CONFIG_FILE);
        } catch (Exception $e) {
        }
        $ourOptions = array('rabbitloader_field_apikey', 'rabbitloader_field_apisecret', 'rabbitloader_field_domain', 'rl_optimizer_engine_version', 'rabbit_loader_wp_options', 'rabbit_loader_user_options', 'rabbitloader_cdn_prefix');

        foreach ($ourOptions as $optionName) {
            delete_option($optionName);
        }
    }

    private static function rl_site_connected()
    {
        try {
            RabbitLoader_21_TP::purge_all($tp_purge_count);
        } catch (\Throwable $e) {
            RabbitLoader_21_Core::on_exception($e);
        }
    }

    public static function settings_link($links)
    {
        $url_settings = esc_url(add_query_arg(
            'page',
            'rabbitloader',
            get_admin_url() . 'admin.php'
        ));
        $link = "<a href='$url_settings'>" . __('Settings') . '</a>';
        array_push($links, $link);
        $url_kb = esc_url('https://rabbitloader.com/kb/');
        $link = "<a target='_blank' href='$url_kb'>" . __('Knowledge Base') . '</a>';
        array_push($links, $link);
        return $links;
    }
}
