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
		$this->original_options = get_option( 'vk_blocks_options', array() );
		$this->toc_instance = VK_Blocks_TOC::init();
	}

	public function tearDown(): void {
		if ( ! empty( $this->original_options ) ) {
			update_option( 'vk_blocks_options', $this->original_options );
		} else {
			delete_option( 'vk_blocks_options' );
		}
		$this->toc_instance = null;
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
			return null;
		}, 10, 2 );
	}

	/**
	 * テスト用にオプション値とhas_blockモックを設定
	 */
	private function setup_test_environment( $has_block, $options = null ) {
		$this->set_has_block_mock( $has_block );
		if ( is_null( $options ) ) {
			delete_option( 'vk_blocks_options' );
		} else {
			update_option( 'vk_blocks_options', $options );
		}
	}

	/**
	 * 投稿とグローバル$postをセットアップする共通ヘルパー
	 */
	private function create_post_and_set_global($content) {
		$post_id = $this->factory->post->create([
			'post_content' => $content,
		]);
		global $post;
		$post = get_post($post_id);
		setup_postdata($post);
	}

	/**
	 * 共通のテスト実行関数
	 */
	private function run_toc_test($label, $input, $expected, $has_block, $options) {
		$this->setup_test_environment($has_block, $options);
		$this->create_post_and_set_global($input);

		$actual = VK_Blocks_TOC::get_headings_from_content($input);

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print $label . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected ::::' . json_encode($expected) . PHP_EOL;
		print 'actual   ::::' . json_encode($actual) . PHP_EOL;
		$this->assertEquals($expected, $actual);
		print PHP_EOL;
	}

	public function test_toc_patterns() {
		$cases = [
			// 基本的な見出し抽出テスト
			[
				'label' => 'test_extracts_headings_when_toc_exists',
				'input' => '<!-- wp:heading {"level":2} --><h2>h2</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>h3</h3><!-- /wp:heading -->',
				'expected' => [
					[2, '', 'h2'],
					[3, '', 'h3']
				],
				'has_block' => true,
				'options' => ['toc_heading_levels' => ['h2','h3']],
			],
			// TOCブロックが存在しない場合
			[
				'label' => 'test_extracts_headings_when_toc_not_exists',
				'input' => '<!-- wp:heading {"level":2} --><h2>h2</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>h3</h3><!-- /wp:heading -->',
				'expected' => [
					[2, '', 'h2'],
					[3, '', 'h3']
				],
				'has_block' => false,
				'options' => ['toc_heading_levels' => ['h2','h3','h4','h5','h6']],
			],
			// カスタム見出しレベル設定のテスト
			[
				'label' => 'test_extracts_headings_with_custom_levels',
				'input' => '<!-- wp:heading {"level":2} --><h2>h2</h2><!-- /wp:heading --><!-- wp:heading {"level":3} --><h3>h3</h3><!-- /wp:heading --><!-- wp:heading {"level":4} --><h4>h4</h4><!-- /wp:heading -->',
				'expected' => [
					[2, '', 'h2'],
					[3, '', 'h3'],
					[4, '', 'h4']
				],
				'has_block' => true,
				'options' => ['toc_heading_levels' => ['h2','h3']],
			],
			// border-boxブロック内の見出しのテスト
			[
				'label' => 'test_border_box_headings',
				'input' => '<!-- wp:vk-blocks/border-box --><div class="wp-block-vk-blocks-border-box"><!-- wp:heading {"level":4} --><h4>border box heading</h4><!-- /wp:heading --></div><!-- /wp:vk-blocks/border-box --><!-- wp:heading {"level":2} --><h2>normal h2</h2><!-- /wp:heading -->',
				'expected' => [
					[4, '', 'border box heading'],
					[2, '', 'normal h2']
				],
				'has_block' => true,
				'options' => ['toc_heading_levels' => ['h2','h3','h4']],
			],
			// blog-card-site-titleブロック内の見出しのテスト
			[
				'label' => 'test_blog_card_site_title_headings',
				'input' => '<!-- wp:vk-blocks/blog-card --><div class="wp-block-vk-blocks-blog-card"><!-- wp:vk-blocks/blog-card-site-title --><!-- wp:heading {"level":3} --><h3>site title</h3><!-- /wp:heading --><!-- /wp:vk-blocks/blog-card-site-title --></div><!-- /wp:vk-blocks/blog-card --><!-- wp:heading {"level":2} --><h2>normal h2</h2><!-- /wp:heading -->',
				'expected' => [
					[3, '', 'site title'],
					[2, '', 'normal h2']
				],
				'has_block' => true,
				'options' => ['toc_heading_levels' => ['h2','h3']],
			],
		];

		foreach ($cases as $case) {
			$this->run_toc_test(
				$case['label'],
				$case['input'],
				$case['expected'],
				$case['has_block'],
				$case['options']
			);
		}
	}
}