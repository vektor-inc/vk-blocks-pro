<?php
/**
 * Class VKBlocksOptionsTest
 *
 * @package vk-blocks
 */

class VKBlocksOptionsTest extends WP_UnitTestCase {

	public function test_options_scheme() {
		$test_data = array(
			// Pro版 マージ
			array(
				'option' => array(
					'vk_blocks_pro_license_key' => array(
						'type'    => 'string',
						'default' => null,
					),
					'display_vk_block_template' => array(
						'type'    => 'string',
						'default' => 'display',
					),
					'new_faq_accordion'         => array(
						'type'    => 'string',
						'default' => 'disable',
					),
				),
				'correct' => array(
					'balloon_border_width' => array(
						'type'    => 'number',
						'default' => 1,
					),
					'margin_unit'          => array(
						'type'    => 'string',
						'default' => 'rem',
					),
					'margin_size'          => array(
						'type'  => 'object',
						'items' => array(
							'lg' => array(
								'type'  => 'object',
								'items' => array(
									'mobile' => array(
										'type'    => 'number',
										'default' => null,
									),
									'tablet' => array(
										'type'    => 'number',
										'default' => null,
									),
									'pc'     => array(
										'type'    => 'number',
										'default' => null,
									),
								),
							),
							'md' => array(
								'type'  => 'object',
								'items' => array(
									'mobile' => array(
										'type'    => 'number',
										'default' => null,
									),
									'tablet' => array(
										'type'    => 'number',
										'default' => null,
									),
									'pc'     => array(
										'type'    => 'number',
										'default' => null,
									),
								),
							),
							'sm' => array(
								'type'  => 'object',
								'items' => array(
									'mobile' => array(
										'type'    => 'number',
										'default' => null,
									),
									'tablet' => array(
										'type'    => 'number',
										'default' => null,
									),
									'pc'     => array(
										'type'    => 'number',
										'default' => null,
									),
								),
							),
						),
					),
					'load_separate_option' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'text_style'          => array(
						'type'  => 'object',
						'items' => array(
							'1' => array(
								'type'  => 'object',
								'items' => array(
									'title'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_weight_bold'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_italic'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_strikethrough' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'color'              => array(
										'type'    => 'string',
										'default' => null,
									),
									'background_color'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active_highlighter'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'highlighter'        => array(
										'type'    => 'string',
										'default' => '#fffd6b',
									),
									'font_size'          => array(
										'type'    => 'string',
										'default' => null,
									),
									'nowrap'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
								),
							),
							'2' => array(
								'type'  => 'object',
								'items' => array(
									'title'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_weight_bold'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_italic'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_strikethrough' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'color'              => array(
										'type'    => 'string',
										'default' => null,
									),
									'background_color'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active_highlighter'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'highlighter'        => array(
										'type'    => 'string',
										'default' => '#fffd6b',
									),
									'font_size'          => array(
										'type'    => 'string',
										'default' => null,
									),
									'nowrap'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
								),
							),
							'3' => array(
								'type'  => 'object',
								'items' => array(
									'title'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_weight_bold'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_italic'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_strikethrough' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'color'              => array(
										'type'    => 'string',
										'default' => null,
									),
									'background_color'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active_highlighter'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'highlighter'        => array(
										'type'    => 'string',
										'default' => '#fffd6b',
									),
									'font_size'          => array(
										'type'    => 'string',
										'default' => null,
									),
									'nowrap'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
								),
							),
							'4' => array(
								'type'  => 'object',
								'items' => array(
									'title'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_weight_bold'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_italic'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_strikethrough' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'color'              => array(
										'type'    => 'string',
										'default' => null,
									),
									'background_color'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active_highlighter'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'highlighter'        => array(
										'type'    => 'string',
										'default' => '#fffd6b',
									),
									'font_size'          => array(
										'type'    => 'string',
										'default' => null,
									),
									'nowrap'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
								),
							),
							'5' => array(
								'type'  => 'object',
								'items' => array(
									'title'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_weight_bold'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_italic'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'font_strikethrough' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'color'              => array(
										'type'    => 'string',
										'default' => null,
									),
									'background_color'   => array(
										'type'    => 'string',
										'default' => null,
									),
									'active_highlighter'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'highlighter'        => array(
										'type'    => 'string',
										'default' => '#fffd6b',
									),
									'font_size'          => array(
										'type'    => 'string',
										'default' => null,
									),
									'nowrap'             => array(
										'type'    => 'boolean',
										'default' => false,
									),
								),
							),
						),
					),
					'vk_blocks_pro_license_key' => array(
						'type'    => 'string',
						'default' => null,
					),
					'display_vk_block_template' => array(
						'type'    => 'string',
						'default' => 'display',
					),
					'new_faq_accordion'         => array(
						'type'    => 'string',
						'default' => 'disable',
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'options_scheme()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( ! empty( $test_value['option'] ) ){
				$array = isset( $test_value['option'] ) ? $test_value['option'] : null;
				add_filter(
					'vk_blocks_default_options_scheme',
					function() use( $array ) {
						return $array;
					}
				);
			}
			$return  = VK_Blocks_Options::options_scheme();
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

	public function test_text_style_number() {
		$test_data = array(
			array(
				'option' => null,
				'correct' => 5,
			),
			array(
				'option' => 2,
				'correct' => 2,
			),
			array(
				'option' => 10,
				'correct' => 10,
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'text_style_number()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			if ( ! empty( $test_value['option'] ) ){
				$number = isset( $test_value['option'] ) ? $test_value['option'] : null;
				add_filter(
					'vk_blocks_text_style_number',
					function() use ( $number ) {
						return $number;
					}
				);
			}
			$return  = VK_Blocks_Options::text_style_number();
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

	// balloon_meta_schemaを作る
	public function test_balloon_meta_schema() {
		$test_data = array(
			// デフォルト
			array(
				'option' => null,
				'correct' => array(
					'default_icons' => array(
						'type'  => 'object',
						'items' => array(
							'1' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'2' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'3' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'4' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'5' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'6' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'7' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'8' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'9' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'10' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'11' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'12' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'13' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'14' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'15' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
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
						'items' => array(
							'1' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
									),
								),
							),
							'2' => array(
								'type'  => 'object',
								'items' => array(
									'name' => array(
										'type'    => 'string',
										'default' => null,
									),
									'src'  => array(
										'type'    => 'string',
										'default' => null,
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
		print 'balloon_meta_schema()' . PHP_EOL;
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
			$return  = VK_Blocks_Options::balloon_meta_schema();
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

	public function test_get_defaults() {
		$test_data = array(
			array(
				'option' => array(
					'some_bool'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'some_int' => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'some_number' => array(
						'type'    => 'number',
						'default' => 1.5,
					),
					'some_array' => array(
						'type'    => 'array',
						'default' => array(
							'a',
							'b',
							'c'
						),
					),
					'some_object_1' => array(
						'type'  => 'object',
						'items' => array(
							'some_object_1_grand_child_1' => array(
								'type'    => 'string',
								'default' => 'some_object_1_grand_child_1_text',
							),
							'some_object_1_grand_child_2'  => array(
								'type'    => 'string',
								'default' => 'some_object_1_grand_child_2_text',
							),
						),
					),
					'some_object_2' => array(
						'type'  => 'object',
						'items' => array(
							'some_object_child' => array(
								'type'  => 'object',
								'items' => array(
									'some_object_2_grand_child_1' => array(
										'type'    => 'string',
										'default' => 'some_object_2_grand_child_1_text',
									),
									'some_object_2_grand_child_2'  => array(
										'type'    => 'string',
										'default' => 'some_object_2_grand_child_2_text',
									),
								),
							),
						),
					),
				),
				'correct' => array(
					'some_bool'  => false,
					'some_int'  => 1,
					'some_number'  => 1.5,
					'some_array'  => array(
						'a',
						'b',
						'c'
					),
					'some_object_1'  => array(
						'some_object_1_grand_child_1' => 'some_object_1_grand_child_1_text',
						'some_object_1_grand_child_2' => 'some_object_1_grand_child_2_text',
					),
					'some_object_2'  => array(
						'some_object_child' => array(
							'some_object_2_grand_child_1' => 'some_object_2_grand_child_1_text',
							'some_object_2_grand_child_2' => 'some_object_2_grand_child_2_text',
						)
					),
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_defaults()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			$return  = VK_Blocks_Options::get_defaults($test_value['option']);
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

	public function test_get_properties() {
		$test_data = array(
			array(
				'option' => array(
					'some_bool'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'some_int' => array(
						'type'    => 'integer',
						'default' => 1,
					),
					'some_number' => array(
						'type'    => 'number',
						'default' => 1.5,
					),
					'some_array' => array(
						'type'    => 'array',
						'default' => array(
							'a',
							'b',
							'c'
						),
					),
					'some_object_1' => array(
						'type'  => 'object',
						'items' => array(
							'some_object_1_grand_child_1' => array(
								'type'    => 'string',
								'default' => 'some_object_1_grand_child_1_text',
							),
							'some_object_1_grand_child_2'  => array(
								'type'    => 'string',
								'default' => 'some_object_1_grand_child_2_text',
							),
						),
					),
					'some_object_2' => array(
						'type'  => 'object',
						'items' => array(
							'some_object_child' => array(
								'type'  => 'object',
								'items' => array(
									'some_object_2_grand_child_1' => array(
										'type'    => 'string',
										'default' => 'some_object_2_grand_child_1_text',
									),
									'some_object_2_grand_child_2'  => array(
										'type'    => 'string',
										'default' => 'some_object_2_grand_child_2_text',
									),
								),
							),
						),
					),
				),
				'correct' => array(
					'some_bool' => array(
						'type' => 'boolean',
					),
					'some_int' => array(
						'type' => 'integer',
					),
					'some_number' => array(
						'type' => 'number',
					),
					'some_array' => array(
						'type' => 'array',
					),
					'some_object_1'  => array(
						'type' => 'object',
						'properties' => array(
							'some_object_1_grand_child_1' => array(
								'type' => 'string',
							),
							'some_object_1_grand_child_2' => array(
								'type' => 'string',
							),
						),
					),
					'some_object_2'  => array(
						'type' => 'object',
						'properties' => array(
							'some_object_child' => array(
								'type' => 'object',
								'properties' => array(
									'some_object_2_grand_child_1' => array(
										'type' => 'string',
									),
									'some_object_2_grand_child_2' => array(
										'type' => 'string',
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
		print 'get_properties()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			$return  = VK_Blocks_Options::get_properties($test_value['option']);
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
						'items' => array(
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
						'items' => array(
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
