<?php
/**
 * Plugin Name: RabbitLoader
 * Plugin URI: https://rabbitloader.com/
 * Description: RabbitLoader WordPress connection and performance dashboard.
 * Version: 4.0.1
 * Author: Yogi Network
 * Author URI: https://rabbitloader.com/
 * License: GPLv2 or later
 * Text Domain: rabbitloader
 */

if (!defined('ABSPATH')) {
    exit;
}

define('RL5_VERSION', '4.0.1');
define('RL5_FILE', __FILE__);
define('RL5_DIR', plugin_dir_path(__FILE__));
define('RL5_URL', plugin_dir_url(__FILE__));

require_once RL5_DIR . 'inc/class-rl-settings.php';
require_once RL5_DIR . 'inc/sdk/class-rl-api.php';
require_once RL5_DIR . 'inc/sdk/class-rl-entitlement.php';
require_once RL5_DIR . 'inc/class-rl-admin.php';
require_once RL5_DIR . 'inc/class-rl-heartbeat.php';
require_once RL5_DIR . 'inc/class-rl-runtime.php';
require_once RL5_DIR . 'inc/class-rl-plugin.php';

add_action('plugins_loaded', ['RL5_Plugin', 'init']);

// Clear the heartbeat cron when the plugin is deactivated.
register_deactivation_hook(__FILE__, ['RL5_Heartbeat', 'clear_cron']);
