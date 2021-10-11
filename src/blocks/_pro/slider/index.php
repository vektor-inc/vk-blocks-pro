<?php
/**
 * Registers the `vk-blocks/slider` block.
 *
 * @package vk-blocks
 */

/**
 * Register slider block.
 *
 * @return void
 */
function vk_blocks_register_block_slider() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/slider',
			VK_BLOCKS_DIR_URL . 'build/_pro/slider/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/slider/block-build.asset.php';
	wp_register_script(
		'vk-blocks/slider',
		VK_BLOCKS_DIR_URL . 'build/_pro/cslider/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);
	
	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/slider',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_slider', 99 );
