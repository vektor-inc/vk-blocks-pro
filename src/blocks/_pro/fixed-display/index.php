<?php
/**
 * Registers the `vk-blocks/fixed-display` block.
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Fixed_Display class
 */
if ( ! class_exists( 'VK_Blocks_Fixed_Display' ) ) {

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

	VK_Blocks_Fixed_Display::init();
}

/**
 * Register Fixed display block.
 *
 * @return void
 */
function vk_blocks_register_block_fixed_display() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/fixed-display',
			VK_BLOCKS_DIR_URL . 'build/_pro/fixed-display/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/fixed-display-script',
			VK_BLOCKS_DIR_URL . 'build/vk-fixed-display.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	// クラシックテーマ & 6.5 環境で $assets = array() のように空にしないと重複登録になるため
	$assets = array();
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style'         => 'vk-blocks/fixed-display',
			'script'        => 'vk-blocks/fixed-display-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		);
	}

	register_block_type(
		__DIR__,
		$assets
	);
}
add_action( 'init', 'vk_blocks_register_block_fixed_display', 99 );
