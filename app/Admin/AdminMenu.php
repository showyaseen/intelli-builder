<?php
/**
 * Plugin Name: IntelliBuilder
 * Plugin URI: https://wordpress.com/plugins/intelli-builder
 * Description: IntelliBuilder is a WordPress plugin that controls who sees your content based on user rules, web-based rules, and scheduled time.
 * Version: 0.0.1
 * Author: Yaseen Taha
 * Author URI: showyaseen@hotmail.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: intelli-builder
 * Domain Path: /languages
 * Package: YTAHA\IntelliBuilder
 */

namespace YTAHA\IntelliBuilder\Admin;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

/**
 * Class AdminMenu
 *
 * Handles the creation and display of the admin menu for IntelliBuilder.
 *
 * @package YTAHA\IntelliBuilder
 */
class AdminMenu {
    use SingletonTrait;

    /**
     * AdminMenu constructor.
     *
     * Registers the 'admin_menu' action hook to add the IntelliBuilder admin menu.
     */
    public function __construct() {
        add_action('admin_menu', [$this, 'add_intelli_builder_admin_menu']);
    }

    /**
     * Add IntelliBuilder admin menu to the WordPress admin dashboard.
     *
     * @return void
     */
    public function add_intelli_builder_admin_menu() {
        add_menu_page(
            'IntelliBuilder',
            'IntelliBuilder',
            'manage_options',
            'intellibuilder',
            [$this, 'display_intelli_builder_admin_page'],
            'dashicons-admin-generic',
            26
        );
    }

    /**
     * Display the IntelliBuilder admin page.
     *
     * @return void
     */
    public function display_intelli_builder_admin_page() {
        require_once plugin_dir_path(__FILE__) . '../views/admin-settings.php';
    }
}
