<?php
/**
 * Registers the `vk-blocks/accordion-trigger` block.
 *
 * @package vk-blocks
 */

/**
 * Register accordion trigger block.
 *
 * @return void
 */
function vk_blocks_register_block_accordion_trigger() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_accordion_trigger', 99 );
