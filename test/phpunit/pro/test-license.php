<?php
/**
 * Class LicenseTest
 *
 * @package vk-blocks
 */

class LicenseTest extends VK_UnitTestCase {

	public function test_vk_blocks_get_license_check_query_arg() {
		$test_data = array(
			array(
				'option'  => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey',
				),
				'correct' => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey',
				),
			),
			array(
				'option'  => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey ', // 半角付き
				),
				'correct' => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey',
				),
			),
			array(
				'option'  => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey　', // 全角付き
				),
				'correct' => array(
					'vk_blocks_pro_license_key' => 'phpunittestlicensekey',
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_license_check_query_arg()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$query_args = array();
			$return  = vk_blocks_get_license_check_query_arg( $query_args );
			$correct = $test_value['correct'];

			print 'return  :';
			print PHP_EOL;
			var_dump( $return );
			print PHP_EOL;
			print 'correct  :';
			print PHP_EOL;
			var_dump( $correct );
			print PHP_EOL;
			$this->assertSame( $correct['vk_blocks_pro_license_key'], $return['vk-blocks-pro-license-key'] );

		}
	}
}
