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

/**
 * Class UserStatus
 *
 * This class checks the logged-in status of the user or match specific user.
 *
 * @package YTAHA\IntelliBuilder
 */
class UserStatus implements Rule {

	use SingletonTrait;

	/**
	 * @var string $status The status to check against the user's logged-in status or match specific user.
	 */
	protected $status;

	/**
	 * UserStatus constructor.
	 *
	 * @param array $rules The rules array containing the user status.
	 */
	public function __construct( $rules ) {
		$this->status = sanitize_text_field( $rules['userStatus'] ?? '' );
	}

	/**
	 * Check if the user's status matches the specified status: logged-in, logged-out or specific users.
	 *
	 * @return bool True if the status matches, false otherwise.
	 */
	public function is_met(): bool {
		return ( $this->status === 'loggedin' || $this->status === 'specific' )
			? is_user_logged_in()
			: ! is_user_logged_in();
	}
}
