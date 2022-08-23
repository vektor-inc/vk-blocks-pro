<?php
/**
 * VK Blocks Global Settings class.
 *
 * ブロックエディタとVK Blocksの管理画面(wp-admin/options-general.php?page=vk_blocks_options)で共通で使用する変数を定義
 * vk-blocks-build-jsとvk-blocks-admin-jsでwp_localize_scriptなどで値を渡す用
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Global_Settings
 */
class VK_Blocks_Global_Settings {

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Global_Settings
	 */
	public static function init() {
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}

	/**
	 * HIGHLIGHTER_COLOR
	 * 蛍光マーカー デフォルト色
	 * TODO:変更箇所を少なくするために蛍光マーカーのデフォルト色をこの定数を使う
	 */
	const HIGHLIGHTER_COLOR = '#fffd6b';

	/**
	 * Font_sizes
	 *
	 * 翻訳関数があるため定数に出来ない
	 * TODO:インラインフォントサイズをこの定数を使う
	 *
	 * @return array
	 */
	public static function font_sizes() {
		$font_sizes = array(
			array(
				'name' => __( 'Small', 'vk-blocks' ),
				'slug' => 'small',
				'size' => '12px',
			),
			array(
				'name' => __( 'Normal', 'vk-blocks' ),
				'slug' => 'normal',
				'size' => '16px',
			),
			array(
				'name' => __( 'Big', 'vk-blocks' ),
				'slug' => 'big',
				'size' => '18px',
			),
			array(
				'name' => __( 'Extra big', 'vk-blocks' ),
				'slug' => 'extra-big',
				'size' => '21px',
			),
		);
		return $font_sizes;
	}

}
