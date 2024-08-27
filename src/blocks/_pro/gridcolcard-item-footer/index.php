<?php
/**
 * Registers the `vk-blocks/gridcolcard-footer` block.
 *
 * @package vk-blocks
 */

/**
 * Register grid column card footer block.
 *
 * @return void
 */
function vk_blocks_register_block_gridcolcard_footer() {

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
add_action( 'init', 'vk_blocks_register_block_gridcolcard_footer', 99 );
