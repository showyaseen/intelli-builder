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
 * Class Country
 *
 * This class checks if the user's country matches any of the specified countries.
 *
 * @package YTAHA\IntelliBuilder
 */
class Country implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var string $user_country The user's country.
	 */
	private $user_country;

	/**
	 * @var array $countries The list of countries to check against the user's country.
	 */
	private $countries = array();

	/**
	 * Country constructor.
	 *
	 * @param array $rules The rules array containing the country rules.
	 */
	public function __construct( $rules ) {
		$this->countries = $this->sanitize_nested_array( $rules['geoLocation_country'] ?? [] );
		$this->user_country = GeoIP::get_instance()->get_country();
	}

	/**
	 * Check if the user's country matches any of the specified countries.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		if ( ! $this->user_country ) {
			return false;
		}

		foreach ( $this->countries as $country ) {
			if ( strtolower( $country ) === strtolower( $this->user_country ) ) {
				return true;
			}
		}

		return false;
	}
}
