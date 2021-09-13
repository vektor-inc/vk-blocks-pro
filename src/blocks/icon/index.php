<?php
/**
 * Registers the `vk-blocks/icon` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register Icon block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_icon() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_icon', 99 );
}
