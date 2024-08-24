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

/**
 * Class UserName
 *
 * This class checks if the logged-in user's username matches any of the specified usernames.
 *
 * @package YTAHA\IntelliBuilder
 */
class UserName implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var array $user_names The list of usernames to check against the logged-in user's username.
	 */
	protected $user_names;

	/**
	 * UserName constructor.
	 *
	 * @param array $rules The rules array containing the specific usernames.
	 */
	public function __construct( $rules ) {
		$this->user_names = $this->sanitize_nested_array( $rules['specificUsers'] ?? [] );
	}

	/**
	 * Get the logged-in user's display name.
	 *
	 * @return string The display name of the logged-in user or an empty string if no user is logged in.
	 */
	public function get_user_name(): string {
		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();
			return $user->display_name;
		}
		return '';
	}

	/**
	 * Check if the logged-in user's username matches any of the specified usernames.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		$names = array_map(
			function ( $name ) {
				return strtolower( $name );
			},
			$this->user_names
		);

		return in_array( strtolower( $this->get_user_name() ), $names );
	}
}
