<?php
/**
 * Registers the `vk-blocks/select-post-list` block.
 *
 * @package vk-blocks
 */

/**
 * Register select post list block.
 *
 * @return void
 */
function vk_blocks_register_block_select_post_list() {
	
	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/select-post-list/block-build.asset.php';
	wp_register_script(
		'vk-blocks/select-post-list',
		VK_BLOCKS_DIR_URL . 'build/_pro/select-post-list/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_select_post_list', 99 );

