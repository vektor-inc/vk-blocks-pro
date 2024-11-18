<?php
/**
 * Registers the `vk-blocks/fixed-display` block.
 *
 * @package vk-blocks
 */

/**
 * Adds initial opacity: 0 to blocks in specific modes.
 *
 * @param string $block_content The HTML content of the block.
 * @param array  $block         The block details array.
 * @return string The modified block content.
 */
function vk_blocks_fixed_display_add_opacity( $block_content, $block ) {
	if ( isset( $block['attrs']['mode'] ) && in_array( $block['attrs']['mode'], array( 'display-hide-after-time', 'show-on-scroll' ), true ) ) {
		// Apply opacity: 0 for specific modes
		$block_content = preg_replace( '/(<div\b[^>]*class="[^"]*vk_fixed-display-mode-(display-hide-after-time|show-on-scroll)[^"]*")/i', '$1 style="opacity:0;"', $block_content );
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_fixed_display_add_opacity', 10, 2 );

/**
 * Registers the fixed display block.
 *
 * @return void
 */
function vk_blocks_register_block_fixed_display() {
	// Register Style
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/fixed-display',
			VK_BLOCKS_DIR_URL . 'build/_pro/fixed-display/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/fixed-display-script',
			VK_BLOCKS_DIR_URL . 'build/vk-fixed-display.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	// Handle classic themes and separate asset loading
	$assets = array();
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style'         => 'vk-blocks/fixed-display',
			'script'        => 'vk-blocks/fixed-display-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		);
	}

	// Register the block
	register_block_type(
		__DIR__,
		$assets
	);
}
add_action( 'init', 'vk_blocks_register_block_fixed_display', 99 );
