<?php
/**
 * Registers the `vk-blocks/tab` block.
 *
 * @package vk-blocks
 */

/**
 * Register Tab block.
 *
 * @return void
 */
function vk_blocks_register_block_tab() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/tab-script',
			VK_BLOCKS_DIR_URL . 'build/vk-tab.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/tab',
			'script'        => 'vk-blocks/tab-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_tab', 99 );
