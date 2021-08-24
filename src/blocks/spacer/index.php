<?php
/**
 * Registers the `vk-blocks/spacer` block.
 *
 * @package vk-blocks
 */

// Register Style.
wp_register_style(
	'vk-blocks/spacer',
	VK_BLOCKS_URL . 'build/spacer/style-main.css',
	array(),
	VK_BLOCKS_VERSION
);

// Register Script.
$asset = include( VK_BLOCKS_PATH . 'build/spacer/index.asset.php' );
wp_register_script(
	'vk-blocks/spacer',
	VK_BLOCKS_URL . 'build/spacer/index.js',
	$asset_file['dependencies'],
	VK_BLOCKS_VERSION,
	true
);

/**
 * Register Block VK Spacer
 */
function register_block_vk_spacer()
{
	register_block_type(
		__DIR__,
		array(
			'style'        => 'vk-blocks/spacer',
			'editor_style' => 'vk-blocks/spacer',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action('init', 'register_block_vk_spacer', 99);
