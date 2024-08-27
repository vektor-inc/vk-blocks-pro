<?php
/**
 * Registers the `vk-blocks/heading` block.
 *
 * @package vk-blocks
 */

/**
 * Register Heading block.
 *
 * @return void
 */
function vk_blocks_register_block_heading() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/heading',
			VK_BLOCKS_DIR_URL . 'build/heading/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/heading',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_heading', 99 );
