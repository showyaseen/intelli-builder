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

/**
 * Class BlockLoader
 *
 * This class is responsible for registering block visibility settings assets.
 * It uses WordPress JS filters to add visibility settings to all Gutenberg blocks.
 * These settings allow defining rules to control block visibility, later handled by ConditionalBlockRender class.
 *
 * @package YTAHA\IntelliBuilder
 */
class BlockLoader {
	use SingletonTrait;

	/**
	 * BlockLoader constructor.
	 * Registers the action to enqueue block editor assets.
	 */
	private function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'register_block_visibility_settings' ) );
	}

	/**
	 * Register block visibility settings assets.
	 * Enqueues the necessary scripts and styles for block visibility settings.
	 *
	 * @return void
	 */
	public function register_block_visibility_settings(): void {
		$assets = include YTAHA_INTELLI_BUILDER_DIR . 'build/blocks/visibilty-settings/index.asset.php';

		wp_enqueue_script(
			'intilli_builder_visibility_settings',
			YTAHA_INTELLI_BUILDER_ASSETS_URL . '/blocks/visibilty-settings/index.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);

		wp_enqueue_style(
			'intilli_builder_visibility_settings',
			YTAHA_INTELLI_BUILDER_ASSETS_URL . '/blocks/visibilty-settings/index.css',
			array(),
			YTAHA_INTELLI_BUILDER_VERSION
		);
	}
}
