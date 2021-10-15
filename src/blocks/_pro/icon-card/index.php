<?php
/**
 * Registers the `vk-blocks/icon-card` block.
 *
 * @package vk-blocks
 */

/**
 * Register icon-card block.
 *
 * @return void
 */
function vk_blocks_register_block_icon_card() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/icon-card',
			VK_BLOCKS_DIR_URL . 'build/_pro/icon-card/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/icon-card-script',
			VK_BLOCKS_DIR_URL . 'inc/vk-blocks/build/vk-icon-card.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/icon-card/block-build.asset.php';
	wp_register_script(
		'vk-blocks/icon-card',
		VK_BLOCKS_DIR_URL . 'build/icon-card/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/icon-card',
			'script'        => 'vk-blocks/icon-card-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_icon_card', 99 );
