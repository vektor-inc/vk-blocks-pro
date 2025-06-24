<?php
/**
 * Class VKBCoreListNumberedStyleTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * List block numbered style test case.
 */
class VKBCoreListNumberedStyleTest extends VK_UnitTestCase {

	/**
	 * 番号付きスタイルでdata-vk-number属性が正しく付与されるかテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_render_core_list_numbered_style() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_render_core_list_numbered_style' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		// テストケース1: 通常の番号付きスタイル（start=1, reversed=false）
		$block_content_1 = '<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>';
		$block_1 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-vk-numbered-square-mark',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li><li>Item 3</li>',
		);
		$result_1 = vk_blocks_render_core_list( $block_content_1, $block_1 );
		print 'Test 1 - Normal numbered style:' . PHP_EOL;
		print 'Result: ' . $result_1 . PHP_EOL;
		$this->assertStringContainsString( 'data-vk-number="1"', $result_1 );
		$this->assertStringContainsString( 'data-vk-number="2"', $result_1 );
		$this->assertStringContainsString( 'data-vk-number="3"', $result_1 );

		// テストケース2: 逆順の番号付きスタイル（start=3, reversed=true）
		$block_content_2 = '<ol><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>';
		$block_2 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-vk-numbered-circle-mark',
				'start' => 3,
				'reversed' => true,
			),
			'values' => '<li>Item 1</li><li>Item 2</li><li>Item 3</li>',
		);
		$result_2 = vk_blocks_render_core_list( $block_content_2, $block_2 );
		print 'Test 2 - Reversed numbered style:' . PHP_EOL;
		print 'Result: ' . $result_2 . PHP_EOL;
		$this->assertStringContainsString( 'data-vk-number="3"', $result_2 );
		$this->assertStringContainsString( 'data-vk-number="2"', $result_2 );
		$this->assertStringContainsString( 'data-vk-number="1"', $result_2 );

		// テストケース3: 初期値5から開始（start=5, reversed=false）
		$block_content_3 = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block_3 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-vk-numbered-square-mark',
				'start' => 5,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result_3 = vk_blocks_render_core_list( $block_content_3, $block_3 );
		print 'Test 3 - Start from 5:' . PHP_EOL;
		print 'Result: ' . $result_3 . PHP_EOL;
		$this->assertStringContainsString( 'data-vk-number="5"', $result_3 );
		$this->assertStringContainsString( 'data-vk-number="6"', $result_3 );

		// テストケース4: 番号付きスタイルではない場合（data-vk-number属性が付与されない）
		$block_content_4 = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block_4 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-default',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result_4 = vk_blocks_render_core_list( $block_content_4, $block_4 );
		print 'Test 4 - Not numbered style:' . PHP_EOL;
		print 'Result: ' . $result_4 . PHP_EOL;
		$this->assertStringNotContainsString( 'data-vk-number', $result_4 );

		// テストケース5: 順序なしリストの場合（data-vk-number属性が付与されない）
		$block_content_5 = '<ul><li>Item 1</li><li>Item 2</li></ul>';
		$block_5 = array(
			'attrs' => array(
				'ordered' => false,
				'className' => 'is-style-vk-numbered-square-mark',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result_5 = vk_blocks_render_core_list( $block_content_5, $block_5 );
		print 'Test 5 - Unordered list:' . PHP_EOL;
		print 'Result: ' . $result_5 . PHP_EOL;
		$this->assertStringNotContainsString( 'data-vk-number', $result_5 );
	}

	/**
	 * 番号付きスタイルで色が正しく適用されるかテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_render_core_list_numbered_style_color() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_render_core_list_numbered_style_color' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		// テストケース1: 番号付きスタイルで色が適用される
		$block_content_1 = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block_1 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-vk-numbered-square-mark',
				'color' => 'vivid-red',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result_1 = vk_blocks_render_core_list( $block_content_1, $block_1 );
		print 'Test 1 - Numbered style with color:' . PHP_EOL;
		print 'Result: ' . $result_1 . PHP_EOL;
		$this->assertStringContainsString( 'data-vk-number="1"', $result_1 );
		$this->assertStringContainsString( 'data-vk-number="2"', $result_1 );
		// 色の適用はCSSで行われるため、HTMLには直接含まれないが、
		// 番号付きスタイルのクラスが含まれていることを確認
		$this->assertStringContainsString( 'is-style-vk-numbered-square-mark', $result_1 );

		// テストケース2: 通常のリストで色が適用される
		$block_content_2 = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block_2 = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-default',
				'color' => 'vivid-blue',
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result_2 = vk_blocks_render_core_list( $block_content_2, $block_2 );
		print 'Test 2 - Normal list with color:' . PHP_EOL;
		print 'Result: ' . $result_2 . PHP_EOL;
		$this->assertStringNotContainsString( 'data-vk-number', $result_2 );
		// 色の適用はCSSで行われるため、HTMLには直接含まれないが、
		// 通常のリストスタイルが含まれていることを確認
		$this->assertStringContainsString( 'is-style-default', $result_2 );
	}

	/**
	 * 以前の形式（vk-has-*-color）のクラス名が正しく処理されるかテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_render_core_list_deprecated_classname() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_render_core_list_deprecated_classname' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		// テストケース: 以前の形式のクラス名がある場合、番号付きスタイルの機能は動作するが色の適用はスキップされる
		$block_content = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'vk-has-vivid-red-color is-style-vk-numbered-square-mark',
				'color' => 'vivid-red',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result = vk_blocks_render_core_list( $block_content, $block );
		print 'Test - Deprecated classname:' . PHP_EOL;
		print 'Result: ' . $result . PHP_EOL;
		// 以前の形式のクラス名があっても、番号付きスタイルの機能は動作することを確認
		$this->assertStringContainsString( 'data-vk-number="1"', $result );
		$this->assertStringContainsString( 'data-vk-number="2"', $result );
		$this->assertStringContainsString( 'is-style-vk-numbered-square-mark', $result );
		// 元のコンテンツが変更されていることを確認（処理が実行されている）
		$this->assertNotEquals( $block_content, $result );
	}

	/**
	 * WP6.2未満の環境で正しく処理されるかテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_render_core_list_wp62_compatibility() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_render_core_list_wp62_compatibility' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		// WP_HTML_Tag_Processorクラスが存在しない場合のテスト
		// 実際のテストでは、このクラスが存在しない環境をシミュレートする必要がある
		// ここでは、基本的な動作確認のみ行う
		$block_content = '<ol><li>Item 1</li><li>Item 2</li></ol>';
		$block = array(
			'attrs' => array(
				'ordered' => true,
				'className' => 'is-style-vk-numbered-square-mark',
				'start' => 1,
				'reversed' => false,
			),
			'values' => '<li>Item 1</li><li>Item 2</li>',
		);
		$result = vk_blocks_render_core_list( $block_content, $block );
		print 'Test - WP6.2 compatibility:' . PHP_EOL;
		print 'Result: ' . $result . PHP_EOL;
		// WP_HTML_Tag_Processorクラスが存在する場合、正常に処理されることを確認
		if ( class_exists( 'WP_HTML_Tag_Processor' ) ) {
			$this->assertStringContainsString( 'data-vk-number="1"', $result );
			$this->assertStringContainsString( 'data-vk-number="2"', $result );
		}
	}
} 