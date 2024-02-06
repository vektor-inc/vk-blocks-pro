<?php
/**
 * Class BreadcrumbTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Breadcrumb block test case.
 */
class Breadcrumb extends VK_UnitTestCase {

	/**
	 * Breadcrumbブロックを挿入する投稿
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $post_id;

	/**
	 * Breadcrumbブロックで表示する固定ページ
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $page_id;

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp() : void {
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
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_breadcrumb() {
		$attributes = array(
			'name'                       => 'vk-blocks/breadcrumb',
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

		WP_Block_Supports::init();
		WP_Block_Supports::$block_to_render =  array('blockName'=> $attributes['name'], 'attrs' => $attributes );	

		$actual = vk_blocks_breadcrumb_render_callback( $attributes );
		$expected = vk_blocks_unescape_html( '<!-- [ #vk_breadcrumb ] --><div id=\"vk_breadcrumb\" class=\"vk_breadcrumb wp-block-vk-blocks-breadcrumb\"><div class=\"vk_breadcrumb_inner\"><ol class=\"vk_breadcrumb_list\" itemscope itemtype=\"https://schema.org/BreadcrumbList\"><li class=\"vk_breadcrumb_list_item breadcrumb-list__item--home\" itemprop=\"itemListElement\" itemscope itemtype=\"http://schema.org/ListItem\"><a href=\"' . home_url() . '\" itemprop=\"item\"><i class=\"fas fa-fw fa-home\"></i><span itemprop=\"name\">HOME</span></a><meta itemprop=\"position\" content=\"1\" /></li></ol></div></div><!-- [ /#vk_breadcrumb ] -->' );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_breadcrumb' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'expected  :' . $expected . PHP_EOL;
		print 'actual :' . $actual . PHP_EOL;

		$this->assertEquals( $expected, $actual );

	}

};
