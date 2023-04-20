<?php
/**
 * VK Blocks Global Settings class.
 *
 * ブロックエディタとVK Blocksの管理画面などで共通で使用する定数を定義
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
	 * Blocks
	 *
	 * @return array
	 */
	public static function blocks() {
		$blocks = array(
			array(
				'name'   => 'alert',
				'is_pro' => false,
			),
			array(
				'name'   => 'ancestor-page-list',
				'is_pro' => false,
			),
			array(
				'name'   => 'balloon',
				'is_pro' => false,
			),
			array(
				'name'   => 'border-box',
				'is_pro' => false,
			),
			array(
				'name'   => 'button',
				'is_pro' => false,
			),
			array(
				'name'   => 'faq',
				'is_pro' => false,
			),
			array(
				'name'   => 'faq2',
				'is_pro' => false,
			),
			array(
				'name'   => 'faq2-a',
				'is_pro' => false,
			),
			array(
				'name'   => 'faq2-q',
				'is_pro' => false,
			),
			array(
				'name'   => 'flow',
				'is_pro' => false,
			),
			array(
				'name'   => 'heading',
				'is_pro' => false,
			),
			array(
				'name'   => 'icon',
				'is_pro' => false,
			),
			array(
				'name'   => 'icon-outer',
				'is_pro' => false,
			),
			array(
				'name'   => 'page-content',
				'is_pro' => false,
			),
			array(
				'name'          => 'pr-blocks',
				'is_pro'        => false,
				'is_deprecated' => true,
			),
			array(
				'name'          => 'pr-content',
				'is_pro'        => false,
				'is_deprecated' => true,
			),
			array(
				'name'   => 'slider',
				'is_pro' => false,
			),
			array(
				'name'   => 'slider-item',
				'is_pro' => false,
			),
			array(
				'name'   => 'spacer',
				'is_pro' => false,
			),
			array(
				'name'          => 'staff',
				'is_pro'        => false,
				'is_deprecated' => true,
			),
			array(
				'name'   => 'accordion',
				'is_pro' => true,
			),
			array(
				'name'   => 'accordion-target',
				'is_pro' => true,
			),
			array(
				'name'   => 'accordion-trigger',
				'is_pro' => true,
			),
			array(
				'name'   => 'animation',
				'is_pro' => true,
			),
			array(
				'name'   => 'archive-list',
				'is_pro' => true,
			),
			array(
				'name'   => 'breadcrumb',
				'is_pro' => true,
			),
			array(
				'name'   => 'button-outer',
				'is_pro' => true,
			),
			array(
				'name'          => 'card',
				'is_pro'        => true,
				'is_deprecated' => true,
			),
			array(
				'name'   => 'card-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'child-page',
				'is_pro' => true,
			),
			array(
				'name'   => 'grid-column',
				'is_pro' => true,
			),
			array(
				'name'   => 'grid-column-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'gridcolcard',
				'is_pro' => true,
			),
			array(
				'name'   => 'gridcolcard-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'gridcolcard-item-body',
				'is_pro' => true,
			),
			array(
				'name'   => 'gridcolcard-item-footer',
				'is_pro' => true,
			),
			array(
				'name'   => 'gridcolcard-item-header',
				'is_pro' => true,
			),
			array(
				'name'          => 'icon-card',
				'is_pro'        => true,
				'is_deprecated' => true,
			),
			array(
				'name'   => 'icon-card-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'outer',
				'is_pro' => true,
			),
			array(
				'name'   => 'post-list',
				'is_pro' => true,
			),
			array(
				'name'   => 'select-post-list',
				'is_pro' => true,
			),
			array(
				'name'   => 'select-post-list-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'step',
				'is_pro' => true,
			),
			array(
				'name'   => 'step-item',
				'is_pro' => true,
			),
			array(
				'name'   => 'table-of-contents-new',
				'is_pro' => true,
			),
			array(
				'name'   => 'taxonomy',
				'is_pro' => true,
			),
			array(
				'name'   => 'timeline',
				'is_pro' => true,
			),
			array(
				'name'   => 'timeline-item',
				'is_pro' => true,
			),
		);
		return $blocks;
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
