<?php
/**
 * Registers the `vk-blocks/post-single-term` block.
 *
 * @package vk-blocks
 */

/**
 * Single Term render callback
 *
 * @param array    $attributes Block attributes.
 * @param string   $content Block content.
 * @param WP_Block $block Block context.
 * @return string
 */
function vk_blocks_post_single_term_render_callback( $attributes, $content, $block ) {
	$post     = get_post( $block->context['postId'] );
	$taxonomy = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : '';

	$term_color_info = \VektorInc\VK_Term_Color\VkTermColor::get_post_single_term_info( $post, array( 'taxonomy' => $taxonomy ) );

	if ( ! $term_color_info ) {
		return '';
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => 'vk_singleTerm',
			'style' => 'background-color: ' . $term_color_info['color'] . ';' .
						'color:' . $term_color_info['text_color'] . ';',
		)
	);

	if ( $attributes['hasLink'] ) {
		return '<a ' . $wrapper_attributes . ' href="' . $term_color_info['term_url'] . '">' . $term_color_info['term_name'] . '</a>';
	} else {
		return '<span ' . $wrapper_attributes . '>' . $term_color_info['term_name'] . '</span>';
	}
}

/**
 * Vk blocks array to css.
 *
 * @param array $style Styles array.
 * @return string result CSS.
 */
function vk_blocks_array_to_css( $style ) {
	$css = '';
	foreach ( $style as $property => $value ) {
		$property = preg_replace( '/([a-z])([A-Z])/', '$1-$2', $property );
		$property = strtolower( $property );
		$css     .= $property . ': ' . $value . '; ';
	}
	return $css;
}

/**
 * Register New Badge block.
 *
 * @return void
 */
function vk_blocks_register_block_post_single_term() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-single-term',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-single-term/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/post-single-term',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_post_single_term_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_single_term', 99 );
