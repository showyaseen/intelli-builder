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

namespace YTAHA\IntelliBuilder\Rules\Contract;

/**
 * Interface Rule
 *
 * This interface defines the contract for all rule classes.
 *
 * @package YTAHA\IntelliBuilder
 */
interface Rule {
	/**
	 * Determine if the rule's conditions are met.
	 *
	 * @return bool True if the conditions are met, false otherwise.
	 */
	public function is_met(): bool;
}
