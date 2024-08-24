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

namespace YTAHA\IntelliBuilder\Traits;

/**
 * Trait SingletonTrait
 *
 * Provides a singleton implementation for classes.
 *
 * @package YTAHA\IntelliBuilder
 */
trait SingletonTrait {

	/**
	 * Get the singleton instance of the called class.
	 *
	 * @param mixed $args Arguments to pass to the class constructor.
	 * @return mixed The singleton instance of the called class.
	 */
	public static function get_instance( $args = null ) {
		static $instances = array();

		$called_class_name = get_called_class();

		if ( ! isset( $instances[ $called_class_name ] ) ) {
			if ( null !== $args ) {
				$instances[ $called_class_name ] = new $called_class_name( $args );
			} else {
				$instances[ $called_class_name ] = new $called_class_name();
			}
		}

		return $instances[ $called_class_name ];
	}

	/**
	 * Prevent cloning of the singleton instance.
	 */
	private function __clone() {
	}

	/**
	 * Prevent unserializing of the singleton instance.
	 */
	private function __wakeup() {
	}
}
