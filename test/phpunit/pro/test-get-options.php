<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class GetOptionsTest extends WP_UnitTestCase {

	public function test_vk_blocks_get_options() {
		$test_data = array(
			array(
				'option'  => null,
				'correct' => array(
					'balloon_border_width' => 1,
					'margin_unit' => 'rem',
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'disable',
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
					'vk_blocks_pro_license_key' => null,
				),
			),
			array(
				'option'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'open',
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
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'open',
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

			print 'return  :';
			print PHP_EOL;
			var_dump( $return );
			print PHP_EOL;
			print 'correct  :';
			print PHP_EOL;
			var_dump( $correct );
			print PHP_EOL;
			$this->assertSame( $correct, $return );

		}
	}
}
