<?php
/**
 * Class GetHexToRgbaTest
 *
 * @package vk-blocks
 */

class GetHexToRgbaTest extends VK_UnitTestCase {

	public function test_vk_blocks_get_hex_to_rgba() {
		$test_data = array(
			array(
				'value'  => '#F0F0F1',
				'correct' => 'rgba(240, 240, 241, 0.7)',
			),
			array(
				'value'  => '#F00',
				'correct' => 'rgba(240, 0, 0, 0.7)',
			),
			array(
				'value'  => 'rgba(0,0,0,0.5)',
				'correct' => 'rgba(0,0,0,0.5)',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_hex_to_rgb()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			$return  = vk_blocks_get_hex_to_rgba( $test_value['value'], '0.7' );
			$correct = $test_value['correct'];

			// print 'return  :';
			// print PHP_EOL;
			// var_dump( $return );
			// print PHP_EOL;
			// print 'correct  :';
			// print PHP_EOL;
			// var_dump( $correct );
			// print PHP_EOL;
			$this->assertSame( $return, $correct );
		}
	}
}
