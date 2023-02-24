<?php
/**
 * Get_hex_to_rgba
 *
 * @package vk-blocks
 */

/**
 * Get_hex_to_rgb カラーコードHEXをRGBに変換.
 *
 * Alpha付きの場合は、そのまま返す（例：rgba( 255,255,255,0.1 )）
 *
 * @param string $color : color string.
 * @param string $alpha : alpha string.
 *
 * @return string
 */
function vk_blocks_get_hex_to_rgba( $color, $alpha ) {
	if ( substr( $color, 0, 4 ) === 'rgba' ) {
		return $color;
	}
	$code_red   = hexdec( substr( $color, 1, 2 ) );
	$code_green = hexdec( substr( $color, 3, 2 ) );
	$code_blue  = hexdec( substr( $color, 5, 2 ) );
	return 'rgba(' . $code_red . ', ' . $code_green . ', ' . $code_blue . ', ' . $alpha . ')';
}
