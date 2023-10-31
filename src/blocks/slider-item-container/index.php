<?php
/**
 * Registers the `vk-blocks/slider-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register slider item block.
 *
 * @return void
 */
function vk_blocks_register_block_slider_item_container() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/slider-item-container',
			VK_BLOCKS_DIR_URL . 'build/slider-item-container/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/slider-item-container',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_slider_item_container', 99 );
