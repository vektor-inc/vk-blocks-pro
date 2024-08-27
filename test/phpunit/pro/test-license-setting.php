<?php
/**
 * Class LicenseTest
 *
 * @package vk-blocks
 */


class LicenseSettingTest extends VK_UnitTestCase {

	public function test_vk_blocks_is_license_setting() {

        $test_data = array(
            array(
                'license_check' => 'exemption',
                'filter_hook'   => true,
                'correct'       => false,
            ),
            array(
                'license_check' => 'exemption',
                'filter_hook'   => false,
                'correct'       => false,
            ),
            array(
                'license_check' => 'empty',
                'filter_hook'   => true,
                'correct'       => true,
            ),
            array(
                'license_check' => 'empty',
                'filter_hook'   => false,
                'correct'       => true,
            ),
            array(
                'license_check' => 'invalid',
                'filter_hook'   => true,
                'correct'       => true,
            ),
            array(
                'license_check' => 'invalid',
                'filter_hook'   => false,
                'correct'       => true,
            ),
            array(
                'license_check' => 'valid',
                'filter_hook'   => true,
                'correct'       => true,
            ),
            array(
                'license_check' => 'valid',
                'filter_hook'   => false,
                'correct'       => false,
            ),
		);
		
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_is_license_setting()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
       
		foreach ( $test_data as $test_value ) {

			add_filter(
                'vk_blocks_license_key_display_setting',
                function() use ( $test_value ) {
                    return $test_value['filter_hook'];
                }
            );
			$return  = vk_blocks_is_license_setting( $test_value['license_check'] );
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