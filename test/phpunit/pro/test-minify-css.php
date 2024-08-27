<?php
/**
 * Class minifyCssTest
 *
 * @package vk-blocks
 */

class minifyCssTest extends VK_UnitTestCase {

	public function test_vk_blocks_minify_css() {
		$test_data = array(
			// delete before after space.
			array(
				'css'  => ' .selector { color: white; }', // .selectorの前にスペース
				'correct' => '.selector { color: white; }',
			),
			// convert tab and br to space.
			array(
				'css'  => '.selector {
					color: white;
				}',
				'correct' => '.selector {color: white;}',
			),
			// multiple spaces to single space
			array(
				'css'  => '.selector { color:  white; }', // whiteの前に２つスペース
				'correct' => '.selector { color: white; }',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_minify_css()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			$return  = vk_blocks_minify_css( $test_value['css'] );
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
