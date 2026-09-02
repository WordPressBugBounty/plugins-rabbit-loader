<?php
/**
 * Runtime integration (Path 2): serves optimized pages via the ported SDK,
 * using NATIVE WordPress calls for the bypass logic instead of the old
 * plugin's helper-class web.
 *
 * Flow:
 *   advanced-cache.php  → RL5_Runtime::process('ac')   (very early, cache HIT serves here)
 *   plugins_loaded/init → RL5_Runtime::process('wp')   (fallback + miss capture)
 *   shutdown            → SDK captures origin HTML → optimizer → LONG cache
 *
 * The SDK (inc/RabbitLoader/SDK/*) is the caching engine and is unchanged.
 *
 * @package RabbitLoader
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class RL5_Runtime {

	/** @var \RabbitLoader\SDK\RabbitLoader|null */
	private static $sdk = null;
	private static $skip_reason = '';
	private static $processed = false;

	/**
	 * Load the SDK classes (namespace RabbitLoader\SDK).
	 */
	private static function load_sdk_files() {
		$dir = RL5_DIR . 'inc/RabbitLoader/SDK/';
		require_once $dir . 'File.php';
		require_once $dir . 'Exc.php';
		require_once $dir . 'Util.php';
		require_once $dir . 'WordPress.php';
		require_once $dir . 'Cache.php';
		require_once $dir . 'API.php';
		require_once $dir . 'Request.php';
		require_once $dir . 'RabbitLoader.php';
	}

	/**
	 * Cache storage directory. Kept OUTSIDE the plugin so it survives updates.
	 * wp-content/cache/rabbitloader/<did>/
	 */
	public static function cache_dir() {
		$base = defined( 'WP_CONTENT_DIR' ) ? WP_CONTENT_DIR : ( ABSPATH . 'wp-content' );
		$did  = RL5_Settings::did();
		$did  = $did ? $did : 'default';
		return rtrim( $base, '/\\' ) . '/cache/rabbitloader/' . $did;
	}

	/**
	 * Build (or reuse) the SDK instance.
	 * @return \RabbitLoader\SDK\RabbitLoader|null
	 */
	private static function sdk() {
		if ( null !== self::$sdk ) {
			return self::$sdk;
		}
		$token = RL5_Settings::api_token();
		if ( '' === $token ) {
			return null; // not connected → no runtime
		}
		self::load_sdk_files();

		self::$sdk = new \RabbitLoader\SDK\RabbitLoader( $token, self::cache_dir() );
		self::$sdk->setDebug( defined( 'WP_DEBUG' ) && WP_DEBUG );
		self::$sdk->setPlatform( array(
			'plugin_cms' => 'wp',
			'plugin_v'   => RL5_VERSION,
			'cms_v'      => get_bloginfo( 'version' ),
		) );
		return self::$sdk;
	}

	/**
	 * Entry point. $mode = 'ac' (advanced-cache, very early) or 'wp' (hooked).
	 */
	public static function process( $mode = 'wp' ) {
		if ( self::$processed ) {
			return;
		}

		$sdk = self::sdk();
		if ( null === $sdk ) {
			return;
		}

		try {
			\RabbitLoader\SDK\Util::sendHeader( 'x-rl-mode: ' . $mode, false );

			// Ignore tracking params so they don't fragment the cache.
			$sdk->ignoreParams( array(
				'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
				'gclid', 'fbclid', 'msclkid', 'mc_cid', 'mc_eid', '_ga', 'ref',
			) );

			// ME mode (serve optimized only to the owner for testing).
			if ( '1' === (string) RL5_Settings::get( 'private_mode_val', '' ) ) {
				$sdk->setMeMode();
			}

			// Exclude-path patterns from settings (one per line).
			$excludes_raw = (string) RL5_Settings::get( 'exclude_patterns', '' );
			if ( '' !== trim( $excludes_raw ) ) {
				$sdk->skipForPaths( array_filter( array_map( 'trim', explode( "\n", $excludes_raw ) ) ) );
			}

			// Skip cache for cart/session cookies (native names).
			$sdk->skipForCookies( self::bypass_cookies() );

			// The bypass decision (native WP). If skipping, tell the SDK.
			$reason = self::skip_reason( $mode );
			if ( '' !== $reason ) {
				$sdk->ignoreRequest( $reason );
			}

			// When the SDK optimizes/purges a URL, also purge our CDN.
			$sdk->registerPurgeCallback( function ( $url ) {
				if ( class_exists( 'RL5_API' ) ) {
					// Fire a targeted purge for the changed URL (best-effort).
					try {
						$api = new RL5_API();
						if ( method_exists( $api, 'purge_url' ) ) {
							$api->purge_url( $url );
						}
					} catch ( \Throwable $e ) {
						// swallow — purge callback must never break page serving
					}
				}
			} );

			$sdk->process();
			self::$processed = true;
		} catch ( \Throwable $e ) {
			// Runtime must never fatal a page.
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				error_log( 'RL5 runtime: ' . $e->getMessage() );
			}
		}
	}

	/**
	 * Cookie names that mean "don't serve cache" (logged-in, Woo cart/session).
	 */
	private static function bypass_cookies() {
		$cookies = array(
			'wordpress_logged_in_',       // any logged-in user
			'comment_author_',            // commenters
			'woocommerce_items_in_cart',  // Woo cart not empty
			'woocommerce_cart_hash',
			'wp_woocommerce_session_',    // Woo session
			'edd_items_in_cart',          // Easy Digital Downloads
		);
		return $cookies;
	}

	/**
	 * Native-WP bypass logic. Mirrors old can_cache_request() exactly, but
	 * calls WordPress/Woo functions directly. Returns '' if cacheable,
	 * else a short skip reason string.
	 *
	 * NOTE: in 'ac' mode (advanced-cache, pre-WP) most conditional tags are
	 * unavailable — the SDK's own cookie/path checks + the HIT-only serve
	 * handle that safely. The full checks run in 'wp' mode (after init).
	 */
	private static function skip_reason( $mode ) {
		if ( '' !== self::$skip_reason ) {
			return self::$skip_reason;
		}

		// Method must be GET.
		$method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) ) : 'GET';
		if ( 'GET' !== $method ) {
			return self::$skip_reason = 'method-' . strtolower( $method );
		}

		// No HTTP host / CLI.
		if ( empty( $_SERVER['HTTP_HOST'] ) || ( defined( 'WP_CLI' ) && WP_CLI ) || php_sapi_name() === 'cli' ) {
			return self::$skip_reason = 'cli';
		}

		// In 'ac' (pre-WordPress) we can't call conditional tags. The SDK
		// only SERVES on a valid HIT and only for anonymous requests
		// (cookie bypass already applied), so it's safe to proceed.
		if ( 'ac' === $mode ) {
			return '';
		}

		// ---- 'wp' mode: full WordPress checks (functions now available) ----

		if ( function_exists( 'is_user_logged_in' ) && is_user_logged_in() ) {
			return self::$skip_reason = 'user-session';
		}

		if ( ( function_exists( 'wp_doing_ajax' ) && wp_doing_ajax() ) || ( defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
			return self::$skip_reason = 'ajax';
		}
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return self::$skip_reason = 'rest';
		}
		if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
			return self::$skip_reason = 'cron';
		}

		if ( function_exists( 'is_admin' ) && is_admin() ) {
			return self::$skip_reason = 'admin';
		}
		if ( function_exists( 'is_search' ) && is_search() ) {
			return self::$skip_reason = 'search';
		}
		if ( function_exists( 'is_404' ) && is_404() ) {
			return self::$skip_reason = '404';
		}
		if ( function_exists( 'is_feed' ) && is_feed() ) {
			return self::$skip_reason = 'feed';
		}
		if ( function_exists( 'is_preview' ) && is_preview() ) {
			return self::$skip_reason = 'preview';
		}

		// WooCommerce cart/checkout/account pages.
		if ( function_exists( 'is_cart' ) && is_cart() ) {
			return self::$skip_reason = 'cart';
		}
		if ( function_exists( 'is_checkout' ) && is_checkout() ) {
			return self::$skip_reason = 'checkout';
		}
		if ( function_exists( 'is_account_page' ) && is_account_page() ) {
			return self::$skip_reason = 'account';
		}
		// Woo cart with items (cookie is the fast signal; this is the WP-side check).
		if ( function_exists( 'WC' ) && WC() && isset( WC()->cart ) && WC()->cart && ! WC()->cart->is_empty() ) {
			return self::$skip_reason = 'cart-items';
		}

		return '';
	}

	/**
	 * Register WordPress hooks for the miss/capture path (called from plugin boot).
	 */
	public static function hooks() {
		if ( ! RL5_Settings::is_connected() ) {
			return;
		}
		// Run the full-check process after WP is initialized (miss path capture).
		add_action( 'template_redirect', array( __CLASS__, 'on_template_redirect' ), 0 );

		// Avoid caching redirects.
		add_filter( 'wp_redirect', array( __CLASS__, 'note_redirect' ), 10, 1 );
	}

	public static function on_template_redirect() {
		self::process( 'wp' );
	}

	public static function note_redirect( $location ) {
		self::$skip_reason = 'redirect';
		if ( self::$sdk ) {
			self::$sdk->ignoreRequest( 'redirect' );
		}
		return $location;
	}
}
