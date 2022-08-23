<?php
/**
 * VK Blocks Enqueue
 *
 * @package vk_blocks
 */

/**
 * Vk_Blocks_Enqueue
 */
class Vk_Blocks_Enqueue {

	/**
	 * コンストラクタ
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
	}

	/**
	 * 公開画面側にCSSを出力
	 *
	 * @return void
	 */
	public static function enqueue_scripts() {
		$dynamic_css = '';
		// よく使う書式設定
		$dynamic_css .= vk_blocks_get_text_style_inline_css();

		wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
	}

	/**
	 * ブロックエディタに出力
	 *
	 * @return void
	 */
	public static function enqueue_block_editor_assets() {
		$dynamic_css = '';
		// よく使う書式設定
		$dynamic_css .= vk_blocks_get_text_style_inline_css();

		// インラインで読み込むCSSを出力
		wp_add_inline_style( 'vk-blocks-build-editor-css', $dynamic_css );

		// オプション値をjsに渡す
		$vk_blocks_options = vk_blocks_get_options();
		wp_localize_script(
			'vk-blocks-build-js',
			'vkBlocksConfig',
			array(
				'textStyle' => $vk_blocks_options['text_style'],
			)
		);
	}
}
