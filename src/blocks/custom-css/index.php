<?php
/**
 * Registers the `vk-blocks/custom-css` block.
 *
 * @package vk-blocks
 */

/**
 * Register  Custom CSS block.
 *
 * @return void
 */
function vk_blocks_register_block_custom_css() {
	register_block_type(
		__DIR__,
		array(
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_custom_css', 99 );
