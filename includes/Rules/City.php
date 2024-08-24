<?php
/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 1.0.0
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Utils\GeoIP;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Traits\SanitizedNestedTrait;

/**
 * Class City
 *
 * This class checks if the user's city and country match any of the specified city-country pairs.
 *
 * @package YTAHA\IntelliBuilder
 */
class City implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var string $user_country The user's country.
	 */
	private $user_country;

	/**
	 * @var string $user_city The user's city.
	 */
	private $user_city;

	/**
	 * @var array $cities The list of city-country pairs to check against the user's city and country.
	 */
	private $cities = array();

	/**
	 * City constructor.
	 *
	 * @param array $rules The rules array containing the city-country rules.
	 */
	public function __construct( $rules ) {

		$this->cities = $this->sanitize_nested_array( $rules['geoLocation_city'] ?? [] );

		$geoIP              = GeoIP::get_instance();
		$this->user_city    = $geoIP->get_city();
		$this->user_country = $geoIP->get_country();
	}

	/**
	 * Check if the user's city and country match any of the specified city-country pairs.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		if ( ! $this->user_city || ! $this->user_country ) {
			return false;
		}

		foreach ( $this->cities as $city ) {
			$city_country = explode( '-', $city );
			if ( 2 === count( $city_country ) ) {
				$city    = strtolower( $city_country[0] );
				$country = strtolower( $city_country[1] );
				if ( $city === $this->user_city && $country === $this->user_country ) {
					return true;
				}
			}
		}
		return false;
	}
}
