<?php
/**
 * Registers the `vk-blocks/icon` block.
 *
 * @package vk-blocks
 */

/**
 * Register query block.
 *
 * @return void
 */
function vk_blocks_register_block_query() {
	register_block_type(
		__DIR__,
		array(
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_query', 99 );
