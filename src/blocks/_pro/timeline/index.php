<?php
/**
 * Registers the `vk-blocks/timeline` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register Timeline block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_vkb_timeline() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_vkb_timeline', 99 );
}

