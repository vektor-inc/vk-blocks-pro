<?php
/**
 * Registers the `vk-blocks/alert` block.
 *
 * @package vk-blocks
 */

/**
 * Register Alert block.
 *
 * @return void
 */
function vk_blocks_register_block_alert() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/alert',
			VK_BLOCKS_DIR_URL . 'build/alert/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/alert',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_alert', 99 );
