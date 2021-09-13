<?php
/**
 * VK Blocks - Flow Blocks
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Registers the `vk-blocks/flow` block.
	 */
	function vk_blocks_register_block_vk_flow() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_vk_flow', 99 );
}

