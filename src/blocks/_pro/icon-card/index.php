<?php
/**
 * Registers the `vk-blocks/icon-card` block.
 *
 * @package vk-blocks
 */

/**
 * Register icon-card block.
 *
 * @return void
 */
function vk_blocks_register_block_icon_card() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/icon-card',
			VK_BLOCKS_DIR_URL . 'build/_pro/icon-card/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/icon-card',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_icon_card', 99 );
