<?php
/**
 * Registers the `vk-blocks/faq2-q` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Register faq2_q block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_faq2_q() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_faq2_q', 99 );
}

