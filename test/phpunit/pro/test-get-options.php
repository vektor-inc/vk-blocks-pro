<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class GetOptionsTest extends WP_UnitTestCase {

	public function test_vk_blocks_get_options() {
		$default_data = array(
			'balloon_border_width' => 1,
			'margin_unit' => 'rem',
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
			'load_separate_option' => false,
			'text_style' => array(
				array(
					'index'              => 1,
					'title'              => null,
					'active'             => false,
					'font_weight_bold'   => false,
					'font_italic'        => false,
					'font_strikethrough' => false,
					'color'              => null,
					'background_color'   => null,
					'active_highlighter' => false,
					'highlighter'        => '#fffd6b',
					'font_size'          => null,
					'nowrap'             => false,
					'class_name'         => null,
				),
			),
			'vk_blocks_pro_license_key' => null,
			'display_vk_block_template' => 'display',
			'new_faq_accordion' => 'disable',
		);
		$select_data = array(
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
			'text_style' => array(
				array(
					'index'              => 2,
					'title'              => "書式設定１",
					'active'             => true,
					'font_weight_bold'   => true,
					'font_italic'        => true,
					'font_strikethrough' => true,
					'color'              => "#fff",
					'background_color'   => null,
					'active_highlighter' => true,
					'highlighter'        => '#fff',
					'font_size'          => '16px',
					'nowrap'             => true,
					'class_name'         => null,
				),
			),
			'vk_blocks_pro_license_key' => null,
			'display_vk_block_template' => 'display',
			'new_faq_accordion' => 'open',
		);
		$test_data = array(
			array(
				'option'  => null,
				'correct' => $default_data,
			),
			array(
				'option'  => $select_data,
				'correct' => $select_data,
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_options()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$return  = vk_blocks_get_options();
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
