<?php
/**
 * Class PageContentBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * page-content block test case.
 */
class PageContentBlockTest extends WP_UnitTestCase {

	public $post_id; // PageContentブロックを挿入する投稿
	public $page_id; // PageContentブロックで表示する固定ページ

	// 各テストケースの実行直前に呼ばれる
	public function setUp() {
		parent::setUp();

		$page = array(
			'post_title'    => '固定ページ',
			'post_content'  => 'This is my page.',
			'post_type'     => 'page',
			'post_status'   => 'publish',
		);
		$this->page_id = wp_insert_post( $page );

		$post = array(
			'post_title'    => '投稿',
			'post_content'  => 'This is my post.',
			'post_status'   => 'publish',
		);
		$this->post_id = wp_insert_post( $post );
	}

	public function tearDown() {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_page_content() {

		$url = 'http://localhost:8888/index.php?rest_route=%2Fwp%2Fv2%2Fblock-renderer%2Fvk-blocks%2Fpage-content&context=edit&attributes%5BTargetPost%5D=' . intval($this->page_id) . '&attributes%5Bvkb_hidden%5D=false&attributes%5Bvkb_hidden_xxl%5D=false&attributes%5Bvkb_hidden_xl_v2%5D=false&attributes%5Bvkb_hidden_xl%5D=false&attributes%5Bvkb_hidden_lg%5D=false&attributes%5Bvkb_hidden_md%5D=false&attributes%5Bvkb_hidden_sm%5D=false&attributes%5Bvkb_hidden_xs%5D=false&post_id=' . intval($this->post_id) . '&_locale=user';
		// $url = 'http://localhost:8888/index.php?rest_route=%2Fwp%2Fv2%2Fposts%2F' . intval($this->post_id) . '&_locale=user';

		$args = [
			'headers' => [
				'content-type' => 'application/json'
			]
		];
		$response = wp_remote_get( $url, $args );

        $this->assertSame('2204', $response);

		// Replace this with some actual testing code.
		$this->assertTrue( true );
	}
}
