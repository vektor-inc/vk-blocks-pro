<?php
/**
 * Class VK Scroll Hint
 *
 * @package vk_blocks
 */

/**
 * VK Scroll Hint
 */
class VK_Blocks_ScrollHintRenderer {

	public static function init() {
		add_filter( 'render_block', array( __CLASS__, 'render_with_scroll_hint' ), 10, 2 );
	}

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

	public static function generate_scroll_hint( $block ) {
		$scroll_message_text = ! empty( $block['attrs']['scrollMessageText'] ) ? $block['attrs']['scrollMessageText'] : __( 'You can scroll', 'vk-blocks-pro' );
		$scroll_icon_left    = ! empty( $block['attrs']['scrollIconLeft'] ) ? self::extract_icon_class( $block['attrs']['scrollIconLeft'] ) : 'fa-caret-left';
		$scroll_icon_right   = ! empty( $block['attrs']['scrollIconRight'] ) ? self::extract_icon_class( $block['attrs']['scrollIconRight'] ) : 'fa-caret-right';
		$scroll_breakpoint   = ! empty( $block['attrs']['scrollBreakpoint'] ) ? $block['attrs']['scrollBreakpoint'] : 'table-scrollable-mobile';

		return sprintf(
			'<div class="vk-scroll-hint" data-scroll-breakpoint="%s" data-hint-icon-left="%s" data-hint-icon-right="%s">
				<i class="fa-solid %s"></i>
				<span>%s</span>
				<i class="fa-solid %s"></i>
			</div>',
			esc_attr( $scroll_breakpoint ),
			esc_attr( $scroll_icon_left ),
			esc_attr( $scroll_icon_right ),
			esc_attr( $scroll_icon_left ),
			esc_html( $scroll_message_text ),
			esc_attr( $scroll_icon_right )
		);
	}

	private static function extract_icon_class( $html_string ) {
		if ( preg_match( '/class="([^"]+)"/', $html_string, $matches ) ) {
			return $matches[1];
		}
		return '';
	}
}

VK_Blocks_ScrollHintRenderer::init();
