<?php
/**
 * Registers the `vk-blocks/archive-list` block.
 *
 * @package vk-blocks
 */

/**
 * Register Archive List block.
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/archive-list',
			VK_BLOCKS_DIR_URL . 'build/icon/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/archive-list',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );
