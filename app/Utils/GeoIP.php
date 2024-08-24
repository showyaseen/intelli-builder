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
 * Class GeoIP
 *
 * Provides functionality to retrieve the user's geographical location based on their IP address.
 *
 * @package YTAHA\IntelliBuilder
 */
class GeoIP {

	use SingletonTrait;

	/**
	 * The user's country.
	 *
	 * @var string
	 */
	protected $country = '';

	/**
	 * The user's city.
	 *
	 * @var string
	 */
	protected $city = '';

	/**
	 * GeoIP constructor.
	 *
	 * Initializes the user's location by calling the get_user_location() method.
	 */
	public function __construct() {
		$this->get_user_location();
	}

	/**
	 * Retrieves the user's location based on their IP address.
	 *
	 * This method fetches the user's IP address and uses the ip-api.com service to get the country and city.
	 *
	 * @return void
	 */
	private function get_user_location() {
		$ip = $this->get_ip_address();

		// Validate the IP address format
		if ( ! filter_var( $ip, FILTER_VALIDATE_IP ) ) {
			return;
		}

		$url      = esc_url_raw( "http://ip-api.com/json/{$ip}" );
		$response = wp_remote_get( $url );

		if ( is_wp_error( $response ) ) {
			return;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return;
		}

		// Check if the response is successful
		if ( isset( $data['status'] ) && 'success' === $data['status'] ) {
			$this->country = sanitize_text_field( strtolower( $data['country'] ?? '' ) );
			$this->city    = sanitize_text_field( strtolower( $data['city'] ?? '' ) );
		}
	}

	/**
	 * Gets the user's country.
	 *
	 * @return string The user's country.
	 */
	public function get_country(): string {
		return $this->country;
	}

	/**
	 * Gets the user's city.
	 *
	 * @return string The user's city.
	 */
	public function get_city(): string {
		return $this->city;
	}

	/**
	 * Retrieves the user's IP address.
	 *
	 * This method checks various server variables to find the user's IP address.
	 *
	 * @return string The user's IP address.
	 */
	private function get_ip_address(): string {
		$ip_sources = array(
			'HTTP_CLIENT_IP',
			'HTTP_X_FORWARDED_FOR',
			'REMOTE_ADDR',
		);

		foreach ( $ip_sources as $key ) {
			if ( ! empty( $_SERVER[ $key ] ) ) {
				$ip = sanitize_text_field( wp_unslash( $_SERVER[ $key ] ) );
				return explode( ',', $ip )[0]; // Handle cases where multiple IPs are returned
			}
		}

		return '0.0.0.0'; // Return a default value if no IP is found
	}
}
