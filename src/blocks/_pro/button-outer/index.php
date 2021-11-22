<?php
/**
 * Registers the `vk-blocks/button-outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Button Outer block.
 *
 * @return void
 */
function vk_blocks_register_block_button_outer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/button-outer',
			VK_BLOCKS_DIR_URL . 'build/_pro/button-outer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/button-outer/block-build.asset.php';
	wp_register_script(
		'vk-blocks/button-outer',
		VK_BLOCKS_DIR_URL . 'build/button-outer/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/button-outer',
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
add_action( 'init', 'vk_blocks_register_block_button_outer', 99 );
