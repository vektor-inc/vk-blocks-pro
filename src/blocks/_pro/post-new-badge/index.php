<?php
/**
 * Registers the `vk-blocks/post-new-badge` block.
 *
 * @package vk-blocks
 */

/**
 * New Badge render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_post_new_badge_render_callback( $attributes ) {
	$days_as_new_post = $attributes['daysAsNewPost'];

	// 投稿の日時をY-m-d形式で取得
	$post_date     = get_the_date( 'Y-m-d' );
	$post_datetime = new DateTime( $post_date );

	// 現在の日時をY-m-d形式で取得
	$current_date     = current_time( 'Y-m-d' );
	$current_datetime = new DateTime( $current_date );

	// 投稿日時と現在の日時の差を日単位で計算
	$interval        = $post_datetime->diff( $current_datetime );
	$days_since_post = $interval->days;

	// 新着の判定
	if ( $days_since_post >= $days_as_new_post ) {
		return '';
	}

	// ブロックに付与すべきWrapper要素を取得
	$orig_attributes = WP_Block_Supports::get_instance()->apply_block_supports();

	$extra_attributes = array();
	$classes          = array();
	$styles           = array();

	array_push( $classes, 'vk_newBadge' );

	// 枠線のみget_block_wrapper_attributesに入ってこない対応
	if ( isset( $attributes['style']['border'] ) ) {
		array_push( $classes, 'has-border-color' );

		// パレット指定の場合
		if ( isset( $attributes['borderColor'] ) ) {
			array_push( $classes, 'has-' . $attributes['borderColor'] . '-border-color' );
		}

		// カスタム指定の場合
		foreach ( $attributes['style']['border'] as $key => $value ) {
			if ( is_array( $value ) ) {
				if ( 'radius' === $key ) {
					$radius     = $attributes['style']['border']['radius'];
					$radius_css = '';
					if ( isset( $radius['topLeft'] ) ) {
						$radius_css .= 'border-top-left-radius: ' . $radius['topLeft'] . '; ';
					}
					if ( isset( $radius['topRight'] ) ) {
						$radius_css .= 'border-top-right-radius: ' . $radius['topRight'] . '; ';
					}
					if ( isset( $radius['bottomRight'] ) ) {
						$radius_css .= 'border-bottom-right-radius: ' . $radius['bottomRight'] . '; ';
					}
					if ( isset( $radius['bottomLeft'] ) ) {
						$radius_css .= 'border-bottom-left-radius: ' . $radius['bottomLeft'] . '; ';
					}
					array_push( $styles, $radius_css );
				} else {
					foreach ( $value as $key2 => $value2 ) {
						array_push( $styles, 'border-' . $key . '-' . $key2 . ':' . esc_attr( vk_blocks_convert_attribute_value_to_css( $value2 ) ) . ';' );
					}
				}
			} else {
				array_push( $styles, 'border-' . $key . ':' . esc_attr( $value ) . ';' );
			}
		}
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（背景色)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/\sbackground\-color:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['color']['background'] ) ) {
		array_push( $styles, 'background-color:' . esc_attr( $attributes['style']['color']['background'] ) . ';' );
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（テキスト色)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/[^\-]*color:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['color']['text'] ) ) {
		array_push( $styles, 'color:' . esc_attr( $attributes['style']['color']['text'] ) . ';' );
	}

	// スタイルのデフォルト値が get_block_wrapper_attributesに入ってこない対応（フォントサイズ)
	if ( ( ! isset( $orig_attributes['style'] ) || ( isset( $orig_attributes['style'] ) && ! preg_match( '/\sfont\-size:/', $orig_attributes['style'] ) ) ) && isset( $attributes['style']['typography']['fontSize'] ) ) {
		array_push( $styles, 'font-size:' . esc_attr( $attributes['style']['typography']['fontSize'] ) . ';' );
	}

	// classを組み立て
	if ( 0 < count( $classes ) ) {
		$extra_attributes['class'] = implode( ' ', $classes );
	}

	// styleを組み立て
	if ( 0 < count( $styles ) ) {
		$extra_attributes['style'] = implode( ' ', $styles );
	}

	// ここまで組み立てたclass/styleをマージ＆wrapper要素を取得
	$wrapper_attributes = get_block_wrapper_attributes( $extra_attributes );

	$result  = "<div $wrapper_attributes>";
	$result .= '<span>' . $attributes['content'] . '</span>';
	$result .= '</div>';

	return $result;
}

/**
 * Attributesの値をCSSの値に変換
 * ex) "var:preset|color|vivid-red" を var(--wp--preset--color--vivid-red) に変換
 *
 * @param string $input 値.
 * @return string
 */
function vk_blocks_convert_attribute_value_to_css( $input ) {
	// 文字列に"|"がなければ入力された値をそのまま返す
	if ( strpos( $input, '|' ) === false ) {
		return $input;
	}

	// "var:"で始まる場合の変換処理
	if ( strpos( $input, 'var:' ) === 0 ) {
		// "var:"を取り除く
		$input = str_replace( 'var:', '', $input );

		// "|"を"--"に置き換え
		$converted = str_replace( '|', '--', $input );

		// 変換された文字列を"var(--wp--"で囲んで返す
		return 'var(--wp--' . $converted . ')';
	}

	// 上記の条件に当てはまらない場合は入力された値をそのまま返す
	return $input;
}


/**
 * Register New Badge block.
 *
 * @return void
 */
function vk_blocks_register_block_post_new_badge() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-new-badge',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-new-badge/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/post-new-badge',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_post_new_badge_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_new_badge', 99 );

