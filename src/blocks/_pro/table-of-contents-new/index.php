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
			'vk-blocks/table-of-contents-news',
			VK_BLOCKS_DIR_URL . 'build/_pro/table-of-contents-new/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/table-of-contents-new/block-build.asset.php';
	wp_register_script(
		'vk-blocks/table-of-contents-new',
		VK_BLOCKS_DIR_URL . 'build/_pro/table-of-contents-new/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/table-of-contents-new',
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	} else {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
}
add_action( 'init', 'vk_blocks_register_block_table_of_contents_new', 99 );
