<?php
/**
 * VK Blocks - Grid Column Blocks
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Registers the `vk-blocks/grid-column` block.
	 */
	function vk_blocks_register_block_vkb_grid_column() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_vkb_grid_column', 99 );
}
