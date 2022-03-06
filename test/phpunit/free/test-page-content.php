<?php
/**
 * Class PageContentBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Page Content block test case.
 */
class PageContentBlockTest extends WP_UnitTestCase {

	/**
	 * PageContentブロックで表示する固定ページ
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp() {
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
	public function tearDown() {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_page_content() {
		$attributes = array(
			'className'  => '',
			'TargetPost' => $this->page_id,
		);

		$this->set_current_user( 'administrator' );

		$actual   = vk_blocks_page_content_render_callback( $attributes );
		$expected = vk_blocks_unescape_html( '<div class=\"vk_pageContent vk_pageContent-id-' . intval( $this->page_id ) . ' \"><p>This is my page.<\/p><\/div><a href=\"' . admin_url() . 'post.php?post=' . intval( $this->page_id ) . '&#038;action=edit\" class=\"vk_pageContent_editBtn btn btn-outline-primary btn-sm veu_adminEdit\" target=\"_blank\">' . __( 'Edit this area', 'vk-blocks' ) . '<\/a>' );

		$this->assertEquals( $expected, $actual );
	}

	/**
	 * Add user and set the user as current user.
	 *
	 * @param  string $role administrator, editor, author, contributor ...
	 * @return void
	 */
	public function set_current_user( $role ) {
		$user = $this->factory()->user->create_and_get(
			array(
				'role' => $role,
			)
		);

		/*
			* Set $user as current user
			*/
		wp_set_current_user( $user->ID, $user->user_login );
	}

};
