<?php
/**
 * VK Print CSS Variables
 *
 * ベクトル製品のテーマや他のプラグインと共通のCSS変数名を使用している都合上、
 * VK Blocks のCSSファイルにCSS変数の値が指定してあると、意図せず変数の値の上書きしてしまう。
 * しかし、今更読み込み順変更は少しリスキーなので迂闊にやるべきではない。
 * 意図せず上書きしてしまう不具合を一時的に回避するために、
 * テーマや他のプラグイン側からCSS変数の値が出力されていない場合のみ出力する
 *
 * @package vk_blocks
 */

/**
 * Vk_Blocks_Print_CSS_Variables
 */
class Vk_Blocks_Print_CSS_Variables {

	/**
	 * コンストラクタ
	 */
	public function __construct() {
		add_action( 'init', array( __CLASS__, 'print_css' ), 11 );
	}

	/**
	 * 公開画面側にCSSを出力
	 *
	 * @return void
	 */
	public static function print_css() {
		if ( ! vk_blocks_is_lightning() ) {
			$dynamic_css = self::get_print_css();
			wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
		}
	}

	/**
	 * 出力するCSSを生成
	 *
	 * @return string $dynamic_css 最小化したCSS
	 */
	public static function get_print_css() {
		$dynamic_css = '
            :root {
                --vk-size-text: 16px;
				--vk-color-primary:#337ab7;
            }';

		/*
			本当は以下も対応したいが 影響範囲が広い & そもそもReact処理を検討する ので暫定で現状措置
			--vk-size-text-xs: 0.75rem;
			--vk-color-border-hr: #e5e5e5;
			--vk-color-border-image: #e5e5e5;
			--vk-color-text-body: #333;
			--vk-color-text-light: #666;
			--vk-line-height-low: 1.5em;
			*/

		// delete before after space.
		$dynamic_css = trim( $dynamic_css );
		// convert tab and br to space.
		$dynamic_css = preg_replace( '/[\n\r\t]/', '', $dynamic_css );
		// Change multiple spaces to single space.
		$dynamic_css = preg_replace( '/\s(?=\s)/', '', $dynamic_css );
		return $dynamic_css;
	}

}

new Vk_Blocks_Print_CSS_Variables();
