<?php

define( 'VK_BLOCKS_PRO_PATH', plugin_dir_path( __FILE__ ) . 'vk-blocks-pro/' );

require_once VK_BLOCKS_PRO_PATH . 'load-swiper.php';
require_once VK_BLOCKS_PRO_PATH . 'vk-blocks-pro-functions.php';

$vk_blocks_options  = vkblocks_get_options();
if ( "display" === $vk_blocks_options['display_vk_block_template'] ) {
	require_once VK_BLOCKS_PRO_PATH . 'vk-blocks-pro-template.php';
}

$path = dirname(dirname(__FILE__)) .'/inc/vk-blocks/App/RestAPI/BlockMeta/EntryPoint.php';
require_once $path;
//BlockMeta用のAPIルートを設定
new EntryPoint();
