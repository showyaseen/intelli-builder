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
 * Trait SanitizedNestedTrait
 *
 * Provides a helper method to sanitized nested array.
 *
 * @package YTAHA\IntelliBuilder
 */
trait SanitizedNestedTrait
{
	/**
	 * Recursively sanitize a nested array.
	 *
	 * @param array $array The nested array to sanitize.
	 * @return array The sanitized array.
	 */
	public function sanitize_nested_array(array $array): array
	{
		$sanitized_array = array();

		foreach ($array as $key => $value) {
			// Check if the value is an array itself
			if (is_array($value)) {
				// Recursively sanitize the nested array
				$sanitized_array[sanitize_text_field($key)] = $this->sanitize_nested_array($value);
			} else {
				// Otherwise, sanitize the key and value directly
				$sanitized_array[sanitize_text_field($key)] = sanitize_text_field($value);
			}
		}

		return $sanitized_array;
	}
}
