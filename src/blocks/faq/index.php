<?php
/**
 * Registers the `vk-blocks/faq` block.
 *
 * @package vk-blocks
 */

/**
 * Register FAQ block.
 *
 * @return void
 */
function vk_blocks_register_block_faq() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/faq',
			VK_BLOCKS_DIR_URL . 'build/faq/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/faq-script',
			VK_BLOCKS_DIR_URL . 'build/vk-faq2.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/faq',
			'script'        => 'vk-blocks/faq-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_faq', 99 );

/**
 * Render faq block
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_faq_render_callback( $block_content, $block ) {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	if ( 'vk-blocks/faq' === $block['blockName'] ) {
		if ( ! empty( $vk_blocks_options['new_faq_accordion'] ) && 'open' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $block_content );
		} elseif ( ! empty( $vk_blocks_options['new_faq_accordion'] ) && 'close' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $block_content );
		} else {
			$block_content = str_replace( '[accordion_trigger_switch]', '', $block_content );
		}
	}
	return $block_content;
}

add_filter( 'render_block', 'vk_blocks_faq_render_callback', 10, 2 );
