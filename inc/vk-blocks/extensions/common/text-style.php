<?php
/**
 * Text Style Setting
 *
 * @package VK Blocks
 */

/**
 * Load Scripts
 */
function vk_blocks_text_style() {
	$vk_blocks_options = vk_blocks_get_options();
	$dynamic_css       = '';
	foreach ( $vk_blocks_options['text_style'] as $text_style ) {
		// CSSの中身を作る
		$declarations = '';
		if ( $text_style['font_weight_bold'] ) {
			$declarations .= 'font-weight:bold;';
		}
		if ( $text_style['font_italic'] ) {
			$declarations .= 'font-style:italic;';
		}
		if ( $text_style['font_strikethrough'] ) {
			$declarations .= 'text-decoration:line-through;';
		}
		if ( $text_style['nowrap'] ) {
			$declarations .= 'white-space:nowrap;';
		}
		if ( ! empty( $text_style['font_size'] ) ) {
			$declarations .= 'font-size:' . $text_style['font_size'] . ';';
		}
		if ( ! empty( $text_style['color'] ) ) {
			$declarations .= 'color:' . vk_blocks_get_color_code( $text_style['color'] ) . ';';
		}
		$highlighter_color = ! empty( $text_style['highlighter'] ) && $text_style['highlighter'] ? $text_style['highlighter'] : VK_Blocks_Global_Settings::HIGHLIGHTER_COLOR;
		if ( $text_style['active_highlighter'] && ! empty( $text_style['background_color'] ) ) {
			// background_colorとhighlighter両方
			$declarations .= 'background:linear-gradient(' . vk_blocks_get_color_code( $text_style['background_color'] ) . ' 60%, ' . vk_blocks_get_hex_to_rgba( $highlighter_color, '0.7' ) . ' 0);';
		}
		if ( ! $text_style['active_highlighter'] && ! empty( $text_style['background_color'] ) ) {
			// background_colorのみ
			$declarations .= 'background:' . vk_blocks_get_color_code( $text_style['background_color'] ) . ';';
		}
		if ( $text_style['active_highlighter'] && empty( $text_style['background_color'] ) ) {
			// highlighterのみ
			$declarations .= 'background:linear-gradient(transparent 60%, ' . vk_blocks_get_hex_to_rgba( $highlighter_color, '0.7' ) . ' 0);';
		}

		// CSSがあったらCSSを出力
		if ( $declarations ) {
			$dynamic_css .= '.' . $text_style['class_name'] . '{' . $declarations . '}';
		}
	}

	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
	if ( is_admin() && class_exists( 'WP_Screen' ) && WP_Screen::get()->is_block_editor() ) {
		wp_add_inline_style( 'vk-blocks-build-editor-css', $dynamic_css );
	}
}
add_action( 'wp_enqueue_scripts', 'vk_blocks_text_style' );
add_action( 'enqueue_block_editor_assets', 'vk_blocks_text_style' );

/**
 * Text_styleのオプション値を渡す
 */
function vk_blocks_text_style_init() {
	$vk_blocks_options = vk_blocks_get_options();
	wp_localize_script(
		'vk-blocks-build-js',
		'vkBlocksOptions',
		array(
			'textStyle' => $vk_blocks_options['text_style'],
		)
	);
}
add_action( 'init', 'vk_blocks_text_style_init' );
