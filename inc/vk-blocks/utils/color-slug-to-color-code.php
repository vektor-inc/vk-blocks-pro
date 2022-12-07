<?php
/**
 * Get_hex_to_rgba
 *
 * @package vk-blocks
 */

/**
 * Get_color_code
 *
 * 保存されたカラーの名前orカラーコードからCSS変数に変換する関数
 *
 * @param string $value : color string.
 *
 * @return string
 */
function vk_blocks_get_color_code( $value ) {
	if ( preg_match( '/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/', $value ) ) {
		$return = $value;
	} else {
		$return = 'var(--wp--preset--color--' . $value . ')';
	}
	return $return;
}
