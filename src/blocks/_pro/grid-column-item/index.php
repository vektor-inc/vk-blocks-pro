<?php
/**
 * Registers the `vk-blocks/grid-column-item` block.
 *
 * @package vk-blocks
 */

/**
 * Register grid column item block.
 *
 * @return void
 */
function vk_blocks_register_block_grid_column_item() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/grid-column-item',
			VK_BLOCKS_DIR_URL . 'build/_pro/grid-column-item/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/grid-column-item/block-build.asset.php';
	wp_register_script(
		'vk-blocks/grid-column-item',
		VK_BLOCKS_DIR_URL . 'build/_pro/grid-column-item/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/grid-column-item',
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
add_action( 'init', 'vk_blocks_register_block_grid_column_item', 99 );

