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

	public function test_should_load_separate_assets_with_wp68() {
		$test_data = array(
			// WordPress 6.8未満の場合 - legacy_on_demand() が呼ばれる
			array(
				'wp_version' => '6.7',
				'option'  => array(
					'load_separate_option' => true,
				),
				'filters' => array(
					array('callback' => '__return_true', 'priority' => 10),
				),
				'correct' => true,
				'description' => 'WP 6.7では従来の動作のまま',
			),
			// WordPress 6.8以上で、分割読み込み無効の場合
			array(
				'wp_version' => '6.8',
				'option'  => array(
					'load_separate_option' => false,
				),
				'filters' => array(
					array('callback' => '__return_true', 'priority' => 5),
				),
				'correct' => false,
				'description' => '分割読み込み無効が最優先',
			),
			// WordPress 6.8以上で、VK Blocks優先設定がONの場合
			array(
				'wp_version' => '6.8',
				'option'  => array(
					'load_separate_option' => true,
					'follow_external_on_demand' => true,
				),
				'filters' => array(
					array('callback' => '__return_false', 'priority' => 20),
				),
				'correct' => true,
				'description' => 'VK Blocks優先設定が効いている',
			),
			// WordPress 6.8以上で、デフォルト設定（他と協調）で他がtrueの場合
			array(
				'wp_version' => '6.8',
				'option'  => array(
					'load_separate_option' => true,
					'follow_external_on_demand' => false,
				),
				'filters' => array(
					array('callback' => '__return_true', 'priority' => 20),
				),
				'correct' => true,
				'description' => '他のプラグインのtrueを尊重',
			),
			// WordPress 6.8以上で、デフォルト設定（他と協調）で他がfalseの場合
			array(
				'wp_version' => '6.8',
				'option'  => array(
					'load_separate_option' => true,
					'follow_external_on_demand' => false,
				),
				'filters' => array(
					array('callback' => '__return_false', 'priority' => 20),
				),
				'correct' => true,
				'description' => '他がfalseの場合はVK Blocksの設定を使用',
			),
		);

		foreach ( $test_data as $test_value ) {
			// WordPressバージョンをモック
			global $wp_version;
			$wp_version = $test_value['wp_version'];

			// オプションを設定
			if ( empty( $test_value['option'] ) ) {
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			// 既存のフィルターをクリア
			remove_all_filters( 'should_load_block_assets_on_demand' );

			// フィルターを追加
			foreach ( $test_value['filters'] as $filter ) {
				add_filter( 
					'should_load_block_assets_on_demand', 
					$filter['callback'], 
					$filter['priority'] 
				);
			}

			// VK_Blocks_Block_Loader インスタンスを取得して登録
			$loader = VK_Blocks_Block_Loader::init();
			$loader->register_on_demand_filter_with_option();

			// フィルターを通して結果を取得
			$return = apply_filters('should_load_block_assets_on_demand', null);

			// テストケースの説明を出力（デバッグ用）
			print PHP_EOL . '>> Testing: ' . $test_value['description'];

			$this->assertSame( $test_value['correct'], $return );

			// フィルターをクリーンアップ
			remove_all_filters( 'should_load_block_assets_on_demand' );
		}
	}
}
