<?php
/**
 * Class VKBlocksOptionsTest
 *
 * @package vk-blocks
 */

class VKBlocksOptionsTest extends VK_UnitTestCase {

	public function test_get_deprecated_lists() {
		$test_data = array(
			array(
				'correct' => array(
					'vk-blocks/heading',
					'vk-blocks/pr-blocks',
					'vk-blocks/pr-content',
					'vk-blocks/staff',
					'vk-blocks/card',
					'vk-blocks/icon-card',
				),
			),
		);
		
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'get_deprecated_lists()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			$return  = VK_Blocks_Options::get_deprecated_lists();
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
