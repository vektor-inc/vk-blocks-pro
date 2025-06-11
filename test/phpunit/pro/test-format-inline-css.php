<?php
/**
 * Class FormatCssTest
 *
 * @package vk-blocks
 */

class FormatCssTest extends VK_UnitTestCase {

	/**
	 * よく使う書式設定のインラインCSSテスト
	 */
	public function test_vk_blocks_get_custom_format_lists_inline_css() {
		$test_data = array(
			// スタイルを変更していない時はCSSを表示しない
			array(
				'option'  => array(
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => false,
							'font_italic' => false,
							'font_strikethrough' => false,
							'color' => null,
							'background_color' => null,
							'is_active_highlighter' => false,
							'highlighter' => null,
							'font_size' => null,
							'nowrap' => false,
							'class_name' => 'vk-format--1',
							'custom_css' => null,
						),
					),
				),
				'correct' => '',
			),
			// 保存したCSSを取得できるかテスト
			array(
				'option'  => array(
					'custom_format_lists' => array(
						array(
							'title' => '書式設定1',
							'font_weight_bold' => false,
							'font_italic' => false,
							'font_strikethrough' => false,
							'color' => '#fffd6b',
							'background_color' => null,
							'is_active_highlighter' => false,
							'highlighter' => null,
							'font_size' => null,
							'nowrap' => false,
							'class_name' => 'vk-format--1',
							'custom_css' => '.vk-format--1 { border:1px red solid; } selector { background: #f5f5f5; }',
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
							'class_name' => 'custom-format',
							'custom_css' => null,
						),
					),
				),
				'correct' => '.vk-format--1{color:#fffd6b;}.vk-format--1 { border:1px red solid; } .vk-format--1 { background: #f5f5f5; }.custom-format{font-weight:bold;font-style:italic;text-decoration:line-through;white-space:nowrap;font-size:#fff;color:#fff;--vk-highlighter-color:rgba(255, 253, 107, 0.7);background-color:#fff;}.custom-format--vk-highlighter{font-weight:bold;font-style:italic;text-decoration:line-through;white-space:nowrap;font-size:#fff;color:#fff;--vk-highlighter-color:rgba(255, 253, 107, 0.7);background-color:#fff;}',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_custom_format_lists_inline_css()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( ! empty( $test_value['option'] ) ){
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$return  = vk_blocks_get_custom_format_lists_inline_css();
			$correct = $test_value['correct'];

			// print 'return  :';
			// print PHP_EOL;
			// var_dump( $return );
			// print PHP_EOL;
			// print 'correct  :';
			// print PHP_EOL;
			// var_dump( $correct );
			// print PHP_EOL;
			$this->assertSame( $return, $correct );

			// 他のテストに影響が出ないようにオプション値を削除する
			delete_option( 'vk_blocks_options' );
		}
	}
}
