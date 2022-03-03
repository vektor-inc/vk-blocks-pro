<?php
/**
 * Registers the `vk-blocks/breadcrumb` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Breadcrumb\VkBreadcrumb;

/**
 * Breadcrumb render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_breadcrumb_render_callback( $attributes ) {
	$vk_breadcrumb = new VkBreadcrumb();

	$classes = '';
	if ( isset( $attributes['className'] ) ) {
		$classes .= ' ' . $attributes['className'];
	}
	if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
		$classes .= ' vk_hidden';
	}
	if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
		$classes .= ' vk_hidden-xxl';
	}
	if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
		$classes .= ' vk_hidden-xl';
	}
	if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
		$classes .= ' vk_hidden-lg';
	}
	if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
		$classes .= ' vk_hidden-md';
	}
	if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
		$classes .= ' vk_hidden-sm';
	}
	if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
		$classes .= ' vk_hidden-xs';
	}

	$breadcrumb_options = array(
		'id_outer'        => 'breadcrumb',
		'class_outer'     => 'breadcrumb' . $classes,
		'class_inner'     => 'container',
		'class_list'      => 'breadcrumb-list',
		'class_list_item' => 'breadcrumb-list__item',
	);
	return $vk_breadcrumb->get_breadcrumb( $breadcrumb_options );
}

/**
 * Register block breadcrumb
 *
 * @return void
 */
function vk_blocks_register_block_breadcrumb() {
	global $vk_blocks_common_attributes;
	register_block_type(
		__DIR__,
		array(
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
			'render_callback' => 'vk_blocks_breadcrumb_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_breadcrumb', 99 );
