<?php
/**
 * Registers the `vk-blocks/icon-card-item-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register icon-card-item block.
 *
 * @return void
 */
function vk_blocks_register_block_icon_card_item() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/icon-card-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/icon-card-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/icon-card-item',
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
add_action( 'init', 'vk_blocks_register_block_icon_card_item', 99 );
