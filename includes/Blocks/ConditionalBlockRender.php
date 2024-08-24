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

namespace YTAHA\IntelliBuilder\Blocks;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Controllers\ConditionalRulesController;

/**
 * Class ConditionalBlockRender
 *
 * This class handles the conditional rendering of Gutenberg blocks.
 *
 * @package YTAHA\IntelliBuilder
 */
class ConditionalBlockRender {

	use SingletonTrait;

	/**
	 * ConditionalBlockRender constructor.
	 * Adds a filter to apply conditional rendering to blocks.
	 */
	private function __construct() {
		add_filter( 'render_block', array( $this, 'apply_conditional_block_render' ), 10, 2 );
	}

	/**
	 * Apply conditional rendering to a block.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block The block data.
	 * @return string The empty string or block content based on conditional rules.
	 */
	public function apply_conditional_block_render( string $block_content, array $block ): string {
		$rules = $block['attrs']['intelliBuidlerSettings'] ?? array();

		if ( empty( $rules ) || ! $rules['enableConditionalContent'] ) {
			return $block_content;
		}

		$conditional_rules_controller = ConditionalRulesController::get_instance();
		$should_render                = $conditional_rules_controller->should_render( $rules );

		return $should_render ? $block_content : '';
	}
}
