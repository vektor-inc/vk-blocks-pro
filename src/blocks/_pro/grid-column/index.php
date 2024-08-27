<?php
/**
 * VK Blocks - Grid Column Blocks
 *
 * @package vk-blocks
 */

/**
 * Registers the `vk-blocks/grid-column` block.
 */
function vk_blocks_register_block_vkb_grid_column() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/grid-column',
			VK_BLOCKS_DIR_URL . 'build/_pro/grid-column/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/grid-column',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_vkb_grid_column', 99 );
