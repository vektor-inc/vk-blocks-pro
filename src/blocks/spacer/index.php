<?php
/**
 * Registers the `vk-blocks/spacer` block.
 *
 * @package vk-blocks
 */

/**
 * CSSの読み込み
 */
function vk_blocks_set_spacer_enqueue_files() {
	// Register Style.
	wp_register_style(
		'vk-blocks/spacer',
		VK_BLOCKS_DIR_PATH . 'build/spacer/style.css',
		array(),
		VK_BLOCKS_VERSION
	);

	// Register Script.
	$asset = include VK_BLOCKS_PATH . 'build/spacer/index.asset.php';
	wp_register_script(
		'vk-blocks/spacer',
		VK_BLOCKS_DIR_PATH . 'build/spacer/index.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/spacer',
			'editor_style'  => 'vk-blocks/spacer',
			'editor_script' => 'vk-blocks/spacer',
		)
	);
}
add_action('init','vk_blocks_set_spacer_enqueue_files', 99);

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
