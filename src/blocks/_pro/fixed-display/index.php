<?php
/**
 * Registers the `vk-blocks/fixed-display` block.
 *
 * @package vk-blocks
 */
function vk_blocks_register_block_fixed_display() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_fixed_display', 99 );
