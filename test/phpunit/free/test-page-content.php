<?php
/**
 * Class PageContentBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Page Content block test case.
 * * Test_Page_Content で同じ内容を行っているので、1.95.0 リリース以降 PageContentBlockTest は削除
 */
class PageContentBlockTest extends VK_UnitTestCase {

	/**
	 * PageContentブロックで表示する固定ページ
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp(): void {
		parent::setUp();

		$page          = array(
			'post_title'   => 'Page Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
			'post_type'    => 'page',
			'post_status'  => 'publish',
		);
		$this->page_id = wp_insert_post( $page );
	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown(): void {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_page_content() {
		$attributes = array(
			'name'       => 'vk-blocks/page-content',
			'className'  => '',
			'TargetPost' => $this->page_id,
		);

		$this->set_current_user( 'administrator' );

		WP_Block_Supports::init();
		WP_Block_Supports::$block_to_render =  array('blockName'=> $attributes['name'], 'attrs' => $attributes );

		$actual   = vk_blocks_page_content_render_callback( $attributes );
		$expected = vk_blocks_unescape_html( '<div class=\"vk_pageContent vk_pageContent-id-' . intval( $this->page_id ) . ' wp-block-vk-blocks-page-content\"><p>This is my page.<\/p><\/div><a href=\"' . admin_url() . 'post.php?post=' . intval( $this->page_id ) . '&#038;action=edit\" class=\"vk_pageContent_editBtn btn btn-outline-primary btn-sm veu_adminEdit\" target=\"_blank\">' . __( 'Edit this area', 'vk-blocks-pro' ) . '<\/a>' );

		$this->assertEquals( $expected, $actual );
	}
}

class Test_Page_Content extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();

		// テスト用の固定ページを作成
		$this->public_page_id = $this->factory->post->create( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => 'Public Page',
			'post_content' => 'This is a public page.',
		) );

		$this->private_page_id = $this->factory->post->create( array(
			'post_type'   => 'page',
			'post_status' => 'private',
			'post_title'  => 'Private Page',
			'post_content' => 'This is a private page.',
		) );

		$this->draft_page_id = $this->factory->post->create( array(
			'post_type'   => 'page',
			'post_status' => 'draft',
			'post_title'  => 'Draft Page',
			'post_content' => 'This is a draft page.',
		) );
	}

	public function tearDown(): void {
		// テストで作成した投稿を削除
		wp_delete_post( $this->public_page_id, true );
		wp_delete_post( $this->private_page_id, true );
		wp_delete_post( $this->draft_page_id, true );

		parent::tearDown();
	}

	public function test_vk_blocks_page_content_render_callback() {
		$tests = array(
			array(
				'test_name' => '通常の公開固定ページの場合',
				'attributes' => [
					'name'       => 'vk-blocks/page-content',
					'className'  => '',
					'TargetPost' => $this->public_page_id,
				],
				'expected' => '<div class="vk_pageContent vk_pageContent-id-' . $this->public_page_id . ' wp-block-vk-blocks-page-content">This is a public page.</div><a href="' . esc_url( get_edit_post_link( $this->public_page_id ) ) . '" class="vk_pageContent_editBtn btn btn-outline-primary btn-sm veu_adminEdit" target="_blank">' . __( 'Edit this area', 'vk-blocks-pro' ) . '</a>',
			),
			array(
				'test_name' => '非公開の固定ページの場合',
				'attributes' => [
					'name'       => 'vk-blocks/page-content',
					'className'  => '',
					'TargetPost' => $this->private_page_id,
				],
				'expected' => '',
			),
			array(
				'test_name' => '下書きの固定ページの場合',
				'attributes' => [
					'name'       => 'vk-blocks/page-content',
					'className'  => '',
					'TargetPost' => $this->draft_page_id,
				],
				'expected' => '',
			),
		);

		foreach ( $tests as $test ) {
			$result = vk_blocks_page_content_render_callback( $test['attributes'] );
			$this->assertEquals( $test['expected'], $result, $test['test_name'] );
		}
	}
}
