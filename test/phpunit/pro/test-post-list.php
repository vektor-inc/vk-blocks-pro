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
	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown(): void {
		parent::tearDown();
	}

	/**
	 * A single example test.
	 */
	public function test_post_list() {

		$catarr                           = array(
			'cat_name' => 'parent_category',
		);
		$test_posts['parent_category_id'] = wp_insert_category( $catarr );

		$page          = array(
			'post_title'    => 'Page Title',
			'post_content'  => '<!-- wp:paragraph --><p>This is my page.</p><!-- /wp:paragraph -->',
			'post_type'     => 'page',
			'post_status'   => 'publish',
			'post_category' => array( $test_posts['parent_category_id'] ),
		);
		$this->page_id = wp_insert_post( $page );

		$post          = array(
			'post_title'    => 'Post Title',
			'post_content'  => '<!-- wp:paragraph --><p>This is my post</p><!-- /wp:paragraph -->',
			'post_status'   => 'publish',
			'post_category' => array( $test_posts['parent_category_id'] ),
		);
		$this->post_id = wp_insert_post( $post );

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

		$expected = vk_blocks_unescape_html( '<div class=\"vk_posts vk_posts-postType-post vk_posts-postType-page vk_posts-layout-card vk_postList \"><div id=\"post-' . intval( $this->page_id ) . '\" class=\"vk_post vk_post-postType-page card card-post vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-col-xxl-4 post-' . intval( $this->page_id ) . ' page type-page status-publish hentry\"><div class=\"vk_post_imgOuter\" style=\"background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png)\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '\"><div class=\"card-img-overlay\"><\/div><img src=\"' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt=\"\" class=\"vk_post_imgOuter_img card-img-top\" loading=\"lazy\" \/><\/a><\/div><!-- [ \/.vk_post_imgOuter ] --><div class=\"vk_post_body card-body\"><h5 class=\"vk_post_title card-title\"><a href=\"' . home_url() . '\/?page_id=' . intval( $this->page_id ) . '\">Page Title<span class=\"vk_post_title_new\">New!!<\/span><\/a><\/h5><\/div><!-- [ \/.card-body ] --><\/div><!-- [ \/.card ] --><div id=\"post-' . intval( $this->post_id ) . '\" class=\"vk_post vk_post-postType-post card card-post vk_post-col-xs-12 vk_post-col-sm-6 vk_post-col-md-4 vk_post-col-lg-4 vk_post-col-xl-4 vk_post-col-xxl-4 post-' . intval( $this->post_id ) . ' post type-post status-publish format-standard hentry category-parent_category\"><div class=\"vk_post_imgOuter\" style=\"background-image:url(' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png)\"><a href=\"' . home_url() . '\/?p=' . intval( $this->post_id ) . '\"><div class=\"card-img-overlay\"><span class=\"vk_post_imgOuter_singleTermLabel\" style=\"color:#fff;background-color:#999999\">parent_category<\/span><\/div><img src=\"' . home_url() . '\/wp-content\/plugins\/vk-blocks-pro\/inc\/vk-blocks\/images\/no-image.png\" alt=\"\" class=\"vk_post_imgOuter_img card-img-top\" loading=\"lazy\" \/><\/a><\/div><!-- [ \/.vk_post_imgOuter ] --><div class=\"vk_post_body card-body\"><h5 class=\"vk_post_title card-title\"><a href=\"' . home_url() . '\/?p=' . intval( $this->post_id ) . '\">Post Title<span class=\"vk_post_title_new\">New!!<\/span><\/a><\/h5><\/div><!-- [ \/.card-body ] --><\/div><!-- [ \/.card ] --><\/div>' );

		$this->assertEquals( $expected, $actual );

		wp_delete_post( $this->page_id, true );
		$this->page_id = 0;

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	// 絞り込み検証用のテスト投稿を作成 //////////////////////////////////////
	public static function create_test_posts() {
		$created_data              = array();
		$created_data['user_a_id'] = wp_create_user( 'user_a', 'password', 'user_a@test.com' );
		$created_data['user_b_id'] = wp_create_user( 'user_b', 'password', 'user_b@test.com' );

		// 投稿タイプ event を追加
		register_post_type(
			'event',
			array(
				'label'       => 'Event',
				'has_archive' => true,
				'public'      => true,
			)
		);
		// タクソノミー event_cat を追加
		register_taxonomy(
			'event_cat',
			'event',
			array(
				'label'        => 'Event Category',
				'rewrite'      => array( 'slug' => 'event_cat' ),
				'hierarchical' => true,
			)
		);

		// Create test category
		$catarr                                   = array(
			'cat_name' => 'parent_category',
		);
		$created_data['terms']['parent_category'] = wp_insert_category( $catarr );

		$catarr                                  = array(
			'cat_name'        => 'child_category',
			'category_parent' => $created_data['terms']['parent_category'],
		);
		$created_data['terms']['child_category'] = wp_insert_category( $catarr );

		// Create test term
		$args                                     = array(
			'slug' => 'event_cate_name',
		);
		$created_data['terms']['event_cate_name'] = wp_insert_term( 'event_cate_name', 'event_cat', $args );

		// test posts data
		$test_posts_array = array(
			array(
				'post'  => array(
					'post_title'   => 'Normal post',
					'post_type'    => 'post',
					'post_status'  => 'publish',
					'post_content' => 'content',
					'post_author'  => $created_data['user_a_id'],
					'post_date'    => date( 'Y-m-d H:i:s', strtotime( '-1 day' ) ),
				),
				'terms' => array(
					'category' => array( 'parent_category' ),
				),
			),
			array(
				'post'  => array(
					'post_title'   => 'Child-category post',
					'post_type'    => 'post',
					'post_status'  => 'publish',
					'post_content' => 'content',
					'post_author'  => $created_data['user_a_id'],
					'post_date'    => date( 'Y-m-d H:i:s', strtotime( '-1 day' ) ),
				),
				'terms' => array(
					'category' => array( 'child_category' ),
				),
			),
			array(
				'post'  => array(
					'post_title'   => 'Event post',
					'post_type'    => 'event',
					'post_status'  => 'publish',
					'post_content' => 'content',
					'post_author'  => $created_data['user_a_id'],
					'post_date'    => date( 'Y-m-d H:i:s', strtotime( '-1 day' ) ),
				),
				'terms' => array(
					'event_cat' => array( 'event_cate_name' ),
				),
			),

		);

		// テスト投稿作成
		foreach ( $test_posts_array as $test_post_data ) {
			// テスト投稿作成
			$post_id                 = wp_insert_post( $test_post_data['post'] );
			$created_data['posts'][] = $post_id;
			if ( ! empty( $test_post_data['terms'] ) && is_array( $test_post_data['terms'] ) ) {
				foreach ( $test_post_data['terms'] as $taxonomy => $term_names ) {
					foreach ( $term_names as $term_name ) {
						wp_set_object_terms( $post_id, $term_name, $taxonomy );
					}
				}
			}
		}
		return $created_data;
	}

	// WP_Query の posts プロパティを投稿タイトルの配列に変換 ///////////////////////////
	public static function get_query_posts_title_array( $query ) {

		// 投稿タイトルを格納するための配列を初期化
		$titles = array();

		// 投稿が存在するか確認
		if ( ! empty( $query->posts ) ) {
			foreach ( $query->posts as $post ) {
				// 投稿タイトルを配列に追加
				$titles[] = $post->post_title;
			}
		}
		return $titles;
	}

	// ターム名からタームIDを取得 //////////////////////////////////////////
	public static function get_term_id_by_name( $term_name, $taxonomy ) {
		// 'name' を基準にタームを取得
		$term = get_term_by( 'name', $term_name, $taxonomy );

		// タームが存在する場合はそのIDを返す
		if ( $term ) {
			return $term->term_id;
		}

		// タームが存在しない場合は false を返す
		return false;
	}

	/**
	 * Test get_loop_query
	 */
	public function test_get_loop_query() {

		// テスト投稿を作成
		$test_posts = self::create_test_posts();

		// 検証データ
		$test_data = array(
			'イベント情報のみ'       => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["event"]',
					'isCheckedTerms'    => '[]',
					'order'             => 'ASC',
					'orderby'           => 'title',
				),
				'expected'   => array( 'Event post' ),
			),
			'通常の投稿 と イベント情報' => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["post","event"]',
					'isCheckedTerms'    => '[]',
					'order'             => 'ASC',
					'orderby'           => 'title',
				),
				'expected'   => array( 'Child-category post', 'Event post', 'Normal post' ),
			),
			'子カテゴリーの投稿のみ'    => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["post"]',
					'isCheckedTerms'    => '[' . self::get_term_id_by_name( 'child_category', 'category' ) . ']',
					'order'             => 'ASC',
					'orderby'           => 'title',
				),
				'expected'   => array( 'Child-category post' ),
			),
			'オフセットして取得'      => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["post","event"]',
					'isCheckedTerms'    => '[]',
					'order'             => 'ASC',
					'orderby'           => 'title',
					'offset'            => 1,
				),
				'expected'   => array( 'Event post', 'Normal post' ),
			),
			'カテゴリーの or 検索'   => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["post"]',
					'isCheckedTerms'    => '[ ' . self::get_term_id_by_name( 'child_category', 'category' ) . ',' . self::get_term_id_by_name( 'parent_category', 'category' ) . ' ]',
					'order'             => 'ASC',
					'orderby'           => 'title',
					'taxQueryRelation'  => 'OR',
				),
				'expected'   => array( 'Child-category post', 'Normal post' ),
			),
			'カテゴリーの AND 検索'  => array(
				'attributes' => array(
					'numberPosts'       => 6.0,
					'isCheckedPostType' => '["post"]',
					'isCheckedTerms'    => '[ ' . self::get_term_id_by_name( 'child_category', 'category' ) . ',' . self::get_term_id_by_name( 'parent_category', 'category' ) . ' ]',
					'order'             => 'ASC',
					'orderby'           => 'title',
					'taxQueryRelation'  => 'AND',
				),
				'expected'   => array( 'Child-category post' ),
			),

		);

		// 検証データをループして実行
		foreach ( $test_data as $key => $value ) {
			$query = Vk_Blocks_PostList::get_loop_query( $value['attributes'] );
			// オブジェクトで返ってくるので、比較しやすいように投稿タイトルの配列に変換
			$actual = self::get_query_posts_title_array( $query );

			$this->assertEquals( $value['expected'], $actual );
		}
		// テスト投稿を削除
		foreach ( $test_posts['posts'] as $id ) {
			wp_delete_post( $id, true );
		}
	}
}
