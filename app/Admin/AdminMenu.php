<?php

namespace YTAHA\IntelliBuilder\Admin;

// use YTAHA\IntelliBuilder\Endpoints\Admin\Settings;
use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class AdminMenu {
	use SingletonTrait;

    public function __construct() {
        add_action('admin_menu', [$this, 'addPluginAdminMenu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminScripts']);
        // add_action('rest_api_init', [$this, 'registerApiRoutes']);
    }

    public function addPluginAdminMenu() {
        add_menu_page(
            'IntelliBuilder',
            'IntelliBuilder',
            'manage_options',
            'intellibuilder',
            [$this, 'displayPluginAdminPage'],
            'dashicons-admin-generic',
            26
        );
    }

    public function displayPluginAdminPage() {
        require_once plugin_dir_path(__FILE__) . '../views/admin-settings.php';
    }

    public function enqueueAdminScripts($hook) {
        if ($hook !== 'toplevel_page_intellibuilder') {
            return;
        }

		$assets = include YTAHA_INTELLI_BUILDER_DIR . 'build/admin-settings/index.asset.php';
        wp_enqueue_script(
            'intellibuilder-admin-settings',
            YTAHA_INTELLI_BUILDER_ASSETS_URL . '/admin-settings/index.js',
            $assets['dependencies'],
            null,
            true
        );

        wp_localize_script('intellibuilder-admin-settings', 'intellibuilderSettings', [
            'apiUrl' => Settings::get_instance()->get_endpoint_url(),
            'nonce' => wp_create_nonce('wp_rest'),
        ]);
    }
}

