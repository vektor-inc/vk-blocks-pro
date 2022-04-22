<?php
/**
 * Registers the `vk-blocks/icon-outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Alert block.
 *
 * @return void
 */
function vk_blocks_register_block_icon_outer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/icon-outer',
			VK_BLOCKS_DIR_URL . 'build/icon-outer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/icon-outer',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_icon_outer', 99 );
