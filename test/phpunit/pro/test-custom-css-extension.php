<?php
/**
 * Class CustomCssExtensionTest
 *
 * @package vk-blocks
 */

class CustomCssExtensionTest extends VK_UnitTestCase {

	public function test_block_content_preg_replace() {

		// ブロックコンテナのCSSクラス内のvk_custom_cssだけを変える。ブロックコンテンツ内のspan class内の vk_custom_cssは変更しないようにする。
		// correct内 %d の箇所が連番になります。
		$test_data = array(

			// ブロックCSSクラスの先頭に vk_custom_css が来るパターン、かつ内側のspan classの中身のパターンを変える
			array(
				'block_content' => '<p class="vk_custom_css vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_custom_css_%d vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),
			array(
				'block_content' => '<p class="vk_custom_css vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_custom_css_%d vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),  
			array(
				'block_content' => '<p class="vk_custom_css vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_custom_css_%d vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),  
			array(
				'block_content' => '<p class="vk_custom_css vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_custom_css_%d vk_test_1">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),          

			// ブロックCSSクラスの真ん中に vk_custom_css が来るパターン、かつ内側のspan classの中身のパターンを変える
			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),

			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),            

			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),            

			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d vk_test_2">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),   

			// ブロックCSSクラスの最後に vk_custom_css が来るパターン、かつ内側のspan classの中身のパターンを変える
			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),
			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),	           
			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="vk_test_3 vk_custom_css vk_test_4">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),
			array(
				'block_content' => '<p class="vk_test_1 vk_custom_css">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
				'correct' => '<p class="vk_test_1 vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="vk_custom_css vk_test_3">consectetur adipisci elit</span>, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>',
			),	            

			// CSS構文で > や : が正しく処理されるかのテスト
			array(
				'block_content' => '<p class="vk_custom_css">Lorem ipsum dolor sit amet, <span class="selector > p">consectetur adipisci elit</span></p>',
				'correct' => '<p class="vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="selector > p">consectetur adipisci elit</span></p>',
			),
			array(
				'block_content' => '<p class="vk_custom_css">Lorem ipsum dolor sit amet, <span class="selector:after">consectetur adipisci elit</span></p>',
				'correct' => '<p class="vk_custom_css_%d">Lorem ipsum dolor sit amet, <span class="selector:after">consectetur adipisci elit</span></p>',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_render_custom_css()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		$block = array(
			'blockName' => 'core/paragraph',
			'attrs' => array(
				'vkbCustomCss' => 'selector { color: red; }'
			)
		);
	
		// vk_blocks_render_custom_css は wp_unique_id で ナンバリングしているので、wp_unique_id で帰ってきた値に1足したものと比較するようにする
		foreach ( $test_data as $test_value ) {
			$return  = vk_blocks_render_custom_css($test_value['block_content'], $block);
			VkCustomAssert::assertStringMatchesNumericFormat($test_value['correct'], $return);
		}
	}
	
	public function test_footer_output_custom_css() {
		global $vk_blocks_custom_css_collection;
	
		// 初期化
		$vk_blocks_custom_css_collection = '';
	
		// ブロックの設定
		$block = array(
			'blockName' => 'core/paragraph',
			'attrs'     => array(
				'vkbCustomCss' => 'selector > p { color: red; }',
			),
		);
	
		// カスタムCSSをレンダリングして蓄積
		$block_content = '<p class="vk_custom_css">This is a test block.</p>';
		vk_blocks_render_custom_css( $block_content, $block );
	
		// 出力をキャプチャ
		ob_start();
		vk_blocks_output_custom_css();
		$output = ob_get_clean();
	
		// 正規表現を使用して柔軟なアサーション
		$expected_pattern = '/<style id="vk-blocks-custom-css">\.vk_custom_css_\d+ > p { color: red; }<\/style>/';
		$this->assertMatchesRegularExpression( $expected_pattern, $output );
	
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_output_custom_css() Test' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'Actual Output: ' . $output . PHP_EOL;
	}

	public function test_vk_blocks_sanitize_custom_css() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_sanitize_custom_css() Test' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
	
		$tests = array(
			array(
				'name'     => 'ふつう',
				'css'      => '.selector { color: red; }',
				'expected' => '.selector { color: red; }',
			),
			array(
				'name'     => ': あり',
				'css'      => '.selector:before { color: red; }',
				'expected' => '.selector:before { color: red; }',
			),
			array(
				'name'     => '::あり',
				'css'      => '.selector::before { color: red; }',
				'expected' => '.selector::before { color: red; }',
			),
			array(
				'name'     => ' > あり',
				'css'      => '.selector:before > p { color: red; }',
				'expected' => '.selector:before > p { color: red; }',
			),
			array(
				'name'     => '@mediaクエリ',
				'css'      => '@media (max-width: 600px) { .responsive { font-size: 14px; } }',
				'expected' => '@media (max-width: 600px) { .responsive { font-size: 14px; } }',
			),
			array(
				'name'     => 'アニメーション',
				'css'      => '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate { animation: fadeIn 2s; }',
				'expected' => '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate { animation: fadeIn 2s; }',
			),
			array(
				'name'     => '属性セレクタ',
				'css'      => 'input[type="text"] { border: 1px solid #000; }',
				'expected' => 'input[type="text"] { border: 1px solid #000; }',
			),
			array(
				'name'     => '隣接セレクタ',
				'css'      => '.item + .item { margin-top: 10px; }',
				'expected' => '.item + .item { margin-top: 10px; }',
			),
			array(
				'name'     => '疑似クラス・疑似要素',
				'css'      => 'ul li:nth-child(2n+1) { background-color: lightgray; } a::after { content: " ↗"; }',
				'expected' => 'ul li:nth-child(2n+1) { background-color: lightgray; } a::after { content: " ↗"; }',
			),
			array(
				'name'     => '重要なスタイル',
				'css'      => '.important { color: black !important; }',
				'expected' => '.important { color: black !important; }',
			),
			array(
				'name'     => 'カスタムプロパティ',
				'css'      => ':root { --main-bg-color: coral; } .var-usage { background-color: var(--main-bg-color); }',
				'expected' => ':root { --main-bg-color: coral; } .var-usage { background-color: var(--main-bg-color); }',
			),
			array(
				'name'     => '複数設定',
				'css'      => '.mulch-line { color: pink; font-size: 2rem; }',
				'expected' => '.mulch-line { color: pink; font-size: 2rem; }',
			),
			array(
				'name'     => 'XSS',
				'css'      => '<script>location.href="https://www.youtube.com/"</script>',
				'expected' => '',
			),
		);
	
		foreach ( $tests as $test ) {
			$actual = vk_blocks_sanitize_custom_css( $test['css'] );
			$this->assertEquals( $test['expected'], $actual, $test['name'] );
		}
	}
	
}
