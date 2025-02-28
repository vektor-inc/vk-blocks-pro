<?php
/**
 * Class PostListQueryTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

class PostListBlockQueryTest extends VK_UnitTestCase {

	public static function create_test_posts() {

		/******************************************
		 * 投稿タイプ event を追加 */
		register_post_type(
			'event',
			array(
				'label'       => 'Event',
				'has_archive' => true,
				'public'      => true,
			)
		);

		/******************************************
		 * カスタム分類 event_cat を追加 */
		register_taxonomy(
			'event_cat',
			'event',
			array(
				'label'        => 'Event Category',
				'rewrite'      => array( 'slug' => 'event_cat' ),
				'hierarchical' => true,
			)
		);

		/* カスタム分類 event_cat_a の登録 */
		$args                             = array(
			'slug' => 'event_cat_a',
		);
		$term_info                        = wp_insert_term( 'event_cat_a', 'event_cat', $args );
		$test_data['term_id_event_cat_a'] = $term_info['term_id'];

		/* カスタム分類 event_cat_b の登録 */
		$args                             = array(
			'slug' => 'event_cat_b',
		);
		$term_info                        = wp_insert_term( 'event_cat_b', 'event_cat', $args );
		$test_data['term_id_event_cat_b'] = $term_info['term_id'];

		/******************************************
		 * カスタム分類 event_area を追加 */
		register_taxonomy(
			'event_area',
			'event',
			array(
				'label'        => 'Event Area',
				'rewrite'      => array( 'slug' => 'event_area' ),
				'hierarchical' => true,
			)
		);

		// カスタム分類 aichi 登録
		$args                                  = array(
			'slug' => 'event_area_aichi',
		);
		$term_info                             = wp_insert_term( 'event_area_aichi', 'event_area', $args );
		$test_data['term_id_event_area_aichi'] = $term_info['term_id'];

		// カスタム分類 online 登録
		$args                                   = array(
			'slug' => 'event_area_online',
		);
		$term_info                              = wp_insert_term( 'event_area_online', 'event_area', $args );
		$test_data['term_id_event_area_online'] = $term_info['term_id'];

		/******************************************
		 * テスト用投稿の登録 */

		$post                         = array(
			'post_title'   => 'Event A-aichi',
			'post_type'    => 'event',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$test_data['post_id_a_aichi'] = wp_insert_post( $post );
		wp_set_object_terms( $test_data['post_id_a_aichi'], 'event_cat_a', 'event_cat' );
		wp_set_object_terms( $test_data['post_id_a_aichi'], 'event_area_aichi', 'event_area' );

		$post                         = array(
			'post_title'   => 'Event B-aichi',
			'post_type'    => 'event',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$test_data['post_id_b_aichi'] = wp_insert_post( $post );
		wp_set_object_terms( $test_data['post_id_b_aichi'], 'event_cat_b', 'event_cat' );
		wp_set_object_terms( $test_data['post_id_b_aichi'], 'event_area_aichi', 'event_area' );

		$post                          = array(
			'post_title'   => 'Event A-online',
			'post_type'    => 'event',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$test_data['post_id_a_online'] = wp_insert_post( $post );
		wp_set_object_terms( $test_data['post_id_a_online'], 'event_cat_a', 'event_cat' );
		wp_set_object_terms( $test_data['post_id_a_online'], 'event_area_online', 'event_area' );

		$post                          = array(
			'post_title'   => 'Event B-online',
			'post_type'    => 'event',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$test_data['post_id_b_online'] = wp_insert_post( $post );
		wp_set_object_terms( $test_data['post_id_b_online'], 'event_cat_b', 'event_cat' );
		wp_set_object_terms( $test_data['post_id_b_online'], 'event_area_online', 'event_area' );

		return $test_data;
	}

	/**
	 * Attributeで投げた条件で正しく絞り込みが効くかのテスト
	 */
	public function test_get_loop_query() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'post-list-query' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		$test_data         = self::create_test_posts();

		// テストで共通の attribute
		$common_attributes = array(
			'numberPosts' => 6,
			'order'       => 'ASC',
			'orderby'     => 'ID',
		);

		$tests = array(
			// 1.43.0 before /////////////////////////////////////////////////
			// taxQueryRelation 指定なし
			// カテゴリー A  / エリア aichi
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_area_aichi'],
							$test_data['term_id_event_cat_a'],
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_b_aichi'],
					$test_data['post_id_a_online'],
				),
			),
			// 1.44.0 after /////////////////////////////////////////////////
			// カテゴリー A
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'taxQueryRelation'  => 'AND',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_cat_a'],
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_a_online'],
				),
			),
			// エリア aichi
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'taxQueryRelation'  => 'AND',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_area_aichi'],
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_b_aichi'],
				),
			),
			// エリア aichi AND カテゴリー A
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'taxQueryRelation'  => 'AND',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_area_aichi'],
							$test_data['term_id_event_cat_a'],
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
				),
			),
			// カテゴリー A OR エリア aichi
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'taxQueryRelation'  => 'OR',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_cat_a'],
							$test_data['term_id_event_area_aichi'],
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_b_aichi'],
					$test_data['post_id_a_online'],
				),
			),
			// とりあえず event の全件取得
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'taxQueryRelation'  => 'OR',
					'isCheckedTerms'    => json_encode(
						array(
						)
					),
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_b_aichi'],
					$test_data['post_id_a_online'],
					$test_data['post_id_b_online'],
				),
				// ２ページ目で２ページ目の投稿になるかのテスト
				array(
					'attributes' => array(
						'isCheckedPostType' => '["event"]',
						'taxQueryRelation'  => 'OR',
						'isCheckedTerms'    => json_encode(
							array(
							)
						),
						'numberPosts'  => '2',
					),
					'expected'   => array(
						$test_data['post_id_a_online'],
						$test_data['post_id_b_online'],
					),
					'target_url' => home_url( '/event/page/2' ),
				),
				// 常時１件目指定の場合に、２ページ目でも１件目が表示されるかのテスト
				array(
					'attributes' => array(
						'isCheckedPostType' => '["event"]',
						'taxQueryRelation'  => 'OR',
						'isCheckedTerms'    => json_encode(
							array(
							)
						),
						'numberPosts'  => '2',
						'pagedlock'  => true,
					),
					'expected'   => array(
						$test_data['post_id_a_aichi'],
						$test_data['post_id_b_aichi'],
					),
					'target_url' => home_url( '/event/page/2' ),
				),
			),
			// Stickt Post 除外設定
			array(
				'attributes' => array(
					'isCheckedPostType' => '["event"]',
					'isCheckedTerms'    => json_encode(
						array(
							$test_data['term_id_event_area_aichi'],
							$test_data['term_id_event_cat_a'],
						)
					),
					'stickyPosts'       => 'exclude'
				),
				'expected'   => array(
					$test_data['post_id_a_aichi'],
					$test_data['post_id_b_aichi'],
					$test_data['post_id_a_online'],
				),
			),
		);
		$vk_blocks_post_list = new Vk_Blocks_PostList();

		foreach ( $tests as $test ) {
			$attributes = array_merge( $common_attributes, $test['attributes'] );
			$posts      = Vk_Blocks_PostList::get_loop_query( $attributes );
			$actual     = array();
			foreach ( $posts->posts as $post ) {
				$actual[] = $post->ID;
			}
			if ( ! empty( $test['target_url'] ) ) {
				$this->go_to( $test['target_url'] );
			}
print '<pre style="text-align:left">';print_r($actual);print '</pre>';
			$this->assertSame( $test['expected'], $actual );
		}
	}
	
	/**
	 * 関連のないタームやカテゴリーが無視されるかのテスト
	 */
	public function test_ignore_unrelated_terms() {
		$test_data = self::create_test_posts();

		$attributes = array(
			'numberPosts'      => 6,
			'order'            => 'ASC',
			'orderby'          => 'ID',
			'isCheckedPostType'=> '["event"]',
			'taxQueryRelation' => 'AND',
			'isCheckedTerms'   => json_encode(
				array(
					$test_data['term_id_event_cat_a'],
					$test_data['term_id_event_area_aichi'],
				)
			),
		);

		// タームが空の場合のテスト
		$attributes['isCheckedTerms'] = json_encode(array());
		$posts = Vk_Blocks_PostList::get_loop_query($attributes);
		$this->assertSame(4, $posts->post_count);

		// 関連のないタームが含まれている場合のテスト
		$attributes['isCheckedTerms'] = json_encode(array(999999, $test_data['term_id_event_cat_a']));
		$posts = Vk_Blocks_PostList::get_loop_query($attributes);
		$this->assertSame(2, $posts->post_count);
	}
}