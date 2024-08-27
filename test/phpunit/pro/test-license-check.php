<?php
/**
 * Class LicenseTest
 *
 * @package vk-blocks
 */


class LicenseCheckerTest extends VK_UnitTestCase {

	public function test_vk_blocks_license_check() {

        $test_data = array(
            // Katawara × 無料版
			array(
                'test_data' => array(
                    'template'    => 'katawara',
                    'is_pro'      => false,
                ),
				'correct' => 'exemption'
			),
            // Katawara × 有料版
			array(
                'test_data' => array(
                    'template'    => 'katawara',
                    'is_pro'      => true,
                ),
				'correct' => 'exemption'
			),
            // Lightning × 無料版
			array(
                'test_data' => array(
                    'template'    => 'lightning',
                    'is_pro'      => false,
                ),
				'correct' => 'exemption'
			),
            // Lightning × 有料版 × ライセンスキーなし
			array(
                'test_data' => array(
                    'template'    => 'lightning',
                    'is_pro'      => true,
                    'license_key' => '',               
                ),
				'correct' => 'empty'
			),
            // Lightning × 有料版 × 間違ったライセンスキー
            array(
                'test_data' => array(
                    'template'    => 'lightning',
                    'is_pro'      => true,
                    'license_key' => 'aaaaaaaa',               
                    'update'      => array(
                        'id'             => 0,
                        'homepage'       => 'https://www.vektor-inc.co.jp/',
                        'upgrade_notice' => null,
                        'homepage'       => '6.2.2',
                        'requires_php'   => null,
                        'icons'          => array(),
                        'filename'       => 'vk-blocks-pro/vk-blocks.php',
                        'slug'           => 'vk-blocks-pro',
                        'version'        => '1.58.0.0',
                        'download_url'   => null,
                        'translation'    => array(),
                    ),
                ),
				'correct' => 'invalid'
			),
            // Lightning × 有料版 × 正しいライセンスキー
            array(
                'test_data' => array(
                    'template'    => 'lightning',
                    'is_pro'      => true,
                    'license_key' => 'aaaaaaaa',               
                    'update'      => array(
                        'id'             => 0,
                        'homepage'       => 'https://www.vektor-inc.co.jp/',
                        'upgrade_notice' => null,
                        'homepage'       => '6.2.2',
                        'requires_php'   => null,
                        'icons'          => array(),
                        'filename'       => 'vk-blocks-pro/vk-blocks.php',
                        'slug'           => 'vk-blocks-pro',
                        'version'        => '1.58.0.0',
                        'download_url'   => 'https://www.vektor-inc.co.jp/service/wordpress-plugins/vk-blocks/',
                        'translation'    => array(),
                    ),
                ),
				'correct' => 'valid'
			),
		);
		
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_license_check()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
       
		foreach ( $test_data as $test_value ) {

			$return  = vk_blocks_license_check(  $test_value['test_data'] );
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