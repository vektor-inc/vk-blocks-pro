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

	if ( $post_date < $limit ) {
		return '';
	}

	// ブロックに付与すべきWrapper要素を取得
	$orig_attributes = WP_Block_Supports::get_instance()->apply_block_supports();

	$extra_attributes = array();
	$classes          = array();
	$styles           = array();

	array_push( $classes, 'vk_newBadge' );

	// 枠線のみ get_block_wrapper_attributesに入ってこない対応（パレット指定）
	if ( isset( $attributes['borderColor'] ) ) {
		array_push( $classes, 'has-border-color' );
		array_push( $classes, 'has-' . $attributes['borderColor'] . '-border-color' );
	}

	// 枠線のみ get_block_wrapper_attributesに入ってこない対応（カスタム指定）
	if ( isset( $attributes['style']['border'] ) ) {
		foreach ( $attributes['style']['border'] as $key => $value ) {
			array_push( $styles, 'border-' . $key . ':' . esc_attr( $value ) . ';' );
		}
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（背景色)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/\sbackground\-color:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['color']['background'] ) ) {
		array_push( $styles, 'background-color:' . esc_attr( $attributes['style']['color']['background'] ) . ';' );
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（テキスト色)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/\scolor:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['color']['text'] ) ) {
		array_push( $styles, 'color:' . esc_attr( $attributes['style']['color']['text'] ) . ';' );
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（フォントサイズ)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/\sfont\-size:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['typography']['fontSize'] ) ) {
		array_push( $styles, 'font-size:' . esc_attr( $attributes['style']['typography']['fontSize'] ) . ';' );
	}

	// classを組み立て
	if ( 0 < count( $classes ) ) {
		$extra_attributes['class'] = implode( ' ', $classes );
	}

	// styleを組み立て
	if ( 0 < count( $styles ) ) {
		$extra_attributes['style'] = implode( ' ', $styles );
	}

	// ここまで組み立てたclass/styleをマージ＆wrapper要素を取得
	$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );

	$result  = "<div $wrapper_attributes>";
	$result .= '<span>' . $attributes['content'] . '</span>';
	$result .= '</div>';

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
			'vk-blocks/post-new-badge',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-new-badge/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/post-new-badge',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_new_badge_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_new_badge', 99 );

