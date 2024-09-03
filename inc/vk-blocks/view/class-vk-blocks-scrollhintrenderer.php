<?php
/**
 * Class VK Blocks ScrollHintRenderer
 *
 * @package vk_blocks
 */

/**
 * VK Blocks ScrollHintRenderer
 */
class VK_Blocks_ScrollHintRenderer {

	/**
	 * Initialize the ScrollHintRenderer.
	 */
	public static function init() {
		add_filter( 'render_block', array( __CLASS__, 'render_with_scroll_hint' ), 9, 2 );
	}

	/**
	 * Add scroll hint to blocks with the appropriate class name.
	 *
	 * @param string $block_content The content of the block.
	 * @param array  $block The block data.
	 * @return string Modified block content with scroll hint.
	 */
	public static function render_with_scroll_hint( $block_content, $block ) {

		// クラス名が 'is-style-vk-*-scrollable' パターンにマッチするか確認
		if ( empty( $block['attrs']['className'] ) || ! preg_match( '/is-style-vk-[a-zA-Z0-9_-]+-scrollable/', $block['attrs']['className'] ) ) {
			return $block_content;
		}

		// WordPressバージョンが6.2以上の場合に WP_HTML_Tag_Processor クラスをロード
		if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
			return $block_content;
		}

		$processor = new WP_HTML_Tag_Processor( $block_content );

		// 'is-style-vk-*-scrollable' クラスを持つ任意のタグにスクロールヒントを適用
		if ( $processor->next_tag() && preg_match( '/is-style-vk-[a-zA-Z0-9_-]+-scrollable/', $processor->get_attribute( 'class' ) ) ) {
			$scroll_hint = self::generate_scroll_hint( $block );

			// マッチしたタグの前にスクロールヒントを挿入
			$block_content = preg_replace( '/(<[^>]*class="[^"]*is-style-vk-[a-zA-Z0-9_-]+-scrollable[^"]*"[^>]*>)/i', $scroll_hint . '$1', $block_content );
		}

		return $block_content;
	}

	/**
	 * Generate the scroll hint HTML.
	 *
	 * @param array $block The block data.
	 * @return string The scroll hint HTML.
	 */
	public static function generate_scroll_hint( $block ) {
		$scroll_message_text = ! empty( $block['attrs']['scrollMessageText'] ) ? $block['attrs']['scrollMessageText'] : __( 'You can scroll', 'vk-blocks-pro' );

		// クラス名の取得を修正：設定されているクラスをそのまま使用
		$scroll_icon_left  = ! empty( $block['attrs']['scrollIconLeft'] ) ? self::extract_icon_class( $block['attrs']['scrollIconLeft'] ) : 'fa-solid fa-caret-left';
		$scroll_icon_right = ! empty( $block['attrs']['scrollIconRight'] ) ? self::extract_icon_class( $block['attrs']['scrollIconRight'] ) : 'fa-solid fa-caret-right';

		// クラス名に基づいて data-scroll-breakpoint を設定
		$scroll_breakpoint = self::determine_scroll_breakpoint( $block );

		$scroll_hint = '<div class="vk-scroll-hint"';

		// data-scroll-breakpoint 属性を追加
		$scroll_hint .= ' data-scroll-breakpoint="' . esc_attr( $scroll_breakpoint ) . '"';

		// data-hint-icon-left 属性を追加（設定されているクラスをそのまま使用）
		if ( ! empty( $scroll_icon_left ) ) {
			$scroll_hint .= ' data-hint-icon-left="' . esc_attr( $scroll_icon_left ) . '"';
		}

		// data-hint-icon-right 属性を追加（設定されているクラスをそのまま使用）
		if ( ! empty( $scroll_icon_right ) ) {
			$scroll_hint .= ' data-hint-icon-right="' . esc_attr( $scroll_icon_right ) . '"';
		}

		$scroll_hint .= '>';
		$scroll_hint .= '<i class="' . esc_attr( $scroll_icon_left ) . '"></i>';
		$scroll_hint .= '<span>' . esc_html( $scroll_message_text ) . '</span>';
		$scroll_hint .= '<i class="' . esc_attr( $scroll_icon_right ) . '"></i>';
		$scroll_hint .= '</div>';

		return $scroll_hint;
	}

	/**
	 * Determine the scroll breakpoint value.
	 *
	 * @param array $block The block data.
	 * @return string The scroll breakpoint or an empty string if not found.
	 */
	private static function determine_scroll_breakpoint( $block ) {
		// 属性で指定されたスクロールブレイクポイントが存在する場合はそれを返す
		if ( ! empty( $block['attrs']['scrollBreakpoint'] ) ) {
			return $block['attrs']['scrollBreakpoint'];
		}

		// クラス名から 'is-style-vk-*' パターンを見つけて、それに基づいてスクロールブレイクポイントを設定
		if ( ! empty( $block['attrs']['className'] ) && preg_match( '/is-style-vk-([a-zA-Z0-9_-]+)-scrollable/', $block['attrs']['className'], $matches ) ) {
			$prefix = $matches[1]; // プレフィックス部分を抽出
			// クラス名に基づく条件分岐を設定
			if ( strpos( $block['attrs']['className'], 'vk_tab_labels--scroll-pc' ) !== false ) {
				return $prefix . '-scrollable-pc';
			} elseif ( strpos( $block['attrs']['className'], 'vk_tab_labels--scroll-tablet' ) !== false ) {
				return $prefix . '-scrollable-tablet';
			} elseif ( strpos( $block['attrs']['className'], 'vk_tab_labels--scroll-mobile' ) !== false ) {
				return $prefix . '-scrollable-mobile';
			}

			// デフォルトのブレイクポイントを返す
			return $prefix . '-scrollable-mobile';
		}

		// 何も該当しない場合は空文字列を返す
		return '';
	}

	/**
	 * Extract class names from an HTML string.
	 *
	 * @param string $html_string The HTML string to extract class from.
	 * @return string The extracted class name(s) or an empty string if none found.
	 */
	private static function extract_icon_class( $html_string ) {
		if ( preg_match( '/class="([^"]+)"/', $html_string, $matches ) ) {
			return $matches[1];
		}
		return '';
	}
}

add_action( 'init', array( 'VK_Blocks_ScrollHintRenderer', 'init' ) );
