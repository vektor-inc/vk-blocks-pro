<?php
/**
 * Common Margin CSS
 *
 * @package vektor-inc/vk-blocks-pro
 */

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

	// カスタム値がある場合⇒カスタム値を返す.
	// 指定デバイスでのサイズ指定がない場合、他のデバイスで指定しているサイズを自動割り振り
	// tablet -> pc -> mobile の順で自動適用する.
	// でないと PC と タブが指定済 / モバイル未指定のときに モバイルに tablet より広い PC のサイズが適用されてしまうため.
	if ( ! empty( $options['margin_size'][ $spacer_size ]['custom'] ) ) {
		return $options['margin_size'][ $spacer_size ]['custom'];
	} elseif ( isset( $options['margin_size'][ $spacer_size ][ $device ] ) ) { // 各サイズのデバイス毎のサイズ.
		return $options['margin_size'][ $spacer_size ][ $device ];
	} elseif ( isset( $options['margin_size'][ $spacer_size ]['tablet'] ) ) {
		return $options['margin_size'][ $spacer_size ]['tablet'];
	} elseif ( isset( $options['margin_size'][ $spacer_size ]['pc'] ) ) {
		return $options['margin_size'][ $spacer_size ]['pc'];
	} elseif ( isset( $options['margin_size'][ $spacer_size ]['mobile'] ) ) {
		return $options['margin_size'][ $spacer_size ]['mobile'];
	} else {
		return null;
	}
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
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'xxs', $device ) ) ) {
		$return = true;
	}
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
	if ( is_numeric( vk_blocks_get_spacer_size( $options, 'xxl', $device ) ) ) {
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
	if ( ! empty( $return_size ) ) {
		// 数値の場合
		if ( is_numeric( $return_size ) ) {
			$style = '--vk-margin-' . $spacer_size . ':' . $return_size . $unit . ';';
		} elseif ( is_string( $return_size ) ) { // カスタム値の場合
			$style = '--vk-margin-' . $spacer_size . ':' . $return_size . ';';
		}
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
		! empty( $options['margin_size']['xxs'] ) ||
		! empty( $options['margin_size']['xs'] ) ||
		! empty( $options['margin_size']['sm'] ) ||
		! empty( $options['margin_size']['md'] ) ||
		! empty( $options['margin_size']['lg'] ) ||
		! empty( $options['margin_size']['xl'] ) ||
		! empty( $options['margin_size']['xxl'] )
	) {
		if ( ! empty( $options['margin_unit'] ) ) {
			$unit = $options['margin_unit'];
		} else {
			$unit = 'rem';
		}

		if ( vk_blocks_is_size_print( $options, 'mobile' ) ) {
			$dynamic_css         .= '
			@media (max-width: 575.98px) {
				:root,body{';
					$dynamic_css .= ! empty( $options['margin_size']['xxs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxs', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['sm']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['md']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['lg']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'mobile', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xxl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxl', 'mobile', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
		if ( vk_blocks_is_size_print( $options, 'tablet' ) ) {
			$dynamic_css         .= '
			@media (min-width: 576px) and (max-width: 991.98px) {
				:root,body{';
					$dynamic_css .= ! empty( $options['margin_size']['xxs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxs', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['sm']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['md']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['lg']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'tablet', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xxl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxl', 'tablet', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
		if ( vk_blocks_is_size_print( $options, 'pc' ) ) {
			$dynamic_css         .= '
			@media (min-width: 992px) {
				:root,body{';
					$dynamic_css .= ! empty( $options['margin_size']['xxs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxs', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xs']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['sm']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['md']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['lg']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'pc', $unit ) );
					$dynamic_css .= ! empty( $options['margin_size']['xxl']['custom'] ) ? '' : esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxl', 'pc', $unit ) );
					$dynamic_css .= '
				}
			}';
		}
	}
	if (
		! empty( $options['margin_size']['xxs']['custom'] ) ||
		! empty( $options['margin_size']['xs']['custom'] ) ||
		! empty( $options['margin_size']['sm']['custom'] ) ||
		! empty( $options['margin_size']['md']['custom'] ) ||
		! empty( $options['margin_size']['lg']['custom'] ) ||
		! empty( $options['margin_size']['xl']['custom'] ) ||
		! empty( $options['margin_size']['xxl']['custom'] )
	) {
		$dynamic_css     .= '
		:root,body{';
			$dynamic_css .= ! empty( $options['margin_size']['xxs']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxs', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['xs']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'xs', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['sm']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'sm', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['md']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'md', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['lg']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'lg', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['xl']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'xl', 'custom', $unit ) ) : '';
			$dynamic_css .= ! empty( $options['margin_size']['xxl']['custom'] ) ? esc_attr( vk_blocks_get_spacer_size_style( $options, 'xxl', 'custom', $unit ) ) : '';
			$dynamic_css .= '
		}';
	}
	return $dynamic_css;
}

/**
 * VK Blocks Assets
 */
function vk_blocks_print_spacer_size_style() {

	$vk_blocks_options = VK_Blocks_Options::get_options();

	$dynamic_css = vk_blocks_get_spacer_size_style_all( $vk_blocks_options );
	$dynamic_css = vk_blocks_minify_css( $dynamic_css );

	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
	wp_add_inline_style( 'vk-blocks-utils-common-css', $dynamic_css );
	// wp-edit-blocks がないと記事の編集画面に反映されない
	wp_add_inline_style( 'wp-edit-blocks', $dynamic_css );
}
// 10 だと公開画面に出力されないので 11 に指定
// Since setting it to 10 doesn't output to the public screen, set it to 11 instead.
add_action( 'init', 'vk_blocks_print_spacer_size_style', 11 );
