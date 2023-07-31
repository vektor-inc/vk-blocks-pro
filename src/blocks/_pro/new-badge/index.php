<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * Dynamic text render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_new_badge_render_callback( $attributes ) {
	$days_as_new_post = $attributes['daysAsNewPost'];
	$limit            = gmdate( 'Ymd', strtotime( "-$days_as_new_post days" ) );
	$post_date        = get_the_date( 'Ymd' );

	$extra_attributes = array();
	$classes          = array();
	$styles           = array();
	
	array_push( $classes, 'vk_newBadge');

	if ( isset( $attributes['align'] ) ) {
		array_push( $classes, 'has-text-align-' . $attributes['align'] );
		array_push( $styles, 'text-align:' . $attributes['align'] . ';' );
	}
	if ( isset( $attributes['borderColor'] ) ) {
		array_push( $classes, 'has-border-color' );
		array_push( $classes, 'has-' . $attributes['borderColor'] . '-border-color' );
	}
	// 枠線のみ get_block_wrapper_attributesに入ってこない対応
	if ( isset( $attributes['style']['border'] ) ) {
		foreach ( $attributes['style']['border'] as $key => $value ) {
			array_push( $styles, 'border-' . $key . ':' . esc_attr( $value ) . ';' );
		}
		$extra_attributes['style'] = implode( ' ', $styles );
	}
	if ( isset( $attributes['width'] ) ) {
		$extra_attributes['style'] .= ' width:' . $attributes['width'] . ';';
	}

	if ( 0 < count($classes) ) {
		$extra_attributes['class'] = implode( ' ', $classes );
	}

	$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );
	$wrapper_attributes = preg_replace( '/align(left|center|right)\s*/', '', $wrapper_attributes );

	$result = '';
	if ( $post_date >= $limit ) {
		$result  = "<div $wrapper_attributes>";
		$result .= '<span>' . $attributes['content'] . '</span>';
		$result .= '</div>';
	}

	return $result;
}


/**
 * Register Dynamic Text block.
 *
 * @return void
 */
function vk_blocks_register_block_new_badge() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/new-badge',
			VK_BLOCKS_DIR_URL . 'build/_pro/new-badge/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/new-badge',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_new_badge_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_new_badge', 99 );

