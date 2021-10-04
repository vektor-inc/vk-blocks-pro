<?
/**
 * VK Blocks - Alert Blocks
 *
 * @package vk-blocks
 */

/**
 * Register alert block.
 *
 * @return void
 */
function vk_blocks_register_block_vk_alert() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/alert',
			VK_BLOCKS_DIR_URL . 'build/alert/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/alert/block-build.asset.php';
	wp_register_script(
		'vk-blocks/alert',
		VK_BLOCKS_DIR_URL . 'build/alert/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/alert',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_vk_alert', 99 );

