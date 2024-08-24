<?php

/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that control who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 1.0.0
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// Autoload dependencies
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

// Use Singleton Trait for Main Plugin Class
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Main plugin class.
 */
final class IntelliBuilder {

	use SingletonTrait;

	/**
	 * IntelliBuilder constructor.
	 *
	 * @access private
	 */
	private function __construct() {
		$this->define_constants();
		$this->setup_hooks();
	}

	/**
	 * Define plugin constants.
	 */
	private function define_constants() {
		// Plugin version.
		if ( ! defined( 'YTAHA_INTELLI_BUILDER_VERSION' ) ) {
			define( 'YTAHA_INTELLI_BUILDER_VERSION', '1.0.0' );
		}

		// Plugin directory.
		if ( ! defined( 'YTAHA_INTELLI_BUILDER_DIR' ) ) {
			define( 'YTAHA_INTELLI_BUILDER_DIR', plugin_dir_path( __FILE__ ) );
		}

		// Plugin URL.
		if ( ! defined( 'YTAHA_INTELLI_BUILDER_URL' ) ) {
			define( 'YTAHA_INTELLI_BUILDER_URL', plugin_dir_url( __FILE__ ) );
		}

		// Assets URL.
		if ( ! defined( 'YTAHA_INTELLI_BUILDER_ASSETS_URL' ) ) {
			define( 'YTAHA_INTELLI_BUILDER_ASSETS_URL', YTAHA_INTELLI_BUILDER_URL . 'build' );
		}
	}

	/**
	 * Setup WordPress hooks.
	 */
	private function setup_hooks() {
		add_action( 'plugins_loaded', array( $this, 'init' ) );
	}

	/**
	 * Initialize the plugin.
	 */
	public function init() {
		$this->load_textdomain();
		$this->register_services();
	}

	/**
	 * Load plugin textdomain for translation.
	 */
	private function load_textdomain() {
		load_plugin_textdomain(
			'intelli-builder',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languages'
		);
	}

	/**
	 * Register plugin services.
	 */
	private function register_services() {
		// Register Block Assets Loader.
		\YTAHA\IntelliBuilder\Blocks\BlockLoader::get_instance();

		// Register Conditional Block Render.
		\YTAHA\IntelliBuilder\Blocks\ConditionalBlockRender::get_instance();
	}
}

// Initialize the plugin
IntelliBuilder::get_instance();
