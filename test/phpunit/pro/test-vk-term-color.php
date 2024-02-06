<?php
/**
 * Class PostListBlockTest
 *
 * @package Vk_Blocks_Pro
 */
use VektorInc\VK_Term_Color\VkTermColor;
/**
 * Post List block test case.
 */
class VkTermColorTest extends VK_UnitTestCase {

	/**
	 * PostListブロックを挿入する投稿
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $post_id;

	/**
	 * カテゴリーID
	 */
	public $category_id;

	/**
	 * メタ情報ID
	 */
	public $meta_id;

	/**
	 * 設定する色
	 */
	public $term_color = "#123456";
	
	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function set_up(): void {
		parent::set_up();

		// テストカテゴリーを作成
		$catarr                           = array(
			'cat_name' => 'test_category',
		);
		$this->category_id = wp_insert_category( $catarr );

		// テスト投稿を作成
		$post          = array(
			'post_title'   => 'Post Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my post</p><!-- /wp:paragraph -->',
			'post_status'  => 'publish',
			'post_category' => array( $this->category_id ),
		);
		$this->post_id = self::factory()->post->create( $post );

		// 色を設定
		$this->meta_id = add_term_meta( $this->category_id, 'term_color', $this->term_color );

	}

	

	/**
	 * A single example test.
	 */
	public function test_get_single_term_with_color() {

		$tests = array(

			array(
				'args' => array(),
				'correct' => '<span style="color:#fff;background-color:' . $this->term_color . '">test_category</span>'
			),

			array(
				'args' => array(
					'link' => true
				),
				'correct' => '<a style="color:#fff;background-color:' . $this->term_color . '" href="' . home_url() . '/?cat=' . $this->category_id . '">test_category</a>'
			),

			array(
				'args' => array(
					'class' => 'vk_post_imgOuter_singleTermLabel',
					'link' => true
				),
				'correct' => '<a class="vk_post_imgOuter_singleTermLabel" style="color:#fff;background-color:' . $this->term_color . '" href="' . home_url() . '/?cat=' . $this->category_id . '">test_category</a>'
			)
		);


		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'VkTermColor::test_get_single_term_with_color' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$post = get_post( $this->post_id );

		// 通常のテスト
		foreach ( $tests as $test ) {
			$result = VkTermColor::get_single_term_with_color( $post, $test['args'] );
			print 'correct ::::' . PHP_EOL;
			var_dump( $test['correct'] );
			print 'return  ::::' . PHP_EOL;
			var_dump( $result );
		}

		// 従来のクラス名で呼ばれた場合も同じ挙動をすることをテスト
		foreach ( $tests as $test ) {
			$result = Vk_term_color::get_single_term_with_color( $post, $test['args'] );
			print 'correct ::::' . PHP_EOL;
			var_dump( $test['correct'] );
			print 'return  ::::' . PHP_EOL;
			var_dump( $result );
			$this->assertEquals( $test['correct'], $result );
		}		
	}
};
