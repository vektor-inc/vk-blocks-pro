<?php
/**
 * Registers the `vk-blocks/border-box` block.
 *
 * @package vk-blocks
 */

/**
 * Register Border Box block.
 *
 * @return void
 */
function vk_blocks_register_block_border_box() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/border-box',
			VK_BLOCKS_DIR_URL . 'build/border-box/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/border-box/block-build.asset.php';
	wp_register_script(
		'vk-blocks/border-box',
		VK_BLOCKS_DIR_URL . 'build/border-box/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/border-box',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_border_box', 99 );
