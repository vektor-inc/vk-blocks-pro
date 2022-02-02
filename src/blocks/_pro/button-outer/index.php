<?php
/**
 * Registers the `vk-blocks/button-outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Button Outer block.
 *
 * @return void
 */
function vk_blocks_register_block_button_outer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/button-outer',
			VK_BLOCKS_DIR_URL . 'build/_pro/button-outer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/button-outer',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_button_outer', 99 );
