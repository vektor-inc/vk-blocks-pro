<?php
/**
 * Registers the `vk-blocks/step` block.
 *
 * @package vk-blocks
 */

/**
 * Register Step block.
 *
 * @return void
 */
function vk_blocks_register_block_step() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/step',
			VK_BLOCKS_DIR_URL . 'build/_pro/step/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/step/block-build.asset.php';
	wp_register_script(
		'vk-blocks/step',
		VK_BLOCKS_DIR_URL . 'build/_pro/step/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
				'style'         => 'vk-blocks/step',
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
add_action( 'init', 'vk_blocks_register_block_step', 99 );
