<?php
/**
 * Custom Format Setting
 *
 * @package VK Blocks
 */

/**
 * Create Custom Format CSS
 *
 * @return string
 */
function vk_blocks_get_custom_format_lists_inline_css() {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	$dynamic_css       = '';
	foreach ( $vk_blocks_options['custom_format_lists'] as $custom_format ) {
		// CSSの中身を作る
		$declarations = '';
		if ( $custom_format['font_weight_bold'] ) {
			$declarations .= 'font-weight:bold;';
		}
		if ( $custom_format['font_italic'] ) {
			$declarations .= 'font-style:italic;';
		}
		if ( $custom_format['font_strikethrough'] ) {
			$declarations .= 'text-decoration:line-through;';
		}
		if ( $custom_format['nowrap'] ) {
			$declarations .= 'white-space:nowrap;';
		}
		if ( ! empty( $custom_format['font_size'] ) ) {
			$declarations .= 'font-size:' . $custom_format['font_size'] . ';';
		}
		if ( ! empty( $custom_format['color'] ) ) {
			$declarations .= 'color:' . vk_blocks_get_color_code( $custom_format['color'] ) . ';';
		}
		$highlighter_color = ! empty( $custom_format['highlighter'] ) && $custom_format['highlighter'] ? $custom_format['highlighter'] : VK_Blocks_Global_Settings::HIGHLIGHTER_COLOR;
		if ( $custom_format['is_active_highlighter'] && ! empty( $custom_format['background_color'] ) ) {
			// background_colorとhighlighter両方
			$declarations .= 'background:linear-gradient(' . vk_blocks_get_color_code( $custom_format['background_color'] ) . ' 60%, ' . vk_blocks_get_hex_to_rgba( $highlighter_color, '0.7' ) . ' 0);';
		}
		if ( ! $custom_format['is_active_highlighter'] && ! empty( $custom_format['background_color'] ) ) {
			// background_colorのみ
			$declarations .= 'background:' . vk_blocks_get_color_code( $custom_format['background_color'] ) . ';';
		}
		if ( $custom_format['is_active_highlighter'] && empty( $custom_format['background_color'] ) ) {
			// highlighterのみ
			$declarations .= 'background:linear-gradient(transparent 60%, ' . vk_blocks_get_hex_to_rgba( $highlighter_color, '0.7' ) . ' 0);';
		}

		// declarationsからCSSを出力
		if ( $declarations ) {
			$dynamic_css .= '.' . $custom_format['class_name'] . '{' . $declarations . '}';
		}

		// custom_cssからCSSを出力
		if ( ! empty( $custom_format['custom_css'] ) ) {
			$dynamic_css .= $custom_format['custom_css'];
		}
	}
	return $dynamic_css;
}
