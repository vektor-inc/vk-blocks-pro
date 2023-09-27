<?php
/**
 * Registers the `vk-blocks/grid-column-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register grid column item block.
 *
 * @return void
 */
function vk_blocks_register_block_grid_column_item() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/grid-column-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/grid-column-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/grid-column-item',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_grid_column_item', 99 );
