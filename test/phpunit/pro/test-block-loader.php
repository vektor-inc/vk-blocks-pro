<?php
/**
 * Class BlockLoaderTest
 *
 * @package vk-blocks
 */

class BlockLoaderTest extends VK_UnitTestCase {

	public function test_should_load_separate_assets() {
		$test_data = array(
			array(
				'option'  => array(
					'load_separate_option' => null,
				),
				'correct' => array(
					'load_separate_option' => false,
				),
			),
			array(
				'option'  => array(
					'load_separate_option' => 'true',
				),
				'correct' => array(
					'load_separate_option' => true,
				),
			),
			array(
				'option'  => array(
					'load_separate_option' => false,
				),
				'correct' => array(
					'load_separate_option' => false,
				),
			),
			array(
				'option'  => array(
					'load_separate_option' => true,
				),
				'correct' => array(
					'load_separate_option' => true,
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'VK_Blocks_Block_Loader::should_load_separate_assets()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$return  = VK_Blocks_Block_Loader::should_load_separate_assets();
			$correct = $test_value['correct']['load_separate_option'];

			// print 'return  :';
			// print PHP_EOL;
			// var_dump( $return );
			// print PHP_EOL;
			// print 'correct  :';
			// print PHP_EOL;
			// var_dump( $correct );
			// print PHP_EOL;
			$this->assertSame( $correct, $return );
		}
	}

	public function test_add_styles_with_separate_assets() {
	
		$test_cases = array(
			array(
				'option'  => true,
				'expected_individual' => true, 
				'expected_combined'   => false,
			),
			array(
				'option'  => false,
				'expected_individual' => false,
				'expected_combined'   => true,
			),
		);
	
		foreach ( $test_cases as $case ) {
			// 各ケースごとに分割読み込みオプションを設定
			update_option( 'vk_blocks_options', array( 'load_separate_option' => $case['option'] ) );
	
			// 既存のスタイルをクリア
			wp_dequeue_style( 'vk-blocks-build-css' );
			wp_dequeue_style( 'vk-blocks/core-table' );
			wp_dequeue_style( 'vk-blocks/core-heading' );
			wp_dequeue_style( 'vk-blocks/core-image' );
	
			// VK_Blocks_Block_Loader クラスのインスタンスを init メソッドから取得
			$loader = VK_Blocks_Block_Loader::init();
	
			// スタイルを読み込む
			$loader->add_styles();
	
			// 分割読み込みのオプションが有効な場合は個別スタイルがエンキューされることを確認
			$this->assertSame( $case['expected_individual'], wp_style_is( 'vk-blocks/core-table', 'enqueued' ) );
			$this->assertSame( $case['expected_individual'], wp_style_is( 'vk-blocks/core-heading', 'enqueued' ) );
			$this->assertSame( $case['expected_individual'], wp_style_is( 'vk-blocks/core-image', 'enqueued' ) );
	
			// 分割読み込みのオプションが無効な場合は結合スタイルがエンキューされることを確認
			$this->assertSame( $case['expected_combined'], wp_style_is( 'vk-blocks-build-css', 'enqueued' ) );
	
			// 設定を元に戻す
			delete_option( 'vk_blocks_options' );
		}
	}
}
