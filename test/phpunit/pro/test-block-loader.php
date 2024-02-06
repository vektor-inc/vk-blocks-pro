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
}
