<?php
/**
 * Registers the `vk-blocks/spacer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Spacer block.
 *
 * @return void
 */
function vk_blocks_register_block_spacer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/spacer',
			VK_BLOCKS_DIR_URL . 'build/spacer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/spacer',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_spacer', 99 );
