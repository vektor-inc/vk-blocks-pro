<?php
/**
 * VK Blocks - Balloon Blocks
 *
 * @package vk-blocks
 */

/**
 * Registers the `vk-blocks/balloon` block.
 */
function vk_blocks_register_block_vk_balloon() {
	// Register Style.
	wp_register_style(
		'vk-blocks/balloon',
		VK_BLOCKS_DIR_PATH . 'build/balloon/style.css',
		array(),
		VK_BLOCKS_VERSION
	);

	// Register Script.
	$asset = include VK_BLOCKS_PATH . 'build/balloon/block-build.asset.php';
	wp_register_script(
		'vk-blocks/balloon',
		VK_BLOCKS_DIR_PATH . 'build/balloon/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/balloon',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_vk_balloon', 99 );
