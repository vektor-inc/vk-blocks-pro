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
				'name'          => 'heading',
				'is_pro'        => false,
				'is_deprecated' => true,
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
				'name'   => 'visual-embed',
				'is_pro' => false,
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
				'name'   => 'blog-card',
				'is_pro' => true,
			),
			array(
				'name'   => 'blog-card-title',
				'is_pro' => true,
			),
			array(
				'name'   => 'blog-card-featured-image',
				'is_pro' => true,
			),
			array(
				'name'   => 'blog-card-excerpt',
				'is_pro' => true,
			),
			array(
				'name'   => 'blog-card-site-logo',
				'is_pro' => true,
			),
			array(
				'name'   => 'blog-card-site-title',
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
				'name'   => 'dynamic-text',
				'is_pro' => true,
			),
			array(
				'name'   => 'fixed-display',
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
				'name'   => 'post-new-badge',
				'is_pro' => true,
			),
			array(
				'name'   => 'post-category-badge',
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
				'name'   => 'tab',
				'is_pro' => true,
			),
			array(
				'name'   => 'tab-item',
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
	 * Block_style_lists
	 *
	 * @return array
	 */
	public static function block_style_lists() {
		$block_style_lists = array(
			'core/heading' => array(
				array(
					'name'  => 'vk-heading-plain',
					'label' => __( 'Plain', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-background_fill_lightgray',
					'label' => __( 'Background fill lightgray', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-double_black',
					'label' => __( 'Double border top and bottom black', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-double_bottomborder_black',
					'label' => __( 'Double border bottom black', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-solid_black',
					'label' => __( 'Solid border top and bottom black', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-solid_bottomborder_black',
					'label' => __( 'Solid border bottom black', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-dotted_bottomborder_black',
					'label' => __( 'Dotted border bottom black', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-both_ends',
					'label' => __( 'Both ends', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-heading-brackets_black',
					'label' => __( 'Brackets black', 'vk-blocks-pro' ),
				),
			),
			'core/list'    => array(
				array(
					'name'  => 'vk-arrow-mark',
					'label' => __( 'Arrow', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-triangle-mark',
					'label' => __( 'Triangle', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-check-mark',
					'label' => __( 'Check', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-check-square-mark',
					'label' => __( 'Check Square', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-check-circle-mark',
					'label' => __( 'Check Circle', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-handpoint-mark',
					'label' => __( 'Handpoint', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-pencil-mark',
					'label' => __( 'Pencil', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-smile-mark',
					'label' => __( 'Smile', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-frown-mark',
					'label' => __( 'Frown', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-numbered-circle-mark',
					'label' => __( 'Numbered Circle', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-numbered-square-mark',
					'label' => __( 'Numbered Square', 'vk-blocks-pro' ),
				),
			),
			'core/table'   => array(
				array(
					'name'  => 'vk-table-border-top-bottom',
					'label' => __( 'Border Top Bottom', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-table-border',
					'label' => __( 'Border', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-table-border-stripes',
					'label' => __( 'Border / Stripes', 'vk-blocks-pro' ),
				),
			),
			'core/image'   => array(
				array(
					'name'  => 'vk-image-rounded',
					'label' => __( 'Rounded02', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-circle',
					'label' => __( 'Circle', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-border',
					'label' => __( 'Border', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-photoFrame',
					'label' => __( 'Photo frame', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-photoFrame-tilt-right',
					'label' => __( 'Photo frame Tilt Right', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-photoFrame-tilt-left',
					'label' => __( 'Photo frame Tilt Left', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-shadow',
					'label' => __( 'Shadow', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-wave01',
					'label' => __( 'Wave01', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-wave02',
					'label' => __( 'Wave02', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-wave03',
					'label' => __( 'Wave03', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-image-wave04',
					'label' => __( 'Wave04', 'vk-blocks-pro' ),
				),
			),
			'core/group'   => array(
				array(
					'name'  => 'vk-group-solid',
					'label' => __( 'Solid', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-solid-roundcorner',
					'label' => __( 'Solid Roundcorner', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-dotted',
					'label' => __( 'Dotted', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-dashed',
					'label' => __( 'Dashed', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-double',
					'label' => __( 'Double', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-stitch',
					'label' => __( 'Stitch', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-top-bottom-border',
					'label' => __( 'Border Top Bottom', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-shadow',
					'label' => __( 'Shadow', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-alert-info',
					'label' => __( 'Info', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-alert-success',
					'label' => __( 'Success', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-alert-warning',
					'label' => __( 'Warning', 'vk-blocks-pro' ),
				),
				array(
					'name'  => 'vk-group-alert-danger',
					'label' => __( 'Danger', 'vk-blocks-pro' ),
				),
			),
		);
		return $block_style_lists;
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
				'name' => __( 'Small', 'vk-blocks-pro' ),
				'slug' => 'small',
				'size' => '12px',
			),
			array(
				'name' => __( 'Normal', 'vk-blocks-pro' ),
				'slug' => 'normal',
				'size' => '16px',
			),
			array(
				'name' => __( 'Big', 'vk-blocks-pro' ),
				'slug' => 'big',
				'size' => '18px',
			),
			array(
				'name' => __( 'Extra big', 'vk-blocks-pro' ),
				'slug' => 'extra-big',
				'size' => '21px',
			),
		);
		return $font_sizes;
	}
}
