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
	} 
	// rgb()やrgba()の色コード（スペース対応）
	elseif ( preg_match( '/^rgba?\s*\(/', $value ) ) {
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
				$hex .= $alpha_hex;
			}
			
			$return = $hex;
		} else {
			$return = $value;
		}
	}
	// ハイフンを含む場合はWordPressのカラーパレットのスラッグとして処理
	elseif ( strpos( $value, '-' ) !== false ) {
		// ハイフンが2つ続いている場合は1つにする(WordPressのコアではそうなっているため)
		$slug = str_replace('--', '-', $value);
		// 末尾のハイフンを削除
		$slug = rtrim( $slug, '-' );
		$return = 'var(--wp--preset--color--' . $slug . ')';
		// デバッグ用（一時的）
		if ( $value === 'border-normal' ) {
			// error_log( 'DEBUG: border-normal matched as slug, returning: ' . $return );
		}
		if ( strpos( $value, 'primary' ) !== false ) {
			// error_log( 'DEBUG: primary color matched as slug, returning: ' . $return );
		}
	}
	// 色名（red, blueなど）- ハイフンを含まない場合のみ
	elseif ( preg_match( '/^[a-zA-Z]+$/', $value ) ) {
		$return = $value;
		// デバッグ用（一時的）
		if ( $value === 'border-normal' ) {
			// error_log( 'DEBUG: border-normal matched as color name, returning: ' . $return );
		}
	}
	else {
		// ハイフンが2つ続いている場合は1つにする(WordPressのコアではそうなっているため)
		$slug = str_replace('--', '-', $value);
		// 末尾のハイフンを削除
		$slug = rtrim( $slug, '-' );
		$return = 'var(--wp--preset--color--' . $slug . ')';
		// デバッグ用（一時的）
		if ( $value === 'rgba( 0,0,0,0.1 )' ) {
			// error_log( 'DEBUG: rgba fell through to else, returning: ' . $return );
		}
		if ( $value === 'border-normal' ) {
			// error_log( 'DEBUG: border-normal fell through to else, returning: ' . $return );
		}
		if ( strpos( $value, 'primary' ) !== false ) {
			// error_log( 'DEBUG: primary color fell through to else, returning: ' . $return );
		}
	}

	return $return;
}
