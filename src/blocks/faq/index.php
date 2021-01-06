<?php

/**
 * Registers the `vk-blocks/faq` block.
 */
if( function_exists('register_block_type_from_metadata')) {

	function register_block_vk_faq() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style' => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
				'render_callback' => 'vk_faq_render_callback'
			)
		);
	}
	add_action( 'init', 'register_block_vk_faq', 99 );
}

/**
 * Render Callback of FAQ Block
 *
 * @param array $attributes attributes.
 * @param html  $content content.
 */
function vk_faq_render_callback( $attributes, $content = '' ) {
	$vk_blocks_options  = vkblocks_get_options();
	if ( has_block( 'vk-blocks/faq', $content ) ) {
		if ( 'open' === $vk_blocks_options['new_faq_accordion'] ) {
			$content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $content );
		} elseif ( 'close' === $vk_blocks_options['new_faq_accordion'] ) {
			$content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $content );
		} else {
			$content = str_replace( '[accordion_trigger_switch]', '', $content );
		}
	}
	vk_blocks_pro_load_scripts();
	return $content;
}
