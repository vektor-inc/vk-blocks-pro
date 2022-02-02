<?php
/**
 * Registers the `vk-blocks/button` block.
 *
 * @package vk-blocks
 */

/**
 * Register Button block.
 *
 * @return void
 */
function vk_blocks_register_block_button() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/button',
			VK_BLOCKS_DIR_URL . 'build/button/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/button',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_button', 99 );
