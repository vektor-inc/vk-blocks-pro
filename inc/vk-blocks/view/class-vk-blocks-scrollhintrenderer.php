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
		$scroll_icon_left    = ! empty( $block['attrs']['scrollIconLeft'] ) ? self::extract_icon_class( $block['attrs']['scrollIconLeft'] ) : 'fa-solid fa-caret-left';
		$scroll_icon_right   = ! empty( $block['attrs']['scrollIconRight'] ) ? self::extract_icon_class( $block['attrs']['scrollIconRight'] ) : 'fa-solid fa-caret-right';

		// スクロールブレイクポイントのデフォルト値を設定
		$scroll_breakpoint   = self::determine_scroll_breakpoint( $block );

		return sprintf(
			'<div class="vk-scroll-hint" data-scroll-breakpoint="%s" data-hint-icon-left="%s" data-hint-icon-right="%s">
				<i class="%s"></i>
				<span>%s</span>
				<i class="%s"></i>
			</div>',
			esc_attr( $scroll_breakpoint ),
			esc_attr( $scroll_icon_left ),
			esc_attr( $scroll_icon_right ),
			esc_attr( $scroll_icon_left ),
			esc_html( $scroll_message_text ),
			esc_attr( $scroll_icon_right )
		);
	}

	/**
	 * Determine the scroll breakpoint value.
	 *
	 * @param array $block The block data.
	 * @return string The scroll breakpoint.
	 */
	private static function determine_scroll_breakpoint( $block ) {
		// クラス名からプレフィックスを抽出してスクロールブレイクポイントを決定
		if ( ! empty( $block['attrs']['scrollBreakpoint'] ) ) {
			return $block['attrs']['scrollBreakpoint'];
		}

		// デフォルトのブレイクポイントを設定 (例: table-scrollable-mobile)
		if ( preg_match( '/is-style-vk-([a-zA-Z0-9_-]+)-scrollable/', $block['attrs']['className'], $matches ) ) {
			return $matches[1] . '-scrollable-mobile';
		}

		// デフォルト値
		return 'table-scrollable-mobile';
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
