<?php
/**
 * Registers the `vk-blocks/icon-outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Icon outer block.
 *
 * @return void
 */
function vk_blocks_register_block_icon_outer() {
	register_block_type_from_metadata(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_icon_outer', 99 );
