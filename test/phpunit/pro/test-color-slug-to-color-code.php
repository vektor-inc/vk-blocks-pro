<?php
/**
 * Class colorSlugToClorCodeTest
 *
 * @package vk-blocks
 */

class colorSlugToClorCodeTest extends VK_UnitTestCase {

	public function test_vk_blocks_get_color_code() {
		$test_data = array(
			array(
				'value'  => '#F0F0F1',
				'correct' => '#F0F0F1',
			),
			array(
				'value'  => 'black',
				'correct' => 'var(--wp--preset--color--black)',
			),
			array(
				'value'  => 'custom-',
				'correct' => 'var(--wp--preset--color--custom)',
			),
			array(
				'value'  => 'my--color',
				'correct' => 'var(--wp--preset--color--my-color)',
			),
			array(
				'value'  => 'custom---',
				'correct' => 'var(--wp--preset--color--custom)',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_color_code()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			$return  = vk_blocks_get_color_code( $test_value['value'] );
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
