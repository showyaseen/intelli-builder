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
 * Class BrowserName
 *
 * This class checks if the user's browser name matches any of the specified browser names.
 *
 * @package YTAHA\IntelliBuilder
 */
class BrowserName implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var array $browsers The list of browser names to check against the user's browser name.
	 */
	protected $browsers;

	/**
	 * BrowserName constructor.
	 *
	 * @param array $rules The rules array containing the browser name rules.
	 */
	public function __construct( $rules ) {
		$this->browsers = $this->sanitize_nested_array( $rules['browser_name'] ?? [] );
	}

	/**
	 * Check if the user's browser name matches any of the specified browser names.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		$user_browser = Browser::browserFamily();
		foreach ( $this->browsers as $browser_name ) {
			if ( strtolower( $user_browser ) === strtolower( $browser_name ) ) {
				return true;
			}
		}
		return false;
	}
}
