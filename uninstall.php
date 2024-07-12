<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

// Clean up options and other data here
delete_option('intellibuilder_option_name');
