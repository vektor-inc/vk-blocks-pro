<?php
/**
 * Registers the `vk-blocks/pr-blocks` block.
 *
 * @package vk-blocks
 */

/**
 * Register PR block.
 *
 * @return void
 */
function vk_blocks_register_block_pr_blocks() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/pr-blocks',
			VK_BLOCKS_DIR_URL . 'build/pr-blocks/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/pr-blocks',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_pr_blocks', 99 );
