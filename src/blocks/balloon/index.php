<?php
/**
 * VK Blocks - Balloon Blocks
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {
	/**
	 * Registers the `vk-blocks/balloon` block.
	 */
	function vk_blocks_register_block_vk_balloon() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_vk_balloon', 99 );
}
