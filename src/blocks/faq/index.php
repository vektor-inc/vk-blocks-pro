<?php
/**
 * VK Blocks - Faq Blocks
 *
 * @package vk-blocks
 */

if ( function_exists( 'register_block_type_from_metadata' ) ) {

	/**
	 * Registers the `vk-blocks/faq` block.
	 *
	 * @return void
	 */
	function vk_blocks_register_block_faq() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'vk_blocks_register_block_faq', 99 );
}

/**
 * Render faq block
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_faq_render_callback( $block_content, $block ) {
	$vk_blocks_options = vk_blocks_get_options();
	if ( 'vk-blocks/faq' === $block['blockName'] ) {
		if ( 'open' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $block_content );
		} elseif ( 'close' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $block_content );
		} else {
			$block_content = str_replace( '[accordion_trigger_switch]', '', $block_content );
		}
	}
	return $block_content;
}

add_filter( 'render_block', 'vk_blocks_faq_render_callback', 10, 2 );
