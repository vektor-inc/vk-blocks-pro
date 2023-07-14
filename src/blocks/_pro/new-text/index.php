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
function vk_blocks_new_text_render_callback( $attributes ) {
	$days_as_new_post = $attributes['daysAsNewPost'];
	$limit            = gmdate( 'Ymd', strtotime( "-$days_as_new_post days" ) );
	$post_date        = get_the_date( 'Ymd' );

	//$block_attributes = WP_Block_Supports::get_instance()->apply_block_supports();
	$extra_attributes = array();
	$extra_attributes['class'] = 'has-text-align-' . $attributes['align'];


	// 枠線のみ get_block_wrapper_attributesに入ってこない対応
	if ( isset( $attributes['style']['border'] ) ) {
		$border_styles = array();
		foreach ( $attributes['style']['border'] as $key => $value ) {
			$border_styles[] = 'border-' . $key . ':' . esc_attr( $value ) . ';';
		}
		$extra_attributes['style'] = implode( ' ', $border_styles );
	}


	$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );
	$wrapper_attributes = preg_replace( '/align(left|center|right)\s*/', '', $wrapper_attributes);

	$result = '';
	if ( $post_date >= $limit ) {
		$result  = "<div $wrapper_attributes>";
		$result .= $attributes['content'];
		$result .= '</div>';
	}

	return $result;
}


/**
 * Register Dynamic Text block.
 *
 * @return void
 */
function vk_blocks_register_block_new_text() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/new-text',
			VK_BLOCKS_DIR_URL . 'build/_pro/new-text/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/new-text',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_new_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_new_text', 99 );

