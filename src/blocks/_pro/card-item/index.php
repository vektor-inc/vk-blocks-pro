<?php
/**
 * Registers the `vk-blocks/card-item_item` block.
 *
 * @package vk-blocks
 */

/**
 * Register Card Item block.
 *
 * @return void
 */
function vk_blocks_register_block_card_item() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/card-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/card-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/card-item',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_card_item', 99 );
