<?php
/**
 * Registers the `vk-blocks/tab` block.
 *
 * @package vk-blocks
 */

/**
 * Register Tab block.
 *
 * @return void
 */
function vk_blocks_register_block_tab() {
	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/tab',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_tab', 99 );
