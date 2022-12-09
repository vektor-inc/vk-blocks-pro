<?php
/**
 * Class CustomCssExtensionTest
 *
 * @package vk-blocks
 */

class CustomCssExtensionTest extends WP_UnitTestCase {

	public function test_should_load_separate_assets() {

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
        $count = 1;
		foreach ( $test_data as $test_value ) {
            $correct = sprintf($test_value['correct'], $count);
			$return  = vk_blocks_render_custom_css($test_value['block_content'], $block);
			$this->assertSame( $correct, $return );
            $count++;
		}
	}
}
