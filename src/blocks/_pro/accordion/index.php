<?php
/**
 * Registers the `vk-blocks/accordion` block.
 *
 * @package vk-blocks
 */

/**
 * Register accordion block.
 *
 * @return void
 */
function vk_blocks_register_block_accordion() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/accordion',
			VK_BLOCKS_DIR_URL . 'build/_pro/accordion/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/accordion',
			VK_BLOCKS_DIR_URL . 'inc/vk-blocks/build/vk-accordion.min.js',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/accordion/block-build.asset.php';
	wp_register_script(
		'vk-blocks/accordion',
		VK_BLOCKS_DIR_URL . 'build/accordion/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/accordion',
			'script'        => 'vk-blocks/accordion',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_accordion', 99 );
