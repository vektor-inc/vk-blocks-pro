<?php
/**
 * Registers the `vk-blocks/step-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register step item block.
 *
 * @return void
 */
function vk_blocks_register_block_step_item() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/step-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/step-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/step-item',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_step_item', 99 );
