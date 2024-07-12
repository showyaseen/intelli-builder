<?php

/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is an advanced WordPress plugin that integrates AI tools like ChatGPT and Gemini to enhance your site-building experience. It seamlessly integrates with popular builders like Gutenberg, Elementor, Beaver Builder, and Divi. IntelliBuilder allows you to generate content and style blocks, create posts and pages, and automate periodic postings using AI.
 * Version: 0.0.1
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 */

defined('ABSPATH') or die('No script kiddies please!');

// Autoload dependencies
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

// Use Singleton Trait for Main Plugin Class
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

final class IntelliBuilder
{
	use SingletonTrait;

	private function __construct()
	{
		$this->define_contatnts();
		$this->setup_hooks();
	}

	private function define_contatnts()
	{
		// Plugin version.
		if (!defined('YTAHA_INTELLI_BUILDER_VERSION')) {
			define('YTAHA_INTELLI_BUILDER_VERSION', '0.0.1');
		}

		// Define YTAHA_INTELLI_BUILDER_PLUGIN_FILE.
		if (!defined('YTAHA_INTELLI_BUILDER_PLUGIN_FILE')) {
			define('YTAHA_INTELLI_BUILDER_PLUGIN_FILE', __FILE__);
		}

		// Plugin directory.
		if (!defined('YTAHA_INTELLI_BUILDER_DIR')) {
			define('YTAHA_INTELLI_BUILDER_DIR', plugin_dir_path(__FILE__));
		}

		// Plugin url.
		if (!defined('YTAHA_INTELLI_BUILDER_URL')) {
			define('YTAHA_INTELLI_BUILDER_URL', plugin_dir_url(__FILE__));
		}

		// Assets url.
		if (!defined('YTAHA_INTELLI_BUILDER_ASSETS_URL')) {
			define('YTAHA_INTELLI_BUILDER_ASSETS_URL', YTAHA_INTELLI_BUILDER_URL . 'build');
		}

		// Plugin Settings Option Name.
		if (!defined('YTAHA_INTELLI_BUILDER_OPTION_NAME')) {
			define('YTAHA_INTELLI_BUILDER_OPTION_NAME', 'ytaha_intelli_builder_settings');
		}
	}

	private function setup_hooks()
	{
		add_action('plugins_loaded', [$this, 'init']);
	}

	public function init()
	{
		$this->load_textdomain();
		$this->register_services();
	}

	private function load_textdomain()
	{
		load_plugin_textdomain('intellibuilder', false, dirname(plugin_basename(__FILE__)) . '/languages');
	}

	private function register_services()
	{
		// Register Admin Menu.
		\YTAHA\IntelliBuilder\Admin\AdminMenu::get_instance();

		// Register ItelliBuilder Custom Blocks.
		\YTAHA\IntelliBuilder\Blocks\BlockGenerator::get_instance();

		// Register API Endpoints
		// \YTAHA\IntelliBuilder\Endpoints\Admin\Settings::get_instance();

		// Register Cookie Manager
		// \YTAHA\IntelliBuilder\Utils\CookieManager::get_instance();
	}
}

// Initialize the plugin
IntelliBuilder::get_instance();
