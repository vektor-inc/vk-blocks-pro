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

	public $page_id; // PageContentブロックで表示する固定ページ

	// 各テストケースの実行直前に呼ばれる
	public function setUp() {
		parent::setUp();

		$page = array(
			'post_title'    => 'Page Title',
			'post_content'  => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
			'post_type'     => 'page',
			'post_status'   => 'publish',
		);
		$this->page_id = wp_insert_post( $page );

	}

	public function tearDown() {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_page_content() {

		$attributes = array(
			'className' => '',
			'TargetPost' => $this->page_id,
		);

		$this->set_current_user( 'administrator' );

		$actual = vk_page_content_render_callback( $attributes );
		$expected = unescapeHTML('<div class=\"vk_pageContent vk_pageContent-id-' . intval($this->page_id) . ' \"><p>This is my page.<\/p><\/div><a href=\"http:\/\/localhost:8888\/wp-admin\/post.php?post=' . intval($this->page_id) . '&#038;action=edit\" class=\"vk_pageContent_editBtn btn btn-outline-primary btn-sm veu_adminEdit\" target=\"_blank\">Edit this area<\/a>');

		$this->assertEquals( $expected, $actual );

	}

	/**
     * Add user and set the user as current user.
     *
     * @param  string $role administrator, editor, author, contributor ...
     * @return none
     */
    public function set_current_user( $role ) {
		$user = $this->factory()->user->create_and_get( array(
			'role' => $role,
		) );

		/*
			* Set $user as current user
			*/
		wp_set_current_user( $user->ID, $user->user_login );
	}

};
