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
	$number            = 0;
	$dynamic_css       = '';
	foreach ( $vk_blocks_options['text_style'] as $text_style ) {
		$number++;
		if ( $text_style['active'] ) {
			$dynamic_css .= '.vk-text-style--' . $number . '{';
			if ( $text_style['font_weight_bold'] ) {
				$dynamic_css .= 'font-weight:bold;';
			}
			if ( $text_style['font_italic'] ) {
				$dynamic_css .= 'font-style:italic;';
			}
			if ( $text_style['font_strikethrough'] ) {
				$dynamic_css .= 'text-decoration:line-through;';
			}
			if ( $text_style['nowrap'] ) {
				$dynamic_css .= 'white-space:nowrap;';
			}
			if ( ! empty( $text_style['font_size'] ) ) {
				$dynamic_css .= 'font-size:' . $text_style['font_size'] . ';';
			}
			if ( ! empty( $text_style['color'] ) ) {
				$dynamic_css .= 'color: ' . vk_blocks_get_color_value( $text_style['color'] ) . ';';
			}
			if ( ! empty( $text_style['background_color'] ) && empty( $text_style['highlighter'] ) ) {
				$dynamic_css .= 'background-color: ' . vk_blocks_get_color_value( $text_style['background_color'] ) . ';';
			}
			if ( empty( $text_style['background_color'] ) && ! empty( $text_style['highlighter'] ) ) {
				$dynamic_css .= 'background: linear-gradient(transparent 60%, ' . vk_blocks_get_hex_to_rgb( $text_style['highlighter'], '0.7' ) . ' 0);';
			}
			if ( ! empty( $text_style['background_color'] ) && ! empty( $text_style['highlighter'] ) ) {
				$dynamic_css .= 'background: linear-gradient(' . vk_blocks_get_color_value( $text_style['background_color'] ) . ' 60%, ' . vk_blocks_get_hex_to_rgb( $text_style['highlighter'], '0.7' ) . ' 0);';
			}
			$dynamic_css .= '}';
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

/**
 * Get_color_value
 *
 * @param string $value : color string.
 *
 * @return string
 */
function vk_blocks_get_color_value( $value ) {
	if ( preg_match( '/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/', $value ) ) {
		$return = $value;
	} elseif ( preg_match( '/^vk-color/', $value ) ) {
		$return = 'var(--' . $value . ')';
	} else {
		$return = 'var(--wp--preset--color--' . $value . ')';
	}
	return $return;
}

/**
 * Get_hex_to_rgb カラーコードHEXをRGBに変換.
 *
 * @param string $color : color string.
 * @param string $alpha : alpha string.
 *
 * @return string
 */
function vk_blocks_get_hex_to_rgb( $color, $alpha ) {
	if ( substr( $color, 0, 4 ) === 'rgba' ) {
		return $color;
	}
	$code_red   = hexdec( substr( $color, 1, 2 ) );
	$code_green = hexdec( substr( $color, 3, 2 ) );
	$code_blue  = hexdec( substr( $color, 5, 2 ) );
	return 'rgba(' . $code_red . ', ' . $code_green . ', ' . $code_blue . ', ' . $alpha . ')';
}
