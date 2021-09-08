<?php
/**
 * Registers the `vk-blocks/pr-content` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register PR content block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_pr_content() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_pr_content', 99 );
}

