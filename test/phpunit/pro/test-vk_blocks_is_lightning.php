<?php
/**
 * Class IsLightningTest
 *
 * @package vk-blocks
 */

class IsLightningTest extends VK_UnitTestCase {

	public function test_vk_blocks_is_lightning() {
		$test_data = array(
			array(
				'option'  => array(
					'theme' => 'lightning',
				),
				'correct' => true,
			),
			array(
				'option'  => array(
					'theme' => 'x-t9',
				),
				'correct' => false,
			),
			// lightningからxt-9のライブプレビューを行う
			array(
				'option'  => array(
					'theme' => 'lightning',
					'target_url' => admin_url() . '/site-editor.php?wp_theme_preview=x-t9',
				),
				'correct' => false,
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_is_lightning()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( ! empty( $test_value['option']['theme'] ) ){
				switch_theme( $test_value['option']['theme'] );
			}

			if ( ! empty( $test_value['option']['target_url'] ) ){
				$this->go_to( $test_value['option']['target_url'] );
			}

			$return  = vk_blocks_is_lightning();
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
