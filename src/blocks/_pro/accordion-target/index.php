<?php
/**
 * Registers the `vk-blocks/accordion-target` block.
 *
 * @package vk-blocks
 */

/**
 * Register accordion target block.
 *
 * @return void
 */
function vk_blocks_register_block_accordion_target() {
	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/accordion-target/block-build.asset.php';
	wp_register_script(
		'vk-blocks/accordion-target',
		VK_BLOCKS_DIR_URL . 'build/_pro/accordion-target/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	if ( vk_blocks_is_lager_than_wp( '5.8' ) ) {
		register_block_type(
			__DIR__,
			array(
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
add_action( 'init', 'vk_blocks_register_block_accordion_target', 99 );
