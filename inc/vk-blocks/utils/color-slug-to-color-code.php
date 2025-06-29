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
	// 16進数の色コード
	if ( preg_match( '/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/', $value ) ) {
		$return = $value;
	} elseif ( preg_match( '/^rgba?\s*\(/', $value ) ) {
		// rgba()形式を#形式に変換
		if ( preg_match( '/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/', $value, $matches ) ) {
			$r = intval( $matches[1] );
			$g = intval( $matches[2] );
			$b = intval( $matches[3] );
			$a = isset( $matches[4] ) ? floatval( $matches[4] ) : 1.0;
			// RGBを16進数に変換
			$hex = sprintf( '#%02x%02x%02x', $r, $g, $b );
			// アルファ値がある場合は8桁の16進数に変換
			if ( $a < 1.0 ) {
				$alpha_hex = sprintf( '%02x', round( $a * 255 ) );
				$hex      .= $alpha_hex;
			}
			$return = $hex;
		} else {
			$return = $value;
		}
	} elseif ( preg_match( '/^[a-zA-Z]+$/', $value ) ) {
		// 色名（red, blue, blackなど）- ハイフンを含まない場合
		$return = $value;
	} elseif ( strpos( $value, '-' ) !== false ) {
		// WordPressコアの命名規則に合わせてハイフンを正規化
		$slug = str_replace( '--', '-', $value );
		// 末尾のハイフンを削除
		$slug   = rtrim( $slug, '-' );
		$return = 'var(--wp--preset--color--' . $slug . ')';
	} else {
		// WordPressコアの命名規則に合わせてハイフンを正規化
		$slug = str_replace( '--', '-', $value );
		// 末尾のハイフンを削除
		$slug   = rtrim( $slug, '-' );
		$return = 'var(--wp--preset--color--' . $slug . ')';
	}
	return $return;
}
