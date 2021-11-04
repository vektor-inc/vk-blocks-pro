<?php
/**
 * Registers the `vk-blocks/grid-column-item` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register grid column item block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_grid_column_item() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_grid_column_item', 99 );
}
