<?php
/**
 * Utils
 *
 * @package vk-blocks
 */

/**
 * 開発環境のURLヘ変更
 *
 * @param string $url URL.
 * @return string
 */
function vk_blocks_replace_url( $url ) {
	return str_replace( 'http://localhost:8888', 'http://localhost:8888', $url );
}

/**
 * Unescape_html
 *
 * @param string $html HTML.
 * @return string
 */
function vk_blocks_unescape_html( $html ) {
	// バックスラッシュを削除
	$html = str_replace( '\\', '', $html );

	// URLを開発環境に変更
	return vk_blocks_replace_url( $html );
}


