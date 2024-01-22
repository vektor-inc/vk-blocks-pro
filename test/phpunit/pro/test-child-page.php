<?php
/**
 * Class ChildPageBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Child Page block test case.
 */
class ChildPageBlockTest extends VK_UnitTestCase {

	/**
	 * 親ページID
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * コページブロックIDで表示する固定ページ
	 *
	 * @var int|\WP_Error $child_page_id
	 */
	public $child_page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp(): void {
		parent::setUp();

		$page          = array(
			'post_title'   => 'Parent Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my parent page.</p><!-- /wp:paragraph -->',
			'post_type'    => 'page',
			'post_status'  => 'publish',
		);
		$this->page_id = wp_insert_post( $page );

		$child               = array(
			'post_title'   => 'Child Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my child page</p><!-- /wp:paragraph -->',
			'post_type'    => 'page',
			'post_parent'  => $this->page_id,
			'post_status'  => 'publish',
		);
		$this->child_page_id = wp_insert_post( $child );
	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown(): void {
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->child_page_id, true );
		$this->child_page_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_child_page() {
		$attributes = array(
			'selectId'                   => $this->page_id,
			'name'                       => 'vk-blocks/child-page',
			'layout'                     => 'card-horizontal',
			'col_xs'                     => 1.0,
			'col_sm'                     => 2.0,
			'col_md'                     => 2.0,
			'col_lg'                     => 2.0,
			'col_xl'                     => 2.0,
			'col_xxl'                    => 2.0,
			'display_image'              => true,
			'display_image_overlay_term' => true,
			'display_excerpt'            => true,
			'display_author'             => false,
			'display_date'               => false,
			'display_new'                => false,
			'display_taxonomies'         => false,
			'display_btn'                => true,
			'new_date'                   => 7.0,
			'new_text'                   => 'New!!',
			'btn_text'                   => 'Read more',
			'btn_align'                  => 'text-right',
			'numberPosts'                => 6.0,
			'isCheckedPostType'          => '["post"]',
			'coreTerms'                  => '[]',
			'isCheckedTerms'             => '[]',
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

		$actual = vk_blocks_child_page_render_callback( $attributes );

		$expected = vk_blocks_unescape_html( '<div class=\"vk_posts vk_posts-postType-page vk_posts-layout-card-horizontal vk_childPage \"><div id=\"post-' . intval( $this->child_page_id ) . '\" class=\"vk_post vk_post-postType-page card card-post card-horizontal vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-6 vk_post-col-lg-6 vk_post-col-xl-6 vk_post-col-xxl-6 vk_post-btn-display post-' . intval( $this->child_page_id ) . ' page type-page status-publish hentry\"><div class=\"card-horizontal-inner-row\"><div class=\"vk_post-col-5 col-5 card-img-outer\"><div class=\"vk_post_imgOuter\" style=\"background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png)\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->child_page_id ) . '\"><div class=\"card-img-overlay\"><\/div><img src=\"' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt=\"\" class=\"vk_post_imgOuter_img card-img card-img-use-bg\" loading=\"lazy\" \/><\/a><\/div><!-- [ \/.vk_post_imgOuter ] --><\/div><!-- \/.col --><div class=\"vk_post-col-7 col-7\"><div class=\"vk_post_body card-body\"><h5 class=\"vk_post_title card-title\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->child_page_id ) . '\">Child Title<\/a><\/h5><p class=\"vk_post_excerpt card-text\">This is my child page<\/p><div class=\"vk_post_btnOuter text-right\"><a class=\"btn btn-sm btn-primary vk_post_btn\" href=\"' . home_url() . '\/?page_id=' . intval( $this->child_page_id ) . '\">Read more<\/a><\/div><\/div><!-- [ \/.card-body ] --><\/div><!-- \/.col --><\/div><!-- [ \/.row ] --><\/div><!-- [ \/.card ] --><\/div>' );

		$this->assertEquals( $expected, $actual );
	}

};
