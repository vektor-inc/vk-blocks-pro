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

	/**
	 * @var VK_Blocks_TOC|null TOCインスタンス
	 */
	private $toc_instance;

	/**
	 * @var array 元のオプション値を保存
	 */
	private $original_options;

	public function setUp(): void {
		parent::setUp();

		// 元のオプション値を保存
		$this->original_options = get_option( 'vk_blocks_options', array() );

		// TOCインスタンスを取得
		$this->toc_instance = VK_Blocks_TOC::init();
	}

	public function tearDown(): void {
		// オプション値を元に戻す
		if ( ! empty( $this->original_options ) ) {
			update_option( 'vk_blocks_options', $this->original_options );
		} else {
			delete_option( 'vk_blocks_options' );
		}

		$this->toc_instance = null;

		// フィルターをリセット
		remove_all_filters( 'pre_has_block' );

		parent::tearDown();
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

			/**
	 * テスト用にオプション値とhas_blockモックを設定
	 *
	 * @param bool $has_block TOCブロックが存在するかどうか
	 * @param array|null $options vk_blocks_optionsの設定値
	 */
	private function setup_test_environment( $has_block, $options = null ) {
		$this->set_has_block_mock( $has_block );

		// オプション設定
		if ( is_null( $options ) ) {
			delete_option( 'vk_blocks_options' );
		} else {
			update_option( 'vk_blocks_options', $options );
		}
	}

	public function test_adds_data_attribute_when_toc_block_exists_and_default_levels() {
		global $post; $post = null;
		$this->setup_test_environment( true, array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4', 'h5', 'h6' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3><h4>h4</h4><h5>h5</h5><h6>h6</h6><h1>h1</h1>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3><h4 data-vk-toc-heading>h4</h4><h5 data-vk-toc-heading>h5</h5><h6 data-vk-toc-heading>h6</h6><h1>h1</h1>';
		$actual = $this->toc_instance->mark_content_headings( $input );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_adds_data_attribute_when_toc_block_exists_and_default_levels' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . $expected . PHP_EOL;
		print 'actual   ::::' . $actual . PHP_EOL;
		$this->assertEquals( $expected, $actual );
		print PHP_EOL;
	}

	public function test_does_not_add_attribute_when_toc_block_not_exists() {
		global $post; $post = null;
		$this->setup_test_environment( false, array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4', 'h5', 'h6' ) ) );
		$input = '<h2>h2</h2><h3>h3</h3>';
		$expected = '<h2>h2</h2><h3>h3</h3>';
		$actual = $this->toc_instance->mark_content_headings( $input );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_does_not_add_attribute_when_toc_block_not_exists' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . $expected . PHP_EOL;
		print 'actual   ::::' . $actual . PHP_EOL;
		$this->assertEquals( $expected, $actual );
		print PHP_EOL;
	}

	public function test_respects_custom_heading_levels() {
		global $post; $post = null;
		$this->setup_test_environment( true, array( 'tocHeadingLevels' => array( 'h2', 'h3', 'h4' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3><h4>h4</h4>';
        $expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3><h4 data-vk-toc-heading>h4</h4>';
		$actual = $this->toc_instance->mark_content_headings( $input );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_respects_custom_heading_levels' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . $expected . PHP_EOL;
		print 'actual   ::::' . $actual . PHP_EOL;
		$this->assertEquals( $expected, $actual );
		print PHP_EOL;
	}

	public function test_default_levels_are_used_when_option_is_missing() {
		global $post; $post = null;
		$this->setup_test_environment( true, null );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2>h2</h2><h3>h3</h3>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 data-vk-toc-heading>h2</h2><h3 data-vk-toc-heading>h3</h3>';
		$actual = $this->toc_instance->mark_content_headings( $input );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_default_levels_are_used_when_option_is_missing' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . $expected . PHP_EOL;
		print 'actual   ::::' . $actual . PHP_EOL;
		$this->assertEquals( $expected, $actual );
		print PHP_EOL;
	}

	public function test_does_not_affect_other_tags_or_existing_attributes() {
		global $post; $post = null;
		$this->setup_test_environment( true, array( 'tocHeadingLevels' => array( 'h2' ) ) );
		$input = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 class="foo">h2</h2><h3>h3</h3><p>p</p>';
		$expected = '<!-- wp:vk-blocks/table-of-contents-new /--><h2 class="foo" data-vk-toc-heading>h2</h2><h3>h3</h3><p>p</p>';
		$actual = $this->toc_instance->mark_content_headings( $input );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_does_not_affect_other_tags_or_existing_attributes' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . $expected . PHP_EOL;
		print 'actual   ::::' . $actual . PHP_EOL;
		$this->assertEquals( $expected, $actual );
		print PHP_EOL;
	}
}