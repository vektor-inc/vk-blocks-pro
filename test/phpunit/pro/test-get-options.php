<?php
/**
 * Class GetOptionsTest
 *
 * @package vk-blocks
 */

class GetOptionsTest extends WP_UnitTestCase {

	public function test_vk_blocks_get_options() {
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
		 * 		'display_vk_block_template' => 'hide',
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
				'option'  => null,
				'correct' => array(
					'balloon_border_width' => 1,
					'margin_unit' => 'rem',
					'margin_size' => array(
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'lg' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'md' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'sm' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
					),
					'load_separate_option' => false,
					'vk_blocks_pro_license_key' => null,
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'disable',
				),
			),
			// デフォルトの表示非表示調整 v0.44.13
			// https://github.com/vektor-inc/vk-blocks-pro/commit/b17c2ae4097a5530eb88a7fdcf03885d89ece643#diff-9b75d117946ae115e35175fb160346351a75f98e850679a65de42680bd4611e1
			array(
				'option_check_target' => 'display_vk_block_template',
				'option'  => array(
					'hide_wp_block_template' => true,
					'hide_vk_block_template' => false,
				),
				'correct' => 'display',
			),
			// hide_wp_block_template,hide_vk_block_templateは廃止されたので以降のテストでは追加していない

			// New FAQ アコーディオン機能 v0.46.0
			// https://github.com/vektor-inc/vk-blocks-pro/pull/21
			array(
				'option_check_target' => 'new_faq_accordion',
				'option'  => array(
					'display_vk_block_template' => 'hide',
				),
				'correct' => 'disable',
			),
			// 吹き出し線の太さ v0.55.0
			// https://github.com/vektor-inc/vk-blocks-pro/commit/e0ede110ada73f0eb65af611382d899469b8d84b
			array(
				'option_check_target' => 'balloon_border_width',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
				),
				'correct' => 1,
			),
			// 余白 単位 margin_unit v1.7.1
			// https://github.com/vektor-inc/vk-blocks-pro/pull/584/
			array(
				'option_check_target' => 'margin_unit',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
				),
				'correct' => 'rem'
			),
			// 余白の共通サイズ設定 margin_size v1.7.1
			// https://github.com/vektor-inc/vk-blocks-pro/pull/584/
			array(
				'option_check_target' => 'margin_size',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
				),
				'correct' => array(
					'lg' => array(
						'mobile' => null,
						'tablet' => null,
						'pc' => null,
					),
					'md' => array(
						'mobile' => null,
						'tablet' => null,
						'pc' => null,
					),
					'sm' => array(
						'mobile' => null,
						'tablet' => null,
						'pc' => null,
					),
				),
			),
			// 分割読み込み load_separate_option v1.21.0
			// https://github.com/vektor-inc/vk-blocks-pro/commit/b6f3575cb2ebcb4e64ecb8070b81ccd391abc13c
			array(
				'option_check_target' => 'load_separate_option',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
				),
				'correct' => false
			),
			// ライセンスキー v1.32.0
			// https://github.com/vektor-inc/vk-blocks-pro/pull/1166
			array(
				'option_check_target' => 'vk_blocks_pro_license_key',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
				),
				'correct' => null
			),
			// margin_sizeのlg,md,smに値が設定されているときに、xl,xsが追加された場合
			array(
				'option_check_target' => 'margin_size',
				'option'  => array(
					'display_vk_block_template' => 'hide',
					'new_faq_accordion' => 'open',
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
				),
				'correct' => array(
					'margin_size' => array(
						'xl' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'xs' => array(
							'mobile' => null,
							'tablet' => null,
							'pc' => null,
						),
					),
				),
			),
			// 全てのオプション値を変更した時
			array(
				'option'  => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'open',
				),
				'correct' => array(
					'balloon_border_width' => 2,
					'margin_unit' => 'px',
					'margin_size' => array(
						'lg' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'md' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
						'sm' => array(
							'mobile' => 1,
							'tablet' => 2,
							'pc' => 3,
						),
					),
					'load_separate_option' => true,
					'vk_blocks_pro_license_key' => 'test_license_key',
					'display_vk_block_template' => 'display',
					'new_faq_accordion' => 'open',
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_options()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {

			if ( empty( $test_value['option'] ) ){
				delete_option( 'vk_blocks_options' );
			} else {
				update_option( 'vk_blocks_options', $test_value['option'] );
			}

			$return  = vk_blocks_get_options();
			$correct = $test_value['correct'];

			// print 'return  :';
			// print PHP_EOL;
			// var_dump( $return );
			// print PHP_EOL;
			// print 'correct  :';
			// print PHP_EOL;
			// var_dump( $correct );
			// print PHP_EOL;

			if ( $test_value['option_check_target'] ) {
				$this->assertSame( $correct, $return[ $test_value['option_check_target'] ] );
			} else {
				$this->assertSame( $correct, $return );
			}

			// 他のテストに影響が出ないようにオプション値を削除する
			delete_option( 'vk_blocks_options' );

		}
	}
}
