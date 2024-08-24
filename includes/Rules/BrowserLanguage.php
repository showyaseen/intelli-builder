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

namespace YTAHA\IntelliBuilder\Rules;

use YTAHA\IntelliBuilder\Rules\Contract\Rule;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Traits\SanitizedNestedTrait;

/**
 * Class BrowserLanguage
 *
 * Checks if the user's browser language matches any of the specified languages.
 *
 * @package YTAHA\IntelliBuilder
 */
class BrowserLanguage implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * The list of languages to check against the user's browser language.
	 *
	 * @var array
	 */
	protected $languages = array();

	/**
	 * BrowserLanguage constructor.
	 *
	 * @param array $rules The rules array containing the browser language rules.
	 */
	public function __construct( array $rules ) {
        $this->languages = $this->sanitize_nested_array( $rules['browser_language'] );
	}

	/**
	 * Check if the user's browser language matches any of the specified languages.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		$user_language = strtolower( sanitize_text_field( wp_unslash( $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '' ) ) );

		foreach ( $this->languages as $language ) {
			if ( strpos( $user_language, strtolower( array_key_first( $language ) ) ) !== false ) {
				return true;
			}
		}

		return false;
	}
}
