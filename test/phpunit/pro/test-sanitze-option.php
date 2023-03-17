<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class SanitizeOptions extends WP_UnitTestCase {

	public function test_sanitize_options() {
		/**
		 * option値を追加した場合
		 * ・プラグインインストール初期状態
		 * ・他のoption値が保存されている状態から追加したoption値の初期値がmargeされるか
		 * ・全てのオプション値を変更した時
		 * の3つのテストを追加してください
		 *
		 * たとえば、次にoption値を追加するは
		 * 1.ライセンスキーのところのテストをコピー
		 * array(
		 * 	'option_check_target' => 'vk_blocks_pro_license_key',
		 * 	'option'  => array(
		 * 		'new_faq_accordion' => 'open',
		 * 		'balloon_border_width' => 2,
		 * 		'margin_unit' => 'px',
		 * 		'margin_size' => array(
		 * 			'lg' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 			'md' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 			'sm' => array(
		 * 				'mobile' => 1,
		 * 				'tablet' => 2,
		 * 				'pc' => 3,
		 * 			),
		 * 		),
		 * 		'load_separate_option' => true,
		 * 	),
		 * 	'correct' => null
		 * ),
		 * 2. その下に貼り付ける
		 * 3. optionにvk_blocks_pro_license_keyと保存される値を追加
		 * 4. option_check_targetに追加したoptionのキー、correctを新しいoptionの初期値を設定してください
		 */
		$test_data = array(
			// プラグインインストール初期状態
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
							'custom' => '',
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
							'custom' => '',
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
