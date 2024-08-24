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
 * Class UserRole
 *
 * This class checks if the logged-in user's role matches any of the specified roles.
 *
 * @package YTAHA\IntelliBuilder
 */
class UserRole implements Rule {

	use SingletonTrait, SanitizedNestedTrait;

	/**
	 * @var array $roles The list of roles to check against the logged-in user's roles.
	 */
	protected $roles;

	/**
	 * UserRole constructor.
	 *
	 * @param array $rules The rules array containing the user roles.
	 */
	public function __construct( $rules ) {
		$this->roles = $this->sanitize_nested_array( $rules['userRoles'] ?? [] );
	}

	/**
	 * Get the logged-in user's roles.
	 *
	 * @return array The roles of the logged-in user or an empty array if no user is logged in.
	 */
	public function get_user_roles(): array {
		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();
			return $user->roles;
		}
		return array();
	}

	/**
	 * Check if the logged-in user's role matches any of the specified roles.
	 *
	 * @return bool True if a match is found, false otherwise.
	 */
	public function is_met(): bool {
		$roles = array_map(
			function ( $role ) {
				return strtolower( $role );
			},
			$this->roles
		);

		foreach ( $this->get_user_roles() as $role ) {
			if ( in_array( strtolower( $role ), $roles ) ) {
				return true;
			}
		}
		return false;
	}
}
