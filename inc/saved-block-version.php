<?php

// Do not load directly.
defined( 'ABSPATH' ) || die();

function vkblocks_register_saved_block_version_postmeta(){

	// プラグインのバージョンが0.49.8未満の時は、デフォルトバージョンを""に設定。
	$default_version = "";
	if( version_compare(vkblocks_get_version(), '0.49.8') >= 0 ){
		$default_version = vkblocks_get_version();
	}else{
		$default_version = "";
	}

	register_post_meta( 'post', '_vkb_saved_block_version', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
		'default' => $default_version,
	) );
};
add_action( 'init', 'vkblocks_register_saved_block_version_postmeta', 10, 0 );

function vkblocks_add_saved_block_version( $post_id, $post, $update ) {

	// 保存時のみブロックのバージョンを保存
	if($update){
		if(function_exists('vkblocks_get_version')){
			update_post_meta( $post_id, '_vkb_saved_block_version', vkblocks_get_version() );
		} else {
			update_post_meta( $post_id, '_vkb_saved_block_version', "" );
		}
	}
}
add_action( 'save_post', 'vkblocks_add_saved_block_version', 10,3 );
