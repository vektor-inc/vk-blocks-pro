<?php
/**
 * Registers the `vk-blocks/faq2-q` block.
 *
 * @package vk-blocks
 */

/**
 * Register FAQ2 block.
 *
 * @return void
 */
function vk_blocks_register_block_faq2_q() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_faq2_q', 99 );
