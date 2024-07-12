<?php

namespace YTAHA\IntelliBuilder\Blocks;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;
use YTAHA\IntelliBuilder\Controllers\RulesCheckController;

class BlockGenerator
{
	use SingletonTrait;

	private function __construct()
	{
		add_action('enqueue_block_editor_assets', [$this, 'register_block_visibility_settings']);
		add_action('init', [$this, 'register_blocks']);
		add_filter('render_block', [$this, 'add_visibility_settings'], 10, 2);
	}

	public function add_visibility_settings($block_content, $block)
	{
		$rules = $block['attrs']['intelliBuidlerSettings'] ?? [];

		if (empty($rules) || !$rules['enableConditionalContent']) {
			return $block_content;
		}

		$rule_checker_controller = RulesCheckController::get_instance();
		$should_render = $rule_checker_controller->should_render($rules);
		if ($should_render) {
			return $block_content;
		}

		return '';
	}



	public function register_blocks()
	{
		register_block_type_from_metadata(
			plugin_dir_path(__FILE__) . '../../build/blocks/intelli-builder'
		);
	}

	public function register_block_visibility_settings()
	{
		$assets = include YTAHA_INTELLI_BUILDER_DIR . 'build/blocks/visibilty-settings/index.asset.php';
		wp_enqueue_script(
			'intilli-builder-visibility-settings',
			YTAHA_INTELLI_BUILDER_ASSETS_URL . '/blocks/visibilty-settings/index.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);

		wp_enqueue_style(
			'intilli-builder-visibility-settings',
			YTAHA_INTELLI_BUILDER_ASSETS_URL . '/blocks/visibilty-settings/index.css',
		);
	}
}
