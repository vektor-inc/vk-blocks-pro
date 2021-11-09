<?php
/**
 * Registers the `vk-blocks/layout-column` block.
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {


	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/layout-column-script',
			VK_BLOCKS_DIR_URL . 'inc/vk-blocks/build/vk-layout-column.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	/**
	 * Register Icon block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_layout_column() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'script'        => 'vk-blocks/layout-column-script',
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}

	add_action( 'init', 'vk_blocks_register_block_layout_column', 99 );
}
