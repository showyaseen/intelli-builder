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
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Traits\SanitizedNestedTrait;

use hisorange\BrowserDetect\Parser as Browser;

/**
 * Class OperatingSystem
 *
 * This class checks if the user's operating system matches the specified criteria.
 *
 * @package YTAHA\IntelliBuilder
 */
class OperatingSystem implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var array $osList List of operating systems to check against.
	 */
	protected $osList;

	/**
	 * OperatingSystem constructor.
	 *
	 * @param array $rules The rules array containing the operating system criteria.
	 */
	public function __construct( array $rules ) {
		$this->osList = $this->sanitize_nested_array( $rules['operatingSystem'] ?? [] );
	}

	/**
	 * Check if the user's operating system matches any in the list.
	 *
	 * @return bool True if the operating system matches, false otherwise.
	 */
	public function is_met(): bool {
		foreach ( $this->osList as $os ) {
			if ( strtolower( Browser::platformFamily() ) === strtolower( $os ) ) {
				return true;
			}
		}
		return false;
	}
}
