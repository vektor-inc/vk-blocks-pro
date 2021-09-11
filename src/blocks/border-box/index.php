<?php
/**
 * Registers the `vk-blocks/border-box` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register Border Box block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_border_box() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_border_box', 99 );
}
