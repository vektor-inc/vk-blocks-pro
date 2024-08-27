<?php
/**
 * Registers the `vk-blocks/pr-content` block.
 *
 * @package vk-blocks
 */

/**
 * Register PR content block.
 *
 * @return void
 */
function vk_blocks_register_block_pr_content() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/pr-content',
			VK_BLOCKS_DIR_URL . 'build/pr-content/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/pr-content',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_pr_content', 99 );
