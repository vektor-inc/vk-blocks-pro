<?php
/**
 * Registers the `vk-blocks/card` block.
 *
 * @package vk-blocks
 */

/**
 * Register Card block.
 *
 * @return void
 */
function vk_blocks_register_block_card() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/card',
			VK_BLOCKS_DIR_URL . 'build/_pro/card/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/card',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_card', 99 );
