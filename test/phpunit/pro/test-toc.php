<?php
/**
 * Class TOCTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Table of Contents block test case.
 */
class TOCBlockTest extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
		if ( ! class_exists( 'VK_Blocks_TOC' ) ) {
			require_once dirname( __FILE__, 4 ) . '/inc/vk-blocks-pro/blocks/class-vk-blocks-toc.php';
		}
	}

	/**
	 * has_block() をモックするためのヘルパー
	 */
	private function set_has_block_mock( $return ) {
		tests_add_filter( 'pre_has_block', function( $pre, $block_name ) use ( $return ) {
			if ( $block_name === 'vk-blocks/table-of-contents-new' ) {
				return $return;
			}
			return null; // WP本体の has_block() にフォールバック
		}, 10, 2 );
	}

	private function get_fresh_toc_instance( $has_block, $options = null ) {
		$this->set_has_block_mock( $has_block );
		VK_Blocks_TOC::$instance = null;
		if ( is_null( $options ) ) {
			delete_option( 'vk_blocks_options' );
		} else {
			update_option( 'vk_blocks_options', $options );
		}
		return VK_Blocks_TOC::init();
	}

	public function test_adds_data_attribute_when_toc_block_exists_and_default_levels() {
		global $post; $post = null;
		$toc = $this->get_fresh_toc_instance( true, array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4', 'h5', 'h6' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6><h1>h1</h1>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3><h4 data-vk-toc-heading>h4</h4><h5 data-vk-toc-heading>h5</h5><h6 data-vk-toc-heading>h6</h6><h1>h1</h1>';
		$this->assertEquals( $expected, $toc->mark_content_headings( $input ) );
	}

	public function test_does_not_add_attribute_when_toc_block_not_exists() {
		global $post; $post = null;
		$this->set_has_block_mock( false );
		VK_Blocks_TOC::$instance = null;
		update_option( 'vk_blocks_options', array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4', 'h5', 'h6' ) ) );
		$toc = VK_Blocks_TOC::init();
		$input = '<h2>h2</h2><h3>h3</h3>';
		$expected = '<h2>h2</h2><h3>h3</h3>';
		$this->assertEquals( $expected, $toc->mark_content_headings( $input ) );
	}

	public function test_respects_custom_heading_levels() {
		global $post; $post = null;
		$toc = $this->get_fresh_toc_instance( true, array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3><h4>h4</h4>';
        $expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3><h4 data-vk-toc-heading>h4</h4>';
		$this->assertEquals( $expected, $toc->mark_content_headings( $input ) );
	}

	public function test_default_levels_are_used_when_option_is_missing() {
		global $post; $post = null;
		$toc = $this->get_fresh_toc_instance( true, null );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3>';
		$this->assertEquals( $expected, $toc->mark_content_headings( $input ) );
	}

	public function test_does_not_affect_other_tags_or_existing_attributes() {
		global $post; $post = null;
		$toc = $this->get_fresh_toc_instance( true, array( 'tocHeadingLevels' => array( 'h2' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 class="foo">h2</h2><h3>h3</h3><p>p</p>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 class="foo" data-vk-toc-heading>h2</h2><h3>h3</h3><p>p</p>';
		$this->assertEquals( $expected, $toc->mark_content_headings( $input ) );
	}
} 