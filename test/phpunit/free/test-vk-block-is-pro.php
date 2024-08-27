<?php
/**
 * Class minifyCssTest
 *
 * @package vk-blocks
 */

class TestVKBlocksIsPro extends VK_UnitTestCase {

	public function test_vk_blocks_minify_css() {
        $path = dirname( dirname( dirname( dirname( __FILE__ ) ) ) );
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_vk_blocks_is_pro()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$return  = vk_blocks_is_pro();
		$correct = strpos( $path, 'vk-blocks-pro' ) !== false;
		print 'return  :' . PHP_EOL;
		var_dump( $return );
		print PHP_EOL;
		print 'correct  :' . PHP_EOL;
		var_dump( $correct );
		print PHP_EOL;
		$this->assertSame( $correct, $return );
	}
}