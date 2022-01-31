<?php
/**
 * Block - Staff
 *
 * @package vk_blocks
 */

/**
 * Register Staff block.
 *
 * @return void
 */
function vk_blocks_register_block_staff() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/staff',
			VK_BLOCKS_DIR_URL . 'build/staff/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	} else {
		wp_register_style(
			'vk-blocks/staff',
			VK_BLOCKS_DIR_URL . '/build/staff/style.css',
			array(),
			filemtime( VK_BLOCKS_DIR_PATH . 'build/staff/style.css' )
		);
	}

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/staff',
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
add_action( 'init', 'vk_blocks_register_block_staff', 99 );
