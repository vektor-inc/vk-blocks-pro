<?php
/**
 * Registers the `vk-blocks/single-term` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Term_Color\VkTermColor;

/**
 * Breadcrumb render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_single_term_render_callback( $attributes ) {
	$vk_term_color = new VkTermColor();
	$vk_term_color::init();

	$outer_classes = 'vk_breadcrumb btn btn-sm';
	if ( isset( $attributes['className'] ) ) {
		$outer_classes .= ' ' . $attributes['className'];
	}
	if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
		$outer_classes .= ' vk_hidden';
	}
	if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
		$outer_classes .= ' vk_hidden-xxl';
	}
	if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
		$outer_classes .= ' vk_hidden-xl';
	}
	if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
		$outer_classes .= ' vk_hidden-lg';
	}
	if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
		$outer_classes .= ' vk_hidden-md';
	}
	if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
		$outer_classes .= ' vk_hidden-sm';
	}
	if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
		$outer_classes .= ' vk_hidden-xs';
	}

	$args = array(
		'class' => $outer_classes,
		'link'  => true,
	);
	global $post;
	return $vk_term_color->get_single_term_with_color( '', $args );
}

/**
 * Register block breadcrumb
 *
 * @return void
 */
function vk_blocks_register_block_single_term() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/single-term',
			VK_BLOCKS_DIR_URL . 'build/_pro/single-term/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	global $vk_blocks_common_attributes;
	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/single-term',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'className' => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_single_term_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_single_term', 99 );
