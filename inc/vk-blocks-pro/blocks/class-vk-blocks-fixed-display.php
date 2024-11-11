<?php
/**
 * VK_Blocks_Fixed_Display class
 *
 * @package vk-blocks
 */

if ( class_exists( 'VK_Blocks_Fixed_Display' ) ) {
	return;
}

/**
 * VK_Blocks_Fixed_Display
 */
class VK_Blocks_Fixed_Display {

	/**
	 * インスタンスを保持するためのプロパティ
	 *
	 * @var VK_Blocks_Fixed_Display|null
	 */
	private static $instance = null;

	/**
	 * シングルトンインスタンスを取得する初期化関数
	 *
	 * @return VK_Blocks_Fixed_Display インスタンス
	 */
	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new self();
			add_filter( 'render_block', array( self::$instance, 'filter_block_opacity' ), 10, 2 );
		}
		return self::$instance;
	}

	/**
	 * ブロックに初期 opacity: 0 を適用
	 *
	 * @param string $block_content ブロックのHTMLコンテンツ.
	 * @param array  $block ブロックの情報.
	 * @return string 変更されたHTMLコンテンツ.
	 */
	public function filter_block_opacity( $block_content, $block ) {
		if ( isset( $block['attrs']['mode'] ) && in_array( $block['attrs']['mode'], array( 'display-hide-after-time', 'show-on-scroll' ), true ) ) {
			// 指定されたモードの場合、初期 opacity: 0 を適用
			$block_content = preg_replace( '/(<div\b[^>]*class="[^"]*vk_fixed-display-mode-(display-hide-after-time|show-on-scroll)[^"]*")/i', '$1 style="opacity:0;"', $block_content );
		}
		return $block_content;
	}
}
