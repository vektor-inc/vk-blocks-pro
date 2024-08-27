<?php
/**
 * VK Blocks - Flow Blocks
 *
 * @package vk-blocks
 */

/**
 * Register Flow block.
 *
 * @return void
 */
function vk_blocks_register_block_flow() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/flow',
			VK_BLOCKS_DIR_URL . 'build/flow/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/flow',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_flow', 99 );
