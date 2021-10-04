<?php
/**
 * Registers the `vk-blocks/pr-content` block.
 *
 * @package vk-blocks
 */

/**
 * Register PR content block.
 *
 * @return void
 */
function vk_blocks_register_block_pr_content() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/pr-content',
			VK_BLOCKS_DIR_PATH . 'build/pr-content/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_PATH . 'build/pr-content/block-build.asset.php';
	wp_register_script(
		'vk-blocks/pr-content',
		VK_BLOCKS_DIR_PATH . 'build/pr-content/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/pr-content',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_pr_content', 99 );

