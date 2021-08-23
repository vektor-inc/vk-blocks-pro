<?php

/**
 * Registers the `vk-blocks/spacer` block.
 */
if ( function_exists( 'register_block_type_from_metadata' ) ) {

	function register_block_vk_spacer() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'register_block_vk_spacer', 99 );
}

/**
 * スペーサーのサイズを取得する関数
 *
 * @param array  $options VK Blocks 共通オプション.
 * @param string $size スペーサーのサイズ.
 * @param string $device 対象デバイス.
 *
 * @return integer|float $return 返り値
 */
function vk_blocks_get_spacer_size( $options, $size, $device = '' ) {

	// そもそも値がなかった場合.
	if ( ! isset( $options['margin_size'][ $size ] ) ) {
		return null;
	}

	// 配列じゃない（デバイス毎のサイズが登録されていない）場合.
	if ( ! is_array( $options['margin_size'][ $size ] ) ) {
		return $options['margin_size'][ $size ];
	}

	// 各サイズのデバイス毎のサイズ.
	if ( isset( $options['margin_size'][ $size ][ $device ] ) && '' !== $options['margin_size'][ $size ][ $device ] ) {
		return $options['margin_size'][ $size ][ $device ];
	} else {
		if ( isset( $options['margin_size'][ $size ]['pc'] ) ) {
			return $options['margin_size'][ $size ]['pc'];
		} elseif ( isset( $options['margin_size'][ $size ]['tablet'] ) ) {
			return $options['margin_size'][ $size ]['tablet'];
		} elseif ( isset( $options['margin_size'][ $size ]['mobile'] ) ) {
			return $options['margin_size'][ $size ]['mobile'];
		} else {
			return null;
		}
	}
	return $return;
}