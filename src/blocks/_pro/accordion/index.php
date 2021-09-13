<?php
/**
 * Registers the `vk-blocks/accordion` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register accordion block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_accordion() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_accordion', 99 );
}
