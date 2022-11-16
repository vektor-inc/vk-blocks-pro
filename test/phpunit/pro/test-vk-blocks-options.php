<?php
/**
 * Class VKBlocksOptionsTest
 *
 * @package vk-blocks
 */

class VKBlocksOptionsTest extends WP_UnitTestCase {

	public function test_get_deprecated_blocks() {
		$test_data = array(
			array(
				'correct' => array(
					"vk-blocks/alert",
					"vk-blocks/ancestor-page-list",
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_deprecated_blocks()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			$return  = VK_Blocks_Options::get_deprecated_blocks();
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

	public function test_balloon_image_number() {
		$test_data = array(
			array(
				'option' => null,
				'correct' => 15,
			),
			array(
				'option' => 5,
				'correct' => 5,
			),
			array(
				'option' => 20,
				'correct' => 20,
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'balloon_image_number()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( ! empty( $test_value['option'] ) ){
				$number = isset( $test_value['option'] ) ? $test_value['option'] : null;
				add_filter(
					'vk_blocks_image_number',
					function() use ( $number ) {
						return $number;
					}
				);
			}
			$return  = VK_Blocks_Options::balloon_image_number();
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

	// get_vk_blocks_balloon_meta_propertiesを作る
	public function test_get_vk_blocks_balloon_meta_properties() {
		$test_data = array(
			// デフォルト
			array(
				'option' => null,
				'correct' => array(
					'default_icons' => array(
						'type'  => 'object',
						'properties' => array(
							'1' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'2' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'3' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'4' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'5' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'6' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'7' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'8' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'9' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'10' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'11' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'12' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'13' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'14' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'15' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
						),
					),
				),
			),
			// 吹き出しの数を変更した時
			array(
				'option' => 2,
				'correct' => array(
					'default_icons' => array(
						'type'  => 'object',
						'properties' => array(
							'1' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
							'2' => array(
								'type'  => 'object',
								'properties' => array(
									'name' => array(
										'type'    => 'string',
									),
									'src'  => array(
										'type'    => 'string',
									),
								),
							),
						),
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_vk_blocks_balloon_meta_properties()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( ! empty( $test_value['option'] ) ){
				$number = isset( $test_value['option'] ) ? $test_value['option'] : null;
				add_filter(
					'vk_blocks_image_number',
					function() use ( $number ) {
						return $number;
					}
				);
			}
			$return  = VK_Blocks_Options::get_vk_blocks_balloon_meta_properties();
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

	// get_vk_blocks_balloon_meta_defaultsを作る
	public function test_get_vk_blocks_balloon_meta_defaults() {
		$test_data = array(
			// デフォルト
			array(
				'option' => null,
				'correct' => array(
					'default_icons' => array(
						'1' => array(
							'name' => null,
							'src'  => null,
						),
						'2' => array(
							'name' => null,
							'src'  => null,
						),
						'3' => array(
							'name' => null,
							'src'  => null,
						),
						'4' => array(
							'name' => null,
							'src'  => null,
						),
						'5' => array(
							'name' => null,
							'src'  => null,
						),
						'6' => array(
							'name' => null,
							'src'  => null,
						),
						'7' => array(
							'name' => null,
							'src'  => null,
						),
						'8' => array(
							'name' => null,
							'src'  => null,
						),
						'9' => array(
							'name' => null,
							'src'  => null,
						),
						'10' => array(
							'name' => null,
							'src'  => null,
						),
						'11' => array(
							'name' => null,
							'src'  => null,
						),
						'12' => array(
							'name' => null,
							'src'  => null,
						),
						'13' => array(
							'name' => null,
							'src'  => null,
						),
						'14' => array(
							'name' => null,
							'src'  => null,
						),
						'15' => array(
							'name' => null,
							'src'  => null,
						),
					),
				),
			),
			// 吹き出しの数を変更した時
			array(
				'option' => 2,
				'correct' => array(
					'default_icons' => array(
						'1' => array(
							'name' => null,
							'src'  => null,
						),
						'2' => array(
							'name' => null,
							'src'  => null,
						),
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_vk_blocks_balloon_meta_defaults()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( ! empty( $test_value['option'] ) ){
				$number = isset( $test_value['option'] ) ? $test_value['option'] : null;
				add_filter(
					'vk_blocks_image_number',
					function() use ( $number ) {
						return $number;
					}
				);
			}
			$return  = VK_Blocks_Options::get_vk_blocks_balloon_meta_defaults();
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

	public function test_get_balloon_meta_options() {
		$test_data = array(
			// 初期状態
			array(
				'option'  => null,
				'correct' => array(
					'default_icons' => array(
						'1' => array(
							'name' => null,
							'src' => null,
						),
						'2' => array(
							'name' => null,
							'src' => null,
						),
						'3' => array(
							'name' => null,
							'src' => null,
						),
						'4' => array(
							'name' => null,
							'src' => null,
						),
						'5' => array(
							'name' => null,
							'src' => null,
						),
						'6' => array(
							'name' => null,
							'src' => null,
						),
						'7' => array(
							'name' => null,
							'src' => null,
						),
						'8' => array(
							'name' => null,
							'src' => null,
						),
						'9' => array(
							'name' => null,
							'src' => null,
						),
						'10' => array(
							'name' => null,
							'src' => null,
						),
						'11' => array(
							'name' => null,
							'src' => null,
						),
						'12' => array(
							'name' => null,
							'src' => null,
						),
						'13' => array(
							'name' => null,
							'src' => null,
						),
						'14' => array(
							'name' => null,
							'src' => null,
						),
						'15' => array(
							'name' => null,
							'src' => null,
						),
					),
				),
			),
			array(
				'option'  => array(
					'default_icons' => array(
						'type'  => 'object',
						'properties' => array(
							'1' => array(
								'name' => '吹き出し名前',
								'src' => 'https://demo.dev3.biz/lightning-pro/wp-content/uploads/2018/02/agent-18762_1920-200x300.jpg',
							),
							'2' => array(
								'name' => '吹き出し名前',
								'src' => 'https://demo.dev3.biz/lightning-pro/wp-content/uploads/2018/02/agent-18762_1920-200x300.jpg',
							),
							'3' => array(
								'name' => null,
								'src' => null,
							),
							'4' => array(
								'name' => null,
								'src' => null,
							),
							'5' => array(
								'name' => null,
								'src' => null,
							),
							'6' => array(
								'name' => null,
								'src' => null,
							),
							'7' => array(
								'name' => null,
								'src' => null,
							),
							'8' => array(
								'name' => null,
								'src' => null,
							),
							'9' => array(
								'name' => null,
								'src' => null,
							),
							'10' => array(
								'name' => null,
								'src' => null,
							),
							'11' => array(
								'name' => null,
								'src' => null,
							),
							'12' => array(
								'name' => null,
								'src' => null,
							),
							'13' => array(
								'name' => null,
								'src' => null,
							),
							'14' => array(
								'name' => null,
								'src' => null,
							),
							'15' => array(
								'name' => null,
								'src' => null,
							),
						),
					),
				),
				'correct' => array(
					'default_icons' => array(
						'type'  => 'object',
						'properties' => array(
							'1' => array(
								'name' => '吹き出し名前',
								'src' => 'https://demo.dev3.biz/lightning-pro/wp-content/uploads/2018/02/agent-18762_1920-200x300.jpg',
							),
							'2' => array(
								'name' => '吹き出し名前',
								'src' => 'https://demo.dev3.biz/lightning-pro/wp-content/uploads/2018/02/agent-18762_1920-200x300.jpg',
							),
							'3' => array(
								'name' => null,
								'src' => null,
							),
							'4' => array(
								'name' => null,
								'src' => null,
							),
							'5' => array(
								'name' => null,
								'src' => null,
							),
							'6' => array(
								'name' => null,
								'src' => null,
							),
							'7' => array(
								'name' => null,
								'src' => null,
							),
							'8' => array(
								'name' => null,
								'src' => null,
							),
							'9' => array(
								'name' => null,
								'src' => null,
							),
							'10' => array(
								'name' => null,
								'src' => null,
							),
							'11' => array(
								'name' => null,
								'src' => null,
							),
							'12' => array(
								'name' => null,
								'src' => null,
							),
							'13' => array(
								'name' => null,
								'src' => null,
							),
							'14' => array(
								'name' => null,
								'src' => null,
							),
							'15' => array(
								'name' => null,
								'src' => null,
							),
						),
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_balloon_meta_options()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_balloon_meta' );
			} else {
				update_option( 'vk_blocks_balloon_meta', $test_value['option'] );
			}
			$return  = VK_Blocks_Options::get_balloon_meta_options();
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
