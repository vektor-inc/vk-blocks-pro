<?php

// Do not load directly.
defined( 'ABSPATH' ) || die();

function vkblocks_register_saved_block_version_postmeta(){

	register_post_meta( 'post', '_vkb_saved_block_version', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
		'default' => "",
	) );
};
add_action( 'init', 'vkblocks_register_saved_block_version_postmeta', 10, 0 );

function vkblocks_add_saved_block_version( $post_id, $post, $update ) {

	if(function_exists('vkblocks_get_version')){
		update_post_meta( $post_id, '_vkb_saved_block_version', vkblocks_get_version() );
	} else {
		update_post_meta( $post_id, '_vkb_saved_block_version', "" );
	}
}
add_action( 'save_post', 'vkblocks_add_saved_block_version', 10,3 );
