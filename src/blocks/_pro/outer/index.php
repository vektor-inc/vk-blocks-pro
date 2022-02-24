<?php
/**
 * Registers the `vk-blocks/outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Outer block.
 *
 * @return void
 */
function vk_blocks_register_block_outer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/outer',
			VK_BLOCKS_DIR_URL . 'build/_pro/outer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/outer-script',
			VK_BLOCKS_DIR_URL . 'build/vk-outer.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/outer',
			'script'        => 'vk-blocks/outer-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_outer', 99 );
