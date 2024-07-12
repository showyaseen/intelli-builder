<?php

namespace IntelliBuilder\Admin;

class Admin {
	use SingletonTrait;

    public function __construct() {
        add_action('wp_ajax_save_intellibuilder_settings', [$this, 'saveSettings']);
        add_action('wp_ajax_get_intellibuilder_settings', [$this, 'getSettings']);
    }

    public function saveSettings() {
        check_ajax_referer('intellibuilder_nonce', 'nonce');

        $settings = [
            'enable_chatgpt' => sanitize_text_field($_POST['enable_chatgpt']),
            'chatgpt_api_key' => sanitize_text_field($_POST['chatgpt_api_key']),
            'enable_gemini' => sanitize_text_field($_POST['enable_gemini']),
            'gemini_api_key' => sanitize_text_field($_POST['gemini_api_key']),
        ];

        update_option('intellibuilder_settings', $settings);
        wp_send_json_success();
    }

    public function getSettings() {
        check_ajax_referer('intellibuilder_nonce', 'nonce');

        $settings = get_option('intellibuilder_settings');
        wp_send_json_success($settings);
    }
}

