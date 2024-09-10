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

		// クラス名が 'is-style-vk-*-scrollable' かつ data-output-scroll-hint="true" が存在するか確認
		if (
		empty( $block['attrs']['className'] ) ||
		! preg_match( '/is-style-vk-[a-zA-Z0-9_-]+-scrollable/', $block['attrs']['className'] ) ||
		strpos( $block_content, 'data-output-scroll-hint="true"' ) === false
		) {
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

		// アイコン出力フラグの確認
		$icon_output_left  = isset( $block['attrs']['iconOutputLeft'] ) ? filter_var( $block['attrs']['iconOutputLeft'], FILTER_VALIDATE_BOOLEAN ) : true;
		$icon_output_right = isset( $block['attrs']['iconOutputRight'] ) ? filter_var( $block['attrs']['iconOutputRight'], FILTER_VALIDATE_BOOLEAN ) : true;

		// クラス名は直接使用
		$scroll_icon_left_class  = ! empty( $block['attrs']['scrollIconLeft'] ) ? $block['attrs']['scrollIconLeft'] : 'fa-solid fa-caret-left';
		$scroll_icon_right_class = ! empty( $block['attrs']['scrollIconRight'] ) ? $block['attrs']['scrollIconRight'] : 'fa-solid fa-caret-right';

		$default_breakpoint = apply_filters( 'vk_blocks_default_scroll_breakpoint', 'table-scrollable-mobile', $block );
		$scroll_breakpoints = ! empty( $block['attrs']['scrollBreakpoint'] ) ? $block['attrs']['scrollBreakpoint'] : $default_breakpoint;

		$scroll_breakpoint_attr = implode( ' ', (array) $scroll_breakpoints );

		// クラス名が存在する場合のみアイコンを表示
		$left_icon_html  = $icon_output_left ? '<i class="' . esc_attr( $scroll_icon_left_class ) . '"></i>' : '';
		$right_icon_html = $icon_output_right ? '<i class="' . esc_attr( $scroll_icon_right_class ) . '"></i>' : '';

		// スクロールメッセージ出力フラグの確認
		$output_scroll_message = isset( $block['attrs']['showScrollMessage'] ) ? filter_var( $block['attrs']['showScrollMessage'], FILTER_VALIDATE_BOOLEAN ) : false;

		// データ属性の設定
		$attributes = sprintf( 'data-scroll-breakpoint="%s"', esc_attr( $scroll_breakpoint_attr ) );

		// スクロールメッセージの出力フラグに基づいてdata属性を設定
		$attributes .= sprintf( ' data-output-scroll-message="%s"', $output_scroll_message ? 'true' : 'false' );

		// アイコンの出力フラグに基づいてdata属性を設定
		$attributes .= sprintf( ' data-icon-output-left="%s"', $icon_output_left ? 'true' : 'false' );
		$attributes .= sprintf( ' data-icon-output-right="%s"', $icon_output_right ? 'true' : 'false' );

		// アイコンの出力フラグが true の場合のみ、data-hint-icon を追加
		if ( $icon_output_left && ! empty( $scroll_icon_left_class ) ) {
			$attributes .= sprintf( ' data-hint-icon-left="%s"', esc_attr( $scroll_icon_left_class ) );
		}

		if ( $icon_output_right && ! empty( $scroll_icon_right_class ) ) {
			$attributes .= sprintf( ' data-hint-icon-right="%s"', esc_attr( $scroll_icon_right_class ) );
		}

		return sprintf(
			'<div class="vk-scroll-hint" %s>
				%s
				<span>%s</span>
				%s
			</div>',
			$attributes,
			$left_icon_html,
			esc_html( $scroll_message_text ),
			$right_icon_html
		);
	}
}
