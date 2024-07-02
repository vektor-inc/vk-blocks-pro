<?php
/**
 * Registers the `vk-blocks/table-of-contents-new` block.
 *
 * @package vk-blocks
 */

/**
 * Register table of contents new block.
 *
 * @return void
 */
function vk_blocks_register_block_table_of_contents_new() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/table-of-contents-new',
			VK_BLOCKS_DIR_URL . 'build/_pro/table-of-contents-new/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/table-of-contents-new-script',
			VK_BLOCKS_DIR_URL . 'build/vk-table-of-contents-new.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/table-of-contents-new-script',
			VK_BLOCKS_DIR_URL . 'build/vk-table-of-contents-new.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/table-of-contents-new',
			'script'        => 'vk-blocks/table-of-contents-new-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_table_of_contents_new', 99 );
