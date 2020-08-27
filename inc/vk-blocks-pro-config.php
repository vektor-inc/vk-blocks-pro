<?php

require_once 'vk-blocks/load-swiper.php';

$vk_blocks_options  = get_option( 'vk_blocks_options' );
if( empty( $vk_blocks_options['hide_vk_block_template'] ) ) {
	require_once plugin_dir_path( __FILE__ ) . '/vk-blocks/vk-blocks-pro-template.php';
}

$path = dirname(dirname(__FILE__)) .'/inc/vk-blocks/App/RestAPI/BlockMeta/EntryPoint.php';
require_once $path;
//BlockMeta用のAPIルートを設定
new EntryPoint();
