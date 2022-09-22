<?php
/**
 * Registers the `vk-blocks/spacer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Spacer block.
 *
 * @return void
 */
function vk_blocks_register_block_spacer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/spacer',
			VK_BLOCKS_DIR_URL . 'build/spacer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/spacer',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_spacer', 99 );

/**
 * スペーサーのサイズ（数値）を取得する関数
 *
 * @param array  $options VK Blocks 共通オプション.
 * @param string $spacer_size スペーサーのサイズ.
 * @param string $device 対象デバイス.
 *
 * @return integer|float $return 返り値
 */
function vk_blocks_get_spacer_size( $options, $spacer_size, $device ) {

	// そもそも値がなかった場合.
	if ( ! isset( $options['margin_size'][ $spacer_size ] ) ) {
		return null;
	}

	// 配列じゃない（デバイス毎のサイズが登録されていない）場合.
	if ( ! is_array( $options['margin_size'][ $spacer_size ] ) ) {
		return $options['margin_size'][ $spacer_size ];
	}

	// 各サイズのデバイス毎のサイズ.
	if ( isset( $options['margin_size'][ $spacer_size ][ $device ] ) && '' !== $options['margin_size'][ $spacer_size ][ $device ] ) {
		return $options['margin_size'][ $spacer_size ][ $device ];
	} else {
		// 指定デバイスでのサイズ指定がない場合、他のデバイスで指定しているサイズを自動割り振り
		// tablet -> pc -> mobile の順で自動適用する.
		// でないと PC と タブが指定済 / モバイル未指定のときに モバイルに tablet より広い PC のサイズが適用されてしまうため.
		if ( isset( $options['margin_size'][ $spacer_size ]['tablet'] ) ) {
			return $options['margin_size'][ $spacer_size ]['tablet'];
		} elseif ( isset( $options['margin_size'][ $spacer_size ]['pc'] ) ) {
			return $options['margin_size'][ $spacer_size ]['pc'];
		} elseif ( isset( $options['margin_size'][ $spacer_size ]['mobile'] ) ) {
			return $options['margin_size'][ $spacer_size ]['mobile'];
		} else {
			return null;
		}
	}
	return $return;
}

/**
 * 画面サイズ毎のCSSをインライン出力するかどうかを判定する関数
 *
 * @param array  $options VK Blocks 共通オプション.
 * @param string $device : 画面の広さ mobile / tablet / pc.
 * @return bool : 出力するかどうか
 */
function vk_blocks_is_size_print( $options, $device ) {
	$return = false;
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'xs', $device ) ) ) {
		$return = true;
	}
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'sm', $device ) ) ) {
		$return = true;
	}
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'md', $device ) ) ) {
		$return = true;
	}
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'lg', $device ) ) ) {
		$return = true;
	}
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'xl', $device ) ) ) {
		$return = true;
	}
	return $return;
}

/**
 * スペーサーのサイズのCSS変数（１行）を出力する関数
 *
 * @param array  $options VK Blocks 共通オプション.
 * @param string $spacer_size スペーサーのサイズ.
 * @param string $device 対象デバイス.
 * @param string $unit 単位.
 *
 * @return string $style CSS変数指定（１行分）.
 */
function vk_blocks_get_spacer_size_style( $options, $spacer_size, $device, $unit ) {
	$style       = '';
	$return_size = vk_blocks_get_spacer_size( $options, $spacer_size, $device );
	if ( is_numeric( $return_size ) ) {
		$style = '--vk-margin-' . $spacer_size . ':' . $return_size . $unit . ';';
	}
	return $style;
}

/**
 * 共通スペーサーのサイズ指定の全CSSを出力する関数
 *
 * @param array $options VK Blocks 共通オプション.
 * @return string $dynamic_css : 出力するcss
 */
function vk_blocks_get_spacer_size_style_all( $options ) {
	$dynamic_css = '';
	if (
		! empty( $options['margin_size']['xs'] ) ||
		! empty( $options['margin_size']['sm'] ) ||
		! empty( $options['margin_size']['md'] ) ||
		! empty( $options['margin_size']['lg'] ) ||
		! empty( $options['margin_size']['xl'] )
	) {
		if ( ! empty( $options['margin_unit'] ) ) {
			$unit = $options['margin_unit'];
		} else {
			$unit = 'rem';
		}

		if ( vk_blocks_is_size_print( $options, 'mobile' ) ) {
			$dynamic_css         .= '
			@media (max-width: 575.98px) {
				:root{';
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'mobile', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'mobile', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'mobile', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'mobile', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'mobile', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
		if ( vk_blocks_is_size_print( $options, 'tablet' ) ) {
			$dynamic_css         .= '
			@media (min-width: 576px) and (max-width: 991.98px) {
				:root{';
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'tablet', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'tablet', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'tablet', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'tablet', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'tablet', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
		if ( vk_blocks_is_size_print( $options, 'pc' ) ) {
			$dynamic_css         .= '
			@media (min-width: 992px) {
				:root{';
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'pc', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'pc', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'pc', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'pc', $unit ) );
					$dynamic_css .= esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'pc', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
	}
	return $dynamic_css;
}
