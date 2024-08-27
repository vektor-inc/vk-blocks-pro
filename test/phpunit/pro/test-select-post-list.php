<?php
/**
 * Class SelectPostListBlockTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Select Post List Block Test case.
 */
class SelectPostListBlockTest extends VK_UnitTestCase {

	/**
	 * 選択投稿リストで設定するpage id
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
			'post_title'   => 'Select Post List Title',
			'post_content' => '<!-- wp:paragraph --><p>Page for Select Post List page.</p><!-- /wp:paragraph -->',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_excerpt' => 'Select Post List Excerpt.',
		);
		$this->page_id = self::factory()->post->create( $page );
	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown(): void {
		parent::tearDown();
		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_select_post_list() {
		$attributes = array(
			'url'                        => get_permalink( $this->page_id ),
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
			'className'                  => 'add-class',
		);

		$this->set_current_user( 'administrator' );
		$this->go_to( get_the_permalink( $this->page_id ) );

		$actual = vk_blocks_select_post_list_item_render_callback( $attributes, $content = '' );

		// このブロックを配置しているページ
		global $post;

		$expected = vk_blocks_unescape_html( '<div id=\"post-' . intval( $this->page_id ) . '\" class="vk_post vk_post-postType-page card card-post card-horizontal add-class vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-6 vk_post-col-lg-6 vk_post-col-xl-6 vk_post-col-xxl-6 vk_post-btn-display post-' . intval( $post->ID ) . ' page type-page status-publish hentry"><div class="card-horizontal-inner-row"><div class="vk_post-col-5 col-5 card-img-outer"><div class="vk_post_imgOuter" style="background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\)"><a href="' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '"><div class="card-img-overlay"></div><img src="' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt="" class="vk_post_imgOuter_img card-img card-img-use-bg" loading="lazy" /></a></div><!-- [ /.vk_post_imgOuter ] --></div><!-- /.col --><div class="vk_post-col-7 col-7"><div class="vk_post_body card-body"><h5 class="vk_post_title card-title"><a href="' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '">Select Post List Title</a></h5><p class="vk_post_excerpt card-text">Select Post List Excerpt.</p><div class="vk_post_btnOuter text-right"><a class="btn btn-sm btn-primary vk_post_btn" href="' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '">Read more</a></div></div><!-- [ /.card-body ] --></div><!-- /.col --></div><!-- [ /.row ] --></div><!-- [ /.card ] -->' );

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_select_post_list()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		// print 'expected  :';
		// print PHP_EOL;
		// var_dump( $expected );
		// print PHP_EOL;
		// print 'actual  :';
		// print PHP_EOL;
		// var_dump( $actual );
		// print PHP_EOL;

		$this->assertEquals( $expected, $actual );
	}

}
