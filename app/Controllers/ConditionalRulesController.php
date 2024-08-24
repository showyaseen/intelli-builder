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

namespace YTAHA\IntelliBuilder\Controllers;

use YTAHA\IntelliBuilder\Rules\RulesHandlerFactory;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class ConditionalRulesController
 *
 * This class controls the rendering of content based on conditional rules.
 *
 * @package YTAHA\IntelliBuilder
 */
class ConditionalRulesController {

	use SingletonTrait;

	/**
	 * Determine if content should be rendered based on the provided rules.
	 *
	 * @param array $rules The rules for rendering content.
	 * @return bool True if content should be rendered, false otherwise.
	 */
	public function should_render( array $rules ): bool {
		$action     = sanitize_text_field( $rules['action'] ) ?? null;
		$match      = sanitize_text_field( $rules['match'] ) ?? null;
		$is_matched = false;

		if ( null !== $action && null !== $match ) {
			if ( 'any' === $match ) {
				$is_matched = $this->match_any( $rules );
			} else {
				$is_matched = $this->match_all( $rules );
			}
		}

		return ( 'show' === $action ) ? $is_matched : ! $is_matched;
	}

	/**
	 * Check if all rules are met.
	 *
	 * @param array $rules The rules to check.
	 * @return bool True if all rules are met, false otherwise.
	 */
	private function match_all( array $rules ): bool {
		foreach ( $rules as $rule_name => $rule_params ) {
			if ( empty( $rule_params ) ) {
				continue;
			}
			$rule_handler = RulesHandlerFactory::get_rule_handler( $rule_name, $rules );
			if ( $rule_handler && ! $rule_handler->is_met() ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Check if any rule is met.
	 *
	 * @param array $rules The rules to check.
	 * @return bool True if any rule is met, false otherwise.
	 */
	private function match_any( array $rules ): bool {
		foreach ( $rules as $rule_name => $rule_params ) {
			$rule_handler = RulesHandlerFactory::get_rule_handler( $rule_name, $rules );
			if ( $rule_handler && $rule_handler->is_met() ) {
				return true;
			}
		}
		return false;
	}
}
