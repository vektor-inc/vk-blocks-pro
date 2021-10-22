<?php
/**
 * Registers the `vk-blocks/icon_outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Icon outer block.
 *
 * @return void
 */
function vk_blocks_register_block_button_outer() {
	register_block_type_from_metadata(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_button_outer', 99 );
