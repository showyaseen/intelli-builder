<?php
namespace YTAHA\IntelliBuilder\Blocks;

use YTAHA\IntelliBuilder\Traits\SingletonTrait;

class BlockLoader {
	use SingletonTrait;

    public function __construct() {
        add_action('init', [$this, 'registerBlocks']);
    }

    public function registerBlocks() {
        register_block_type_from_metadata(
            plugin_dir_path(__FILE__) . '../../assets/js/blocks/example-block'
        );
    }
}
