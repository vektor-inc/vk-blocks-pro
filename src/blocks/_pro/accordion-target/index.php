<?php
/**
 * Registers the `vk-blocks/accordion-target` block.
 *
 * @package vk-blocks
 */

/**
 * Register accordion target block.
 *
 * @return void
 */
function vk_blocks_register_block_accordion_target() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_accordion_target', 99 );
