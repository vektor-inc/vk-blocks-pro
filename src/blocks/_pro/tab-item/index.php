<?php
/**
 * Registers the `vk-blocks/tab-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register Tab Item block.
 *
 * @return void
 */
function vk_blocks_register_block_tab_item() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/tab-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/tab-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/tab-item',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_tab_item', 99 );
