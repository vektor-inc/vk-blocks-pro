<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class SanitizeOptions extends VK_UnitTestCase {

	public function test_sanitize_options() {
		$test_data = array(
			array(
				'options'  => array(
                    'margin_size' => array(
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc(var(--variable-width) + 20px)',
						),
						'lg' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc( var( --variable-width ) + 20px )',
						),
						'md' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc( var( --variable-width ) + 20px ); background: linear-gradient(to bottom, #ffffff, #000000); transform: translateX(100px);',
						),
						'sm' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'var( --wp--custom--spacing--xx--small )',
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc( aaa(2558) + aaa( 7635 ) )',
						),
					),
                ),
				'correct' => array(
					'margin_size' => array(
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc(var(--variable-width) + 20px)',
						),
						'lg' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc( var( --variable-width ) + 20px )',
						),
						'md' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'calc( var( --variable-width ) + 20px )',
						),
						'sm' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => 'var( --wp--custom--spacing--xx--small )',
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
							'custom' => '',
						),
					),
                )
            )
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'VK_Blocks_Options::sanitaize_options()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			$return  = VK_Blocks_Options::sanitaize_options( $test_value['options'] );
			$correct = $test_value['correct'];

            print 'correct ::::' . PHP_EOL;
            var_dump( $correct );
            print 'return  ::::' . PHP_EOL;
            var_dump( $return );

            

            $this->assertEquals( $correct, $return );
		}
	}
}
