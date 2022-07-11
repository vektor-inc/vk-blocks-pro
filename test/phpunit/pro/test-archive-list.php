<?php
/**
 * Class ArchiveListTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * ArchiveList block test case.
 */
class ArchiveList extends WP_UnitTestCase {

	/**
	 * ArchiveList
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $post_id;

	/**
	 * ArchiveListブロックで表示する固定ページ
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp() {
		parent::setUp();

		$catarr                           = array(
			'cat_name' => 'parent_category',
		);
		$test_posts['parent_category_id'] = wp_insert_category( $catarr );

		$page          = array(
			'post_title'   => 'Page Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_category' => array( $test_posts['parent_category_id'] ),
		);
		$this->page_id = wp_insert_post( $page );

		$post          = array(
			'post_title'   => 'Post Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my post</p><!-- /wp:paragraph -->',
			'post_status'  => 'publish',
			'post_category' => array( $test_posts['parent_category_id'] ),
		);
		$this->post_id = wp_insert_post( $post );
	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown() {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_archivelist() {
		$attributes = array(
			'name'                       => 'vk-blocks/archive-list',
			'postType'                   => 'post',
			'displayType'                => 'monthly',
			'displayDropdown'            => false,
			'showCount'                  => false,
/*			'vkb_hidden'                 => false,
			'vkb_hidden_xxl'             => false,
			'vkb_hidden_xl_v2'           => false,
			'vkb_hidden_xl'              => false,
			'vkb_hidden_lg'              => false,
			'vkb_hidden_md'              => false,
			'vkb_hidden_sm'              => false,
			'vkb_hidden_xs'              => false,
			'marginTop'                  => '',
			'marginBottom'               => '', */
			'className'                  => '',
		);

		$this->set_current_user( 'administrator' );

		$actual = vk_blocks_archive_list_render_callback( $attributes );

		$expected = vk_blocks_unescape_html( '<!-- [ #vk_archive-list] --><div class=\"vk_archiveList testClass wp-block-vk-blocks-archive-list\">' .wp_get_archives() .'</div><!-- [ /#vk_archive-list ] -->' );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_archivelist' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected  :' . $expected . PHP_EOL;
		print 'actual :' . $actual . PHP_EOL;

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
