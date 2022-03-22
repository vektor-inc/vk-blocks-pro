<?php
/**
 * Registers the `vk-blocks/gridcolcard-body` block.
 *
 * @package vk-blocks
 */

/**
 * Register grid column card body block.
 *
 * @return void
 */
function vk_blocks_register_block_gridcolcard_body() {

	// Register Script.
	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/gridcolcard',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_gridcolcard_body', 99 );
