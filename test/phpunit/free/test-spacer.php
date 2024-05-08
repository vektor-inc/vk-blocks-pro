<?php
/**
 * Class VKBSpacerTest
 *
 * @package Vk_Blocks_Pro
 */

use SebastianBergmann\Type\NullType;

/**
 * Post List block test case.
 */
class VKBSpacerTest extends VK_UnitTestCase {

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function test_vk_blocks_get_spacer_size() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_get_spacer_size' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$test_array = array(
			array(
				'options' => array(
					'margin_size' => '',
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => null,
			),
			array(
				'options' => array(
					'margin_size' => null,
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => null,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => 2 ),
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => 2,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'mobile' => 3 ) ),
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => 3,
			),
			// スペーサーサイズがどれかの端末で指定されていたら、他のスペーサーサイズ未指定の時
			// tablet -> pc -> mobile の順で自動適用する.
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'mobile' => 3 ) ),
				),
				'size'    => 'md',
				'device'  => 'pc',
				'correct' => 3,
			),
			// スペーサーサイズがどれかの端末で指定されていたら、他のスペーサーサイズ未指定の時
			// tablet -> pc -> mobile の順で自動適用する.
			// モバイルのサイズが欲しい / PCとタブが指定されているので tabletが優先される.
			array(
				'options' => array(
					'margin_size' => array(
						'md' => array(
							'pc'     => 3,
							'tablet' => 2,
						),
					),
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => 2,
			),
			// 0指定の時にちゃんと0で返ってくるかどうか？
			array(
				'options' => array(
					'margin_size' => array( 'md' => 0 ),
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => 0,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'mobile' => 0 ) ),
				),
				'size'    => 'md',
				'device'  => 'mobile',
				'correct' => 0,
			),
			// カスタム
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'custom' => 'var(--wp--custom--spacing--xx-small)' ) ),
				),
				'size'    => 'md',
				'device'  => 'custom',
				'correct' => 'var(--wp--custom--spacing--xx-small)',
			),

		);

		foreach ( $test_array as $value ) {
			$return = vk_blocks_get_spacer_size( $value['options'], $value['size'], $value['device'] );
			print 'return  :' . esc_attr( $return ) . PHP_EOL;
			print 'correct :' . esc_attr( $value['correct'] ) . PHP_EOL;
			$this->assertEquals( $value['correct'], $return );
		}
	}

	/**
	 * サイズのCSSを出力するかどうかのテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_is_size_print() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_is_size_print' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$test_array = array(
			array(
				'options' => array(
					'margin_size' => array( 'md' => 2 ),
				),
				'device'  => 'mobile',
				'correct' => true,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'mobile' => 3 ) ),
				),
				'device'  => 'mobile',
				'correct' => true,
			),
			// 0指定の時
			array(
				'options' => array(
					'margin_size' => array( 'md' => 0 ),
				),
				'device'  => 'mobile',
				'correct' => true,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => array( 'mobile' => 0 ) ),
				),
				'device'  => 'mobile',
				'correct' => true,
			),
			/*********************************
			 * 出力しない（false）のケース.
			 */
			array(
				'options' => array(
					'margin_size' => null,
				),
				'device'  => 'pc',
				'correct' => false,
			),
			array(
				'options' => array(
					'margin_size' => array( 'md' => null ),
				),
				'device'  => 'pc',
				'correct' => false,
			),
		);

		foreach ( $test_array as $value ) {
			$return = vk_blocks_is_size_print( $value['options'], $value['device'] );
			print 'return  :' . esc_attr( $return ) . PHP_EOL;
			print 'correct :' . esc_attr( $value['correct'] ) . PHP_EOL;
			$this->assertEquals( $value['correct'], $return );
		}
	}

	/**
	 * スペーサーサイズのCSS変数のスタイルを取得するテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_get_spacer_size_style() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_get_spacer_size_style' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$test_array = array(
			array(
				'options'     => array(
					'margin_size' => array( 'md' => array( 'mobile' => 3 ) ),
				),
				'unit'        => 'em',
				'spacer_size' => 'md',
				'device'      => 'mobile',
				'correct'     => '--vk-margin-md:3em;',
			),
			array(
				'options'     => array(
					'margin_size' => array( 'md' => null ),
				),
				'unit'        => 'em',
				'spacer_size' => 'md',
				'device'      => 'mobile',
				'correct'     => '',
			),
		);

		foreach ( $test_array as $value ) {
			$return = vk_blocks_get_spacer_size_style( $value['options'], $value['spacer_size'], $value['device'], $value['unit'] );
			print 'return  :' . esc_attr( $return ) . PHP_EOL;
			print 'correct :' . esc_attr( $value['correct'] ) . PHP_EOL;
			$this->assertEquals( $value['correct'], $return );
		}
	}

	/**
	 * スペーサーサイズのCSS変数のスタイルを取得するテスト
	 *
	 * @return void
	 */
	public function test_vk_blocks_get_spacer_size_style_all() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_get_spacer_size_style' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$test_array = array(
			array(
				'options'     => array(
					'margin_size' => array(
						'xxs' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => 1,
							'custom' => ''
						),
						'xs' => array(
							'pc'     => null,
							'tablet' => null,
							'mobile' => null,
							'custom' => ''
						),
						'sm' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => 1,
							'custom' => ''
						),
						'md' => array(
							'pc'     => null,
							'tablet' => 2,
							'mobile' => 1,
							'custom' => ''
						),
						'lg' => array(
							'pc'     => 3,
							'tablet' => null,
							'mobile' => 1,
							'custom' => ''
						),
						'xl' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => null,
							'custom' => ''
						),
						'xxl' => array(
							'pc'     => 3,
							'tablet' => null,
							'mobile' => null,
							'custom' => ''
						),
					),
					'margin_unit' => 'rem'
				),
				'correct'     => '@media (max-width: 575.98px) {:root,body{--vk-margin-xxs:1rem;--vk-margin-sm:1rem;--vk-margin-md:1rem;--vk-margin-lg:1rem;--vk-margin-xl:2rem;--vk-margin-xxl:3rem;}}@media (min-width: 576px) and (max-width: 991.98px) {:root,body{--vk-margin-xxs:2rem;--vk-margin-sm:2rem;--vk-margin-md:2rem;--vk-margin-lg:3rem;--vk-margin-xl:2rem;--vk-margin-xxl:3rem;}}@media (min-width: 992px) {:root,body{--vk-margin-xxs:3rem;--vk-margin-sm:3rem;--vk-margin-md:2rem;--vk-margin-lg:3rem;--vk-margin-xl:3rem;--vk-margin-xxl:3rem;}}',
			),
			array(
				'options'     => array(
					'margin_size' => array(
						'xxs' => array(
							'pc'     => null,
							'tablet' => null,
							'mobile' => 1,
							'custom' => 'var( --aaa-xxs )'
						),
						'xs' => array(
							'pc'     => null,
							'tablet' => null,
							'mobile' => null,
							'custom' => 'var( --aaa-xs )'
						),
						'sm' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => 1,
							'custom' => 'var( --aaa-sm )'
						),
						'md' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => null,
							'custom' => 'var( --aaa-md )'
						),
						'lg' => array(
							'pc'     => 3,
							'tablet' => null,
							'mobile' => 2,
							'custom' => 'var( --aaa-lg )'
						),
						'xl' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => null,
							'custom' => 'var( --aaa-xl )'
						),
						'xxl' => array(
							'pc'     => 3,
							'tablet' => 2,
							'mobile' => 1,
							'custom' => 'var( --aaa-xxl )'
						),
					),
					'margin_unit' => 'rem'
				),
				'correct'     => ':root,body{--vk-margin-xxs:var( --aaa-xxs );--vk-margin-xs:var( --aaa-xs );--vk-margin-sm:var( --aaa-sm );--vk-margin-md:var( --aaa-md );--vk-margin-lg:var( --aaa-lg );--vk-margin-xl:var( --aaa-xl );--vk-margin-xxl:var( --aaa-xxl );}',
			),
		);

		foreach ( $test_array as $value ) {
			$return  = vk_blocks_get_spacer_size_style_all( $value['options'] );
			// 書式を統一化
			$return = str_replace( "'", '"', $return );
			$return = str_replace( "  ", " ", $return );
			$return = str_replace( " >", ">", $return );
			// delete before after space.
			$return = trim($return );
			// convert tab and br to space.
			$return = preg_replace( '/[\n\r\t]/', '', $return );
			// Change multiple spaces to single space.
			$return = preg_replace( '/\s(?=\s)/', '', $return );
			$correct = $value['correct'];
			print 'return  :' . esc_attr( $return ) . PHP_EOL;
			print 'correct :' . esc_attr( $correct ) . PHP_EOL;
			$this->assertEquals( $correct, $return );
		}
	}

};
