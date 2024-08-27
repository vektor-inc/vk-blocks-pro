<?php
/**
 * Registers the `vk-blocks/timeline` block.
 *
 * @package vk-blocks
 */

/**
 * Register Timeline block.
 *
 * @return void
 */
function vk_blocks_register_block_timeline() {
	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/timeline',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_timeline', 99 );
