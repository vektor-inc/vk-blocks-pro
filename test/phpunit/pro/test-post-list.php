<?php
/**
 * Class PostListBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Post List block test case.
 */
class PostListBlockTest extends VK_UnitTestCase {

	/**
	 * PostListブロックを挿入する投稿
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $post_id;

	/**
	 * PostListブロックで表示する固定ページ
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp(): void {
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
	public function tearDown(): void {
		parent::tearDown();
		
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_post_list() {
		$attributes = array(
			'name'                       => 'vk-blocks/post-list',
			'layout'                     => 'card',
			'col_xs'                     => 1.0,
			'col_sm'                     => 2.0,
			'col_md'                     => 3.0,
			'col_lg'                     => 3.0,
			'col_xl'                     => 3.0,
			'col_xxl'                    => 3.0,
			'display_image'              => true,
			'display_image_overlay_term' => true,
			'display_excerpt'            => false,
			'display_author'             => false,
			'display_date'               => false,
			'display_new'                => true,
			'display_taxonomies'         => false,
			'display_btn'                => false,
			'new_date'                   => 7.0,
			'new_text'                   => 'New!!',
			'btn_text'                   => 'Read more',
			'btn_align'                  => 'text-right',
			'numberPosts'                => 6.0,
			'isCheckedPostType'          => '["post","page"]',
			'coreTerms'                  => '[]',
			'isCheckedTerms'             => '[]',
			'order'                      => 'ASC',
			'orderby'                    => 'title',
			'offset'                     => 0.0,
			'selfIgnore'                 => true,
			'vkb_hidden'                 => false,
			'vkb_hidden_xxl'             => false,
			'vkb_hidden_xl_v2'           => false,
			'vkb_hidden_xl'              => false,
			'vkb_hidden_lg'              => false,
			'vkb_hidden_md'              => false,
			'vkb_hidden_sm'              => false,
			'vkb_hidden_xs'              => false,
			'marginTop'                  => '',
			'marginBottom'               => '',
			'className'                  => '',
		);

		$this->set_current_user( 'administrator' );

		$actual = vk_blocks_post_list_render_callback( $attributes );

		$expected = vk_blocks_unescape_html( '<div class="vk_posts vk_posts-postType-post vk_posts-layout-card vk_postList "><div id="post-' . intval( $this->page_id ) . '\" class="vk_post vk_post-postType-page card card-post vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-col-xxl-4 post-' . intval( $this->page_id ) . ' page type-page status-publish hentry"><div class="vk_post_imgOuter" style="background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png)\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '\"><div class="card-img-overlay"><\/div><img src=\"' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt=\"\" class=\"vk_post_imgOuter_img card-img-top\" loading=\"lazy\" \/><\/a><\/div><!-- [ \/.vk_post_imgOuter ] --><div class=\"vk_post_body card-body\"><h5 class=\"vk_post_title card-title\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '\">Page Title<span class=\"vk_post_title_new\">New!!<\/span><\/a><\/h5><\/div><!-- [ \/.card-body ] --><\/div><!-- [ \/.card ] --><div id=\"post-' . intval( $this->post_id ) . '\" class=\"vk_post vk_post-postType-post card card-post vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-col-xxl-4 post-' . intval( $this->post_id ) . ' post type-post status-publish format-standard hentry category-parent_category\"><div class="vk_post_imgOuter" style="background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png)\"><a href=\"' . home_url() . '\/?p=' . intval( $this->post_id ) . '\"><div class=\"card-img-overlay\"><span class=\"vk_post_imgOuter_singleTermLabel\" style=\"color:#fff;background-color:#999999\">parent_category<\/span><\/div><img src=\"' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt=\"\" class=\"vk_post_imgOuter_img card-img-top\" loading=\"lazy\" \/><\/a><\/div><!-- [ \/.vk_post_imgOuter ] --><div class=\"vk_post_body card-body\"><h5 class=\"vk_post_title card-title\"><a href=\"' . home_url() . '\/?p=' . intval( $this->post_id ) . '\">Post Title<span class=\"vk_post_title_new\">New!!<\/span><\/a><\/h5><\/div><!-- [ \/.card-body ] --><\/div><!-- [ \/.card ] --><\/div>' );

		$this->assertEquals( $expected, $actual );
	}
}
