<?php

// Do not load directly.
defined( 'ABSPATH' ) || die();

function vkblocks_register_saved_block_version_postmeta(){

	$post_types = get_post_types(array(), 'names');
	foreach ( $post_types as $post_type ) {
		register_post_meta( strval($post_type) , '_vkb_saved_block_version', array(
			'show_in_rest' => true,
			'single' => true,
			'type' => 'string',
			'default' => "",
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		) );
	}
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
