<?php
/**
 * VK Blocks - Grid Column Blocks
 *
 * @package vk-blocks
 */

/**
 * Registers the `vk-blocks/grid-column` block.
 */
function vk_blocks_register_block_vkb_grid_column() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/grid-column',
			VK_BLOCKS_DIR_URL . 'build/_pro/grid-column/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/grid-column/block-build.asset.php';
	wp_register_script(
		'vk-blocks/grid-column',
		VK_BLOCKS_DIR_URL . 'build/_pro/grid-column/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/grid-column',
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
add_action( 'init', 'vk_blocks_register_block_vkb_grid_column', 99 );
