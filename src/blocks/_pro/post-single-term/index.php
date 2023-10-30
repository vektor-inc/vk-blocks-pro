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
	$wrapper_attributes = get_block_wrapper_attributes();
	$attributes         = vk_blocks_sanitize_multi_dimensional_array( $attributes );
	$styles             = array();
	if ( array_key_exists( 'paddingValues', $attributes ) ) {
		$styles['padding-top']    = $attributes['paddingValues']['top'];
		$styles['padding-left']   = $attributes['paddingValues']['left'];
		$styles['padding-bottom'] = $attributes['paddingValues']['bottom'];
		$styles['padding-right']  = $attributes['paddingValues']['right'];
	}

	if ( is_null( $post ) ) {
		$body = vk_blocks_merge_styles( '<span style="background-color:#999">（ターム名）</span>', vk_blocks_array_to_css( $styles ) );
	} else {
		$body = vk_blocks_merge_styles( \VektorInc\VK_Term_Color\VkTermColor::get_single_term_with_color( $post ), vk_blocks_array_to_css( $styles ) );
	}

	return "<div $wrapper_attributes>" . $body . '</div>';
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
