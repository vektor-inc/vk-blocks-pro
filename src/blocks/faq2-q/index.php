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
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/faq2-q',
			VK_BLOCKS_DIR_URL . 'build/faq2-q/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/faq2-q/block-build.asset.php';
	wp_register_script(
		'vk-blocks/faq2-q',
		VK_BLOCKS_DIR_URL . 'build/faq2-q/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/faq2-q',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_faq2_q', 99 );

