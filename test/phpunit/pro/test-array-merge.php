<?php
/**
 * Class ArrayMergeTest
 *
 * @package vk-blocks
 */

class ArrayMergeTest extends VK_UnitTestCase {

	public function test_vk_blocks_array_merge() {
		/**
		 * argsとdefaultsをマージしてcorrectになるかテスト
		 */
		$test_data = array(
			// argsに同じキーがあったらそのまま
			array(
				'args'  => array(
					'string' => 'a',
				),
				'defaults'  => array(
					'string' => 'b',
				),
				'correct' => array(
					'string' => 'a',
				),
			),
			// argsの同じキーはそのまま。無いキーはdefaultをマージ
			array(
				'args'  => array(
					'number' => 1,
				),
				'defaults'  => array(
					'number' => 2,
					'string' => 'a',
				),
				'correct' => array(
					'number' => 1,
					'string' => 'a',
				),
			),
			// 配列
			array(
				'args'  => array(
					'string' => 'a',
					'array_1'  => array(
						'value_1_1',
						'value_1_2'
					),
				),
				'defaults'  => array(
					'string' => 'a',
					'array_1'  => array(
						'value_defaults_1_1',
						'value_defaults_1_2'
					),
					'array_ 2'  => array(
						'value_2_1',
						'value_2_2'
					),
				),
				'correct' => array(
					'string' => 'a',
					'array_1'  => array(
						'value_1_1',
						'value_1_2'
					),
					'array_ 2'  => array(
						'value_2_1',
						'value_2_2'
					),
				),
			),
			// 連想配列 順番はdefaultsに合わせる
			array(
				'args'  => array(
					'string' => 'a',
					'array_1'  => array(
						'array_1_1' => array(
							'array_key_1_1' => 'array_value_1_1',
							'array_key_1_2' => 'array_value_1_2',
						),
					),
				),
				'defaults'  => array(
					'string' => 'b',
					'array_1'  => array(
						'array_0_1' => array(
							'array_key_0_1' => 'array_value_0_1',
							'array_key_0_2' => 'array_value_0_1',
						),
						'array_1_1' => array(
							'array_key_1_1' => 'array_value_defaults_1_1',
							'array_key_1_2' => 'array_value_defaults_1_2',
						),
						'array_2_1' => array(
							'array_key_2_1' => 'array_value_2_1',
							'array_key_2_2' => 'array_value_2_2',
						),
					),
				),
				'correct' => array(
					'string' => 'a',
					'array_1'  => array(
						'array_0_1' => array(
							'array_key_0_1' => 'array_value_0_1',
							'array_key_0_2' => 'array_value_0_1',
						),
						'array_1_1' => array(
							'array_key_1_1' => 'array_value_1_1',
							'array_key_1_2' => 'array_value_1_2',
						),
						'array_2_1' => array(
							'array_key_2_1' => 'array_value_2_1',
							'array_key_2_2' => 'array_value_2_2',
						),
					),
				),
			),
			// 配列 argsにキーが無ければdefaultsをマージ
			array(
				'args'  => array(
					'string' => 'b',
				),
				'defaults'  => array(
					'string' => 'a',
					'array_key' => array(
						array(
							'array_key_1' => 'array_defaults_value_1_1',
							'array_key_2' => 'array_defaults_value_1_2',
							'array_key_3' => 'array_defaults_value_1_3',
						),
					),
				),
				'correct' => array(
					'string' => 'b',
					'array_key' => array(
						array(
							'array_key_1' => 'array_defaults_value_1_1',
							'array_key_2' => 'array_defaults_value_1_2',
							'array_key_3' => 'array_defaults_value_1_3',
						),
					),
				),
			),
			// 多次元配列 キーが無ければdefaultsをマージ
			array(
				'args'  => array(
					'array_key' => array(
						array(
							'array_key_1' => 'array_value_1_1',
							'array_key_2' => 'array_value_1_2',
						),
						array(
							'array_key_1' => 'array_value_2_1',
							'array_key_2' => 'array_value_2_2',
							'array_key_3' => 'array_value_2_3',
						),
					),
				),
				'defaults'  => array(
					'array_key' => array(
						array(
							'array_key_1' => 'array_defaults_value_1_1',
							'array_key_2' => 'array_defaults_value_1_2',
							'array_key_3' => 'array_defaults_value_1_3',
						),
					),
				),
				'correct' => array(
					'array_key' => array(
						array(
							'array_key_1' => 'array_value_1_1',
							'array_key_2' => 'array_value_1_2',
							'array_key_3' => 'array_defaults_value_1_3',
						),
						array(
							'array_key_1' => 'array_value_2_1',
							'array_key_2' => 'array_value_2_2',
							'array_key_3' => 'array_value_2_3',
						),
					),
				),
			),
			// 配列 空配列であればそのままarray()を返す
			array(
				'args'  => array(
					'array_key' => array(),
				),
				'defaults'  => array(
					'array_key' => array(
						array(
							'array_key_1' => 'array_defaults_value_1_1',
							'array_key_2' => 'array_defaults_value_1_2',
							'array_key_3' => 'array_defaults_value_1_3',
						),
					),
				),
				'correct' => array(
					'array_key' => array(),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_array_merge()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			$return  = vk_blocks_array_merge( $test_value['args'], $test_value['defaults'] );
			$correct = $test_value['correct'];

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
}
