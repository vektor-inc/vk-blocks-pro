<?php
/**
 * Registers the `vk-blocks/gridcolcard` block.
 *
 * @package vk-blocks
 */

/**
 * Register grid column card block.
 *
 * @return void
 */
function vk_blocks_register_block_gridcolcard() {
	wp_register_style(
		'vk-blocks/gridcolcard',
		VK_BLOCKS_DIR_URL . 'build/_pro/gridcolcard/style.css',
		array(),
		VK_BLOCKS_VERSION
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/gridcolcard',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_gridcolcard', 99 );
