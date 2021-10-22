<?php
/**
 * Registers the `vk-blocks/timeline-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register Timeline item.
 *
 * @return void
 */
function vk_blocks_register_block_timeline_item() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/timeline-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/timeline-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/timeline-item/block-build.asset.php';
	wp_register_script(
		'vk-blocks/timeline-item',
		VK_BLOCKS_DIR_URL . 'build/_pro/timeline-item/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/timeline-item',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_timeline_item', 99 );
