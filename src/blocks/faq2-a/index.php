<?php
/**
 * Registers the `vk-blocks/faq2-a` block.
 *
 * @package vk-blocks
 */

/**
 * Register FAQ2A block.
 *
 * @return void
 */
function vk_blocks_register_block_faq2_a() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_faq2_a', 99 );
