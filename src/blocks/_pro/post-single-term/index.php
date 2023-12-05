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
	$post               = get_post( $block->context['postId'] );

	$term_color_info =  \VektorInc\VK_Term_Color\VkTermColor::get_post_single_term_info( $post );
	
	$wrapper_attributes = get_block_wrapper_attributes(array(
		'class' => 'vk_singleTerm',
		'style' => 'background-color: ' . $term_color_info['color'] . ';'
	));

	$label = '';
	if ( $attributes['hasLink'] ) {
		$label = '<a class="vk_singleTerm-inner" href="' . $term_color_info['term_url'] . '">' . $term_color_info['term_name'] . '</a>';
	} else {
		$label = '<span class="vk_singleTerm-inner">' . $term_color_info['term_name'] . '</span>';
	}

	return "<div $wrapper_attributes>" . $label . '</div>';
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
 * Vk_blocks_sanitize_multi_dimensional_array
 *
 * @param array $array Array to sanitize.
 * @return array Sanitized array.
 */
function vk_blocks_sanitize_multi_dimensional_array( $array ) {
	foreach ( $array as $key => $value ) {
		if ( is_array( $value ) ) {
			$array[ $key ] = vk_blocks_sanitize_multi_dimensional_array( $value );
		} else {
			$array[ $key ] = sanitize_text_field( $value );
		}
	}
	return $array;
}

/**
 * Merging style
 *
 * @param string $html destination string for merging.
 * @param string $add_style source string for merging.
 * @return string result string.
 */
function vk_blocks_merge_styles( $html, $add_style ) {
	// スタイル属性の中身を取得
	preg_match( '/style="([^"]+)"/', $html, $matches );

	// 既存のスタイルが存在する場合
	if ( isset( $matches[1] ) ) {
		$original_style = $matches[1];
		// 既存のスタイルと追加のスタイルをマージ
		$merged_style = $original_style . ';' . $add_style;
		// マージしたスタイルを元のHTMLに適用
		$result = str_replace( $original_style, $merged_style, $html );
	} else {
		// スタイルが存在しない場合、新たにスタイル属性を追加
		$result = str_replace( '<span', '<span style="' . $add_style . '"', $html );
	}

	return $result;
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
