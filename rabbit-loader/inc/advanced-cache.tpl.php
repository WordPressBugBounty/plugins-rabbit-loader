<?php
/**
 * RabbitLoader advanced-cache.php drop-in (TEMPLATE).
 *
 * This template is written to wp-content/advanced-cache.php by
 * RL5_Dropin::install(), with the %%PLACEHOLDERS%% replaced. It runs on EVERY
 * request before WordPress fully loads. On a cache HIT it serves optimized
 * HTML and exits early (WordPress never boots = fast).
 *
 * To fully remove: delete wp-content/advanced-cache.php and set WP_CACHE false.
 *
 * @package RabbitLoader
 */

defined( 'ABSPATH' ) or die( 'not allowed' );

if ( ! defined( 'RL5_AC_ACTIVE' ) ) {

	define( 'RL5_AC_ABSPATH', '%%RL5_AC_ABSPATH%%' );

	// Guard: ensure this install wasn't copied from another folder (stale cache safety).
	if ( ABSPATH === RL5_AC_ABSPATH ) {

		define( 'RL5_AC_ACTIVE', true );
		define( 'RL5_AC_PLUG_DIR', '%%RL5_AC_PLUG_DIR%%' );

		try {
			// Minimal constants the runtime/SDK need this early.
			if ( ! defined( 'RL5_DIR' ) ) {
				define( 'RL5_DIR', RL5_AC_PLUG_DIR );
			}
			if ( ! defined( 'RL5_VERSION' ) ) {
				define( 'RL5_VERSION', '%%RL5_AC_PLUG_VERSION%%' );
			}

			// Settings reads get_option(); WordPress option layer isn't loaded this
			// early, so the runtime reads credentials via a tiny direct path.
                        $rl5_settings_file = RL5_AC_PLUG_DIR . 'inc/class-rl-settings.php';
                        $rl5_runtime_file  = RL5_AC_PLUG_DIR . 'inc/class-rl-runtime.php';

                        // WordPress temporarily removes/replaces the plugin directory
                        // during an update. Never let the advanced-cache drop-in break
                        // the site while those files are unavailable.
                        if ( ! is_readable( $rl5_settings_file ) || ! is_readable( $rl5_runtime_file ) ) {
                                return;
                        }

                        require_once $rl5_settings_file;
                        require_once $rl5_runtime_file;

			RL5_Runtime::process( 'ac' );
		} catch ( \Throwable $e ) {
			// never break the site from the drop-in
		} catch ( \Exception $e ) {
			// php7 safety
		}
	}
}
