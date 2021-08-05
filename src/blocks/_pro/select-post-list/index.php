<?php

/**
 * Registers the `vk-blocks/select-post-list` block.
 */
if ( function_exists( 'register_block_type_from_metadata' ) ) {

	function register_block_vkb_select_post_list() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'register_block_vkb_select_post_list', 99 );
}
