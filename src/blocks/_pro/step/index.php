<?php
/**
 * Registers the `vk-blocks/step` block.
 *
 * @package vk-blocks
 */

/**
 * Register Step block.
 *
 * @return void
 */
function vk_blocks_register_block_step() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/step',
			VK_BLOCKS_DIR_URL . 'build/_pro/step/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/step',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_step', 99 );
