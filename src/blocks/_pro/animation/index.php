<?php
/**
 * Registers the `vk-blocks/animation` block.
 *
 * @package vk-blocks
 */

/**
 * Register animation block.
 *
 * @return void
 */
function vk_blocks_register_block_animation() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/animation',
			VK_BLOCKS_DIR_URL . 'build/_pro/animation/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/animation-script',
			VK_BLOCKS_DIR_URL . 'inc/vk-blocks/build/vk-animation.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/animation',
			'script'        => 'vk-blocks/animation-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_animation', 99 );
