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

        // デフォルトの設定を一括で処理
        $default_attrs = array(
            'scrollMessageText'   => __( 'You can scroll', 'vk-blocks-pro' ),
            'iconOutputLeft'      => true,
            'iconOutputRight'     => true,
            'scrollIconLeft'      => 'fa-solid fa-caret-left',
            'scrollIconRight'     => 'fa-solid fa-caret-right',
            'scrollBreakpoint'    => apply_filters( 'vk_blocks_default_scroll_breakpoint', 'table-scrollable-mobile', $block ),
            'showScrollMessage'   => false,
        );

        // ブロックの属性をデフォルト設定で上書き
        $attrs = wp_parse_args( $block['attrs'], $default_attrs );

        // アイコンHTMLを生成
        $left_icon_html  = $attrs['iconOutputLeft'] ? '<i class="' . esc_attr( $attrs['scrollIconLeft'] ) . '"></i>' : '';
        $right_icon_html = $attrs['iconOutputRight'] ? '<i class="' . esc_attr( $attrs['scrollIconRight'] ) . '"></i>' : '';

        // スクロールブレイクポイントをスペースで連結
        $scroll_breakpoint_attr = implode( ' ', (array) $attrs['scrollBreakpoint'] );

        // データ属性を組み立て
        $attributes  = sprintf( 'data-scroll-breakpoint="%s"', esc_attr( $scroll_breakpoint_attr ) );
        $attributes .= sprintf( ' data-output-scroll-message="%s"', $attrs['showScrollMessage'] ? 'true' : 'false' );
        $attributes .= sprintf( ' data-icon-output-left="%s"', $attrs['iconOutputLeft'] ? 'true' : 'false' );
        $attributes .= sprintf( ' data-icon-output-right="%s"', $attrs['iconOutputRight'] ? 'true' : 'false' );

        // アイコンがある場合、data-hint-icon 属性を追加
        if ( $attrs['iconOutputLeft'] && ! empty( $attrs['scrollIconLeft'] ) ) {
            $attributes .= sprintf( ' data-hint-icon-left="%s"', esc_attr( $attrs['scrollIconLeft'] ) );
        }
        if ( $attrs['iconOutputRight'] && ! empty( $attrs['scrollIconRight'] ) ) {
            $attributes .= sprintf( ' data-hint-icon-right="%s"', esc_attr( $attrs['scrollIconRight'] ) );
        }

        // スクロールヒントのHTMLを生成して返す
        return sprintf(
            '<div class="vk-scroll-hint" %s>
                %s
                <span>%s</span>
                %s
            </div>',
            $attributes,
            $left_icon_html,
            esc_html( $attrs['scrollMessageText'] ),
            $right_icon_html
        );
    }
}
