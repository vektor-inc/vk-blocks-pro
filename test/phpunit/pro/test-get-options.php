<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class GetOptionsTest extends VK_UnitTestCase {

	public function test_vk_blocks_get_options() {
		/**
		 * option値を追加した場合
		 * ・プラグインインストール初期状態
		 * ・他のoption値が保存されている状態から追加したoption値の初期値がmargeされるか
		 * ・全てのオプション値を変更した時
		 * の3つのテストを追加してください
		 *
		 * たとえば、次にoption値を追加するは
		 * 1.ライセンスキーのところのテストをコピー
		 * array(
		 * 	'option_check_target' => 'vk_blocks_pro_license_key',
		 * 	'option'  => array(
		 * 		'new_faq_accordion' => 'open',
		 * 		'balloon_border_width' => 2,
		 * 		'margin_unit' => 'px',
		 * 		'margin_size' => array(
		 * 			'lg' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 			'md' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 			'sm' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 		),
		 * 		'load_separate_option' => true,
		 * 	),
		 * 	'correct' => null
		 * ),
		 * 2. その下に貼り付ける
		 * 3. optionにvk_blocks_pro_license_keyと保存される値を追加
		 * 4. option_check_targetに追加したoptionのキー、correctを新しいoptionの初期値を設定してください
		 */
		$test_data = array(
			// プラグインインストール初期状態
			array(
				'option'  => null,
				'correct' => array(
					'balloon_border_width' => 1,
					'margin_unit' => 'rem',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'lg' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'md' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'sm' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
						'xxs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
					),
					'load_separate_option' => false,
					'vk_blocks_pro_license_key' => null,
					'new_faq_accordion' => 'disable',
					'show_custom_css_editor_flag' => 'show',
					'custom_format_lists' => array(
						array(
							'title' => null,
							'font_weight_bold' => false,
							'font_italic' => false,
							'font_strikethrough' => false,
							'color' => null,
							'background_color' => null,
							'is_active_highlighter' => false,
							'highlighter' => '#fffd6b',
							'font_size' => null,
							'nowrap' => false,
							'class_name' => 'vk-format--1',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(),
					'custom_block_style_lists' => array(),
					'balloon_meta_lists' => array(),
					'disable_block_style_lists' => array(),
					'icon_custom_lists' => array(),
					'block_variation_lists' => array(),
				),
			),
			// New FAQ アコーディオン機能 v0.46.0
			// https://github.com/vektor-inc/vk-blocks-pro/pull/21
			array(
				'option_check_target' => 'new_faq_accordion',
				'option'  => array(),
				'correct' => 'disable',
			),
			// 吹き出し線の太さ v0.55.0
			// https://github.com/vektor-inc/vk-blocks-pro/commit/e0ede110ada73f0eb65af611382d899469b8d84b
			array(
				'option_check_target' => 'balloon_border_width',
				'option'  => array(
					'new_faq_accordion' => 'open',
				),
				'correct' => 1,
			),
			// 余白 単位 margin_unit v1.7.1
			// https://github.com/vektor-inc/vk-blocks-pro/pull/584/
			array(
				'option_check_target' => 'margin_unit',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
				),
				'correct' => 'rem'
			),
			// 余白の共通サイズ設定 margin_size v1.7.1
			// https://github.com/vektor-inc/vk-blocks-pro/pull/584/
			array(
				'option_check_target' => array(
					['margin_size','lg','mobile'],
					['margin_size','lg','tablet'],
					['margin_size','lg','pc'],
					['margin_size','md','mobile'],
					['margin_size','md','tablet'],
					['margin_size','md','pc'],
					['margin_size','sm','mobile'],
					['margin_size','sm','tablet'],
					['margin_size','sm','pc'],
				),
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
				),
				'correct' => array(
					'margin_size' => array(
						'lg' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'md' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'sm' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
					),
				),
			),
			// 分割読み込み load_separate_option v1.21.0
			// https://github.com/vektor-inc/vk-blocks-pro/commit/b6f3575cb2ebcb4e64ecb8070b81ccd391abc13c
			array(
				'option_check_target' => 'load_separate_option',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
				),
				'correct' => false
			),
			// ライセンスキー v1.32.0
			// https://github.com/vektor-inc/vk-blocks-pro/pull/1166
			array(
				'option_check_target' => 'vk_blocks_pro_license_key',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
				),
				'correct' => null
			),
			// margin_sizeのlg,md,smに値が設定されているときに、xl,xsが追加された場合
			array(
				'option_check_target' => array(
					['margin_size','xl','mobile'],
					['margin_size','xl','tablet'],
					['margin_size','xl','pc'],
					['margin_size','xs','mobile'],
					['margin_size','xs','tablet'],
					['margin_size','xs','pc'],
				),
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
				),
				'correct' => array(
					'margin_size' => array(
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
					),
				),
			),
			// margin_sizeのxl,lg,md,sm,xsに値が設定されているときに、xxl,xxsが追加された場合
			array(
				'option_check_target' => array(
					['margin_size','xxl','mobile'],
					['margin_size','xxl','tablet'],
					['margin_size','xxl','pc'],
					['margin_size','xxs','mobile'],
					['margin_size','xxs','tablet'],
					['margin_size','xxs','pc'],
				),
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
				),
				'correct' => array(
					'margin_size' => array(
						'xxl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'xxs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
					),
				),
			),
			// カスタムCSS編集画面識別フラグ非表示 v
			array(
				'option_check_target' => 'show_custom_css_editor_flag',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
				),
				'correct' => 'show',
			),
			// カスタム書式追加
			array(
				'option_check_target' => 'custom_format_lists',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'show_custom_css_editor_flag' => 'hide'
				),
				'correct' => array(
					array(
						'title' => null,
						'font_weight_bold' => false,
						'font_italic' => false,
						'font_strikethrough' => false,
						'color' => null,
						'background_color' => null,
						'is_active_highlighter' => false,
						'highlighter' => '#fffd6b',
						'font_size' => null,
						'nowrap' => false,
						'class_name' => 'vk-format--1',
						'custom_css' => null,
					),
				),
			),
			// 非推奨ブロック
			array(
				'option_check_target' => 'disable_block_lists',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
				),
				'correct' => array(),
			),
			// カスタムブロックスタイル
			array(
				'option_check_target' => 'custom_block_style_lists',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
				),
				'correct' => array(),
			),
			// 吹き出し画像設定
			array(
				'option_check_target' => 'balloon_meta_lists',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
						),
					),
				),
				'correct' => array(),
			),
			// ブロックスタイル
			array(
				'option_check_target' => 'disable_block_style_lists',
				'option'  => array(
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
						),
					),
					'balloon_meta_lists' => array(
						array(
							'name' => 'test-name-1',
							'src'  => 'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png',
						),
					),
				),
				'correct' => array(),
			),
			// アイコンカスタムリスト
			array(
				'option_check_target' => 'icon_custom_lists',
				'option'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'new_faq_accordion' => 'open',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
							'property_transform_inline_style' => '.editor-styles-wrapper .vk-block-style-paragraph-1 { color:red; }',
						),
					),
					'balloon_meta_lists' => array(
						array(
							'name' => 'test-name-1',
							'src'  => 'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png',
						),
					),
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/table',
							'property_name'=> array(
								'vk-table-border-top-bottom',
							),
						),
						array(
							'block_name'=> 'core/image',
							'property_name'=> array(
								'vk-image-rounded',
							),
						),
					),
				),
				'correct' => array(),
			),
			// カスタムバリエーション
			array(
				'option_check_target' => 'block_variation_lists',
				'option'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'new_faq_accordion' => 'open',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
							'property_transform_inline_style' => '.editor-styles-wrapper .vk-block-style-paragraph-1 { color:red; }',
						),
					),
					'balloon_meta_lists' => array(
						array(
							'name' => 'test-name-1',
							'src'  => 'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png',
						),
					),
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/table',
							'property_name'=> array(
								'vk-table-border-top-bottom',
							),
						),
						array(
							'block_name'=> 'core/image',
							'property_name'=> array(
								'vk-image-rounded',
							),
						),
					),
					'icon_custom_lists' => array(
						'<i class="fa-brands fa-wordpress"></i>',
						'<i class="fa-brands fa-discord"></i>',
						'<i class="fa-brands fa-github"></i>',
					),
				),
				'correct' => array(),
			),
			// 全てのオプション値を変更した時
			array(
				'option'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'new_faq_accordion' => 'open',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
							'property_transform_inline_style' => '.editor-styles-wrapper .vk-block-style-paragraph-1 { color:red; }',
						),
					),
					'balloon_meta_lists' => array(
						array(
							'name' => 'test-name-1',
							'src'  => 'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png',
						),
					),
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/table',
							'property_name'=> array(
								'vk-table-border-top-bottom',
							),
						),
						array(
							'block_name'=> 'core/image',
							'property_name'=> array(
								'vk-image-rounded',
							),
						),
					),
					'icon_custom_lists' => array(
						'<i class="fa-brands fa-wordpress"></i>',
						'<i class="fa-brands fa-discord"></i>',
						'<i class="fa-brands fa-github"></i>',
					),
					'block_variation_lists' => array(
						array(
							'block_name'=> 'vk-blocks/blog-card',
							'name'        => 'variation-name-1',
							'title'       => 'variation-title-1',
							'description' => 'variation-description-1',
							'category'    => 'variation-category-1',
							'icon'        => 'embed-generic',
							'attributes'  => '{"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"color":"#0000001f","width":"1px","radius":"5px"}}}',
							'innerBlocks' => '[["vk-blocks/blog-card-title",{"level":5,"isLink":true,"rel":"","linkTarget":"_self"},[]]]',
							'scope'       => array('inserter','block'),
							'keywords'    => array('variation-keywords-1', 'variation-keywords-2'),
						),
					),
				),
				'correct'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'xxl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xl' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc'     => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
						'xxs' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc'     => 3,
							'custom' => 'var(--wp--custom--spacing--xx-small)',
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'new_faq_accordion' => 'open',
					'show_custom_css_editor_flag' => 'hide',
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; }',
						),
						array(
							'title' => '書式設定2',
							'font_weight_bold' => true,
							'font_italic' => true,
							'font_strikethrough' => true,
							'color' => '#fff',
							'background_color' => '#fff',
							'is_active_highlighter' => true,
							'highlighter' => '#fffd6b',
							'font_size' => '#fff',
							'nowrap' => true,
							'class_name' => 'vk-format--2',
							'custom_css' => null,
						),
					),
					'disable_block_lists' => array(
						'vk-blocks/pr-blocks',
						'vk-blocks/pr-content',
						'vk-blocks/staff',
						'vk-blocks/card',
						'vk-blocks/icon-card',
					),
					'custom_block_style_lists' => array(
						array(
							'block_name'            => 'core/paragraph',
							'property_name'         => 'vk-block-style-paragraph-1',
							'property_label'        => '段落カスタムブロックスタイル１',
							'property_inline_style' => '.vk-block-style-paragraph-1 { color:red; }',
							'property_transform_inline_style' => '.editor-styles-wrapper .vk-block-style-paragraph-1 { color:red; }',
						),
					),
					'balloon_meta_lists' => array(
						array(
							'name' => 'test-name-1',
							'src'  => 'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png',
						),
					),
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/table',
							'property_name'=> array(
								'vk-table-border-top-bottom',
							),
						),
						array(
							'block_name'=> 'core/image',
							'property_name'=> array(
								'vk-image-rounded',
							),
						),
					),
					'icon_custom_lists' => array(
						'<i class="fa-brands fa-wordpress"></i>',
						'<i class="fa-brands fa-discord"></i>',
						'<i class="fa-brands fa-github"></i>',
					),
					'block_variation_lists' => array(
						array(
							'block_name'=> 'vk-blocks/blog-card',
							'name'        => 'variation-name-1',
							'title'       => 'variation-title-1',
							'description' => 'variation-description-1',
							'category'    => 'variation-category-1',
							'icon'        => 'embed-generic',
							'attributes'  => '{"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"color":"#0000001f","width":"1px","radius":"5px"}}}',
							'innerBlocks' => '[["vk-blocks/blog-card-title",{"level":5,"isLink":true,"rel":"","linkTarget":"_self"},[]]]',
							'scope'       => array('inserter','block'),
							'keywords'    => array('variation-keywords-1', 'variation-keywords-2'),
						),
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'VK_Blocks_Options::get_options()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$return  = VK_Blocks_Options::get_options();
			$correct = $test_value['correct'];

			// print 'return  :';
			// print PHP_EOL;
			// var_dump( $return );
			// print PHP_EOL;
			// print 'correct  :';
			// print PHP_EOL;
			// var_dump( $correct );
			// print PHP_EOL;

			// 配列の時 指定したキー同士を比べる
			if ( array_key_exists('option_check_target', $test_value) && is_array( $test_value['option_check_target'] ) ) {
				foreach($test_value['option_check_target'] as $keys){
					$correct_target = $correct;
					$return_target  = $return;
					foreach($keys as $value){
						// VK_Blocks_Options::get_optionsから返ってきた値
						$return_target  = $return_target[$value];
						// $test_dataのcorrectの指定した配列
						$correct_target = $correct_target[$value];
					}
					// var_dump('$return_target');
					// var_dump($return_target);
					// var_dump('$correct_target');
					// var_dump($correct_target);
					$this->assertSame( $correct_target, $return_target );
				}
			} else if ( array_key_exists('option_check_target', $test_value) && ! is_array( $test_value['option_check_target'] ) && $test_value['option_check_target'] ) {
				$this->assertSame( $correct, $return[ $test_value['option_check_target'] ] );
			} else {
				$this->assertSame( $correct, $return );
			}

			// 他のテストに影響が出ないようにオプション値を削除する
			delete_option( 'vk_blocks_options' );

		}
	}
}
