<?php
/**
 * Registers the `vk-blocks/faq2-q` block.
 *
 * @package vk-blocks
 */

/**
 * Register FAQ2 block.
 *
 * @return void
 */
function vk_blocks_register_block_faq2_q() {
	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/faq2-q/block-build.asset.php';
	wp_register_script(
		'vk-blocks/faq2-q',
		VK_BLOCKS_DIR_URL . 'build/faq2-q/block-build.js',
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
add_action( 'init', 'vk_blocks_register_block_faq2_q', 99 );

