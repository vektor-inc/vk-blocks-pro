<?php
/**
 * Registers the `vk-blocks/border-box` block.
 *
 * @package vk-blocks
 */

/**
 * Register Border Box block.
 *
 * @return void
 */
function vk_blocks_register_block_border_box() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/border-box',
			VK_BLOCKS_DIR_URL . 'build/border-box/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/border-box',
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	} else {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
}
add_action( 'init', 'vk_blocks_register_block_border_box', 99 );
