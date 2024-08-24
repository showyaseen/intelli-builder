<?php

/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 1.0.0
 * Author: Yaseen Taha
 * Author URI: mailto:showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

namespace YTAHA\IntelliBuilder\Utils;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class CookieManager
 *
 * This class provides functionality to manage cookies, including setting and getting cookies.
 *
 * @package YTAHA\IntelliBuilder
 */
class CookieManager {

	use SingletonTrait;

	/**
	 * @var string $visits_cookie_name The name of the cookie that tracks user visits.
	 */
	protected $visits_cookie_name = 'user_visited';

	/**
	 * @var int $cookie_lifetime The lifetime of the cookie in seconds (e.g., 1 year).
	 */
	protected $cookie_lifetime = YEAR_IN_SECONDS;

	/**
	 * CookieManager constructor.
	 *
	 * Initializes the cookie manager and sets the visits cookie if it does not already exist.
	 */
	public function __construct() {
		if ( ! $this->get( $this->visits_cookie_name ) ) {
			// Set the cookie with the current timestamp as the value
			$this->set( $this->visits_cookie_name, $this->generate_cookie_value(), time() + $this->cookie_lifetime );
		}
	}

	/**
	 * Set a cookie securely.
	 *
	 * @param string $name The name of the cookie.
	 * @param string $value The value of the cookie.
	 * @param int    $expire The expiration time of the cookie.
	 */
	public function set( string $name, string $value, int $expire ): void {
		if ( $this->is_valid_cookie_name( $name ) ) {
			setcookie( $name, $value, $expire, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true );
		}
	}

	/**
	 * Get a cookie value securely.
	 *
	 * @param string $name The name of the cookie.
	 * @return string|null The sanitized value of the cookie or null if the cookie does not exist.
	 */
	public function get( string $name ): ?string {
		if ( $this->is_valid_cookie_name( $name ) ) {
			return isset( $_COOKIE[ $name ] ) ? sanitize_text_field( wp_unslash( $_COOKIE[ $name ] ) ) : null;
		}
		return null;
	}

	/**
	 * Generate a secure value for the user visit cookie.
	 *
	 * @return string The generated value.
	 */
	private function generate_cookie_value(): string {
		return wp_hash( time() );
	}

	/**
	 * Validate the cookie name to ensure it is a valid string.
	 *
	 * @param string $name The cookie name to validate.
	 * @return bool True if the name is valid, false otherwise.
	 */
	private function is_valid_cookie_name( string $name ): bool {
		return is_string( $name ) && ! empty( $name );
	}
}
