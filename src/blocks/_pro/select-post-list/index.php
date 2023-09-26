<?php
/**
 * Registers the `vk-blocks/select-post-list` block.
 *
 * @package vk-blocks
 */

/**
 * Register select post list block.
 *
 * @return void
 */
function vk_blocks_register_block_select_post_list() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_select_post_list', 99 );
