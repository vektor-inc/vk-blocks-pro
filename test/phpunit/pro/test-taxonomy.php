<?php

class TaxonomyTest extends VK_UnitTestCase {

	function test_taxonomy_render_callback() {

		/**
		 * カスタム投稿タイプを設置
		 */
		register_post_type(
			'event',
			array(
				'has_archive' => true,
				'public'      => true,
			)
		);

		/**
		 * カスタム投稿タイプにカスタム分類を関連付け
		 */
		register_taxonomy(
			'event_cat',
			'event',
			array(
				'label'        => 'Event Category',
				'rewrite'      => array( 'slug' => 'event_cat' ),
				'hierarchical' => true,
			)
		);

		/**
		 * Test Category 01 を作成
		 */
		$catarr                  = array(
			'cat_name' => 'test_category_01',
		);
		$data['term_cate_01_id'] = wp_insert_category( $catarr );

		/**
		 * Test Category 01 Child を作成
		 */
		$catarr                        = array(
			'cat_name'        => 'test_category_01_child',
			'category_parent' => $data['term_cate_01_id'],
		);
		$data['term_cate_01_child_id'] = wp_insert_category( $catarr );

		/**
		 * Test Category 02 を作成
		 */
		$catarr                  = array(
			'cat_name' => 'test_category_02',
		);
		$data['term_cate_02_id'] = wp_insert_category( $catarr );

		/**
		 * Test Category 02 Child を作成
		 */
		$catarr                        = array(
			'cat_name'        => 'test_category_02_child',
			'category_parent' => $data['term_cate_02_id'],
		);
		$data['term_cate_02_child_id'] = wp_insert_category( $catarr );

		/**
		 * Empty Category 01 を作成
		 */
		$catarr                        = array(
			'cat_name' => 'empty_category_01',
		);
		$data['term_cate_empty_01_id'] = wp_insert_category( $catarr );

		/**
		 * Empty Category 01 Child を作成
		 */
		$catarr                              = array(
			'cat_name'        => 'empty_category_01_child',
			'category_parent' => $data['term_cate_empty_01_id'],
		);
		$data['term_cate_empty_01_child_id'] = wp_insert_category( $catarr );

		/**
		 * Empty Category 02 を作成
		 */
		$catarr                        = array(
			'cat_name' => 'empty_category_02',
		);
		$data['term_cate_empty_02_id'] = wp_insert_category( $catarr );

		/**
		 * Empty Category 02 Child を作成
		 */
		$catarr                              = array(
			'cat_name'        => 'empty_category_02_child',
			'category_parent' => $data['term_cate_empty_02_id'],
		);
		$data['term_cate_empty_02_child_id'] = wp_insert_category( $catarr );

		/**
		 * Test Event 01 を作成
		 */
		$args                = array(
			'slug' => 'test_event_01',
		);
		$term_info_01        = wp_insert_term( 'test_event_01', 'event_cat', $args );
		$data['term_event_01_id'] = $term_info_01['term_id'];

		/**
		 * Test Event 01 Child を作成
		 */
		$args                      = array(
			'slug'   => 'test_event_01_child',
			'parent' => $data['term_event_01_id'],
		);
		$term_info_01_child        = wp_insert_term( 'test_event_01_child', 'event_cat', $args );
		$data['term_event_01_child_id'] = $term_info_01_child['term_id'];

		/**
		 * Test Event 02 を作成
		 */
		$args                = array(
			'slug' => 'test_event_02',
		);
		$term_info_02        = wp_insert_term( 'test_event_02', 'event_cat', $args );
		$data['event_02_id'] = $term_info_02['term_id'];

		/**
		 * Test Event 02 Child を作成
		 */
		$args                      = array(
			'slug'   => 'test_event_02_child',
			'parent' => $data['event_02_id'],
		);
		$term_info_02_child        = wp_insert_term( 'test_event_02_child', 'event_cat', $args );
		$data['event_02_child_id'] = $term_info_02_child['term_id'];

		/**
		 * Empty Event 01 を作成
		 */
		$args                      = array(
			'slug' => 'empty_event_01',
		);
		$term_info_01              = wp_insert_term( 'empty_event_01', 'event_cat', $args );
		$data['term_empty_event_01_id'] = $term_info_01['term_id'];

		/**
		 * Test Event 02 Child を作成
		 */
		$args                         = array(
			'slug'   => 'empty_event_01_child',
			'parent' => $data['term_empty_event_01_id'],
		);
		$term_info_03_child           = wp_insert_term( 'empty_event_01_child', 'event_cat', $args );
		$data['term_event_empty_01_child_id'] = $term_info_03_child['term_id'];

		/**
		 * Empty Event 02 を作成
		 */
		$args                = array(
			'slug' => 'empty_event_02',
		);
		$term_info_02        = wp_insert_term( 'empty_event_02', 'event_cat', $args );
		$data['term_event_empty_02_id'] = $term_info_02['term_id'];

				/**
		 * Test Event 02 Child を作成
		 */
		$args                            = array(
			'slug'   => 'empty_event_02_child',
			'parent' => $data['term_event_empty_02_id'],
		);
		$term_info_04_child              = wp_insert_term( 'empty_event_02_child', 'event_cat', $args );
		$data['empty_event_02_child_id'] = $term_info_04_child['term_id'];

		/**
		 * Test Post 01 を作成
		 */
		$post               = array(
			'post_title'    => 'test-post-01',
			'post_status'   => 'publish',
			'post_content'  => 'test-content-01',
			'post_category' => array( $data['term_cate_01_id'], $data['term_cate_01_child_id'] ),
			'post_date'     => '2021-11-01 00:00:00',
			'post_modified' => '2022-01-01 00:00:00',
		);
		$data['post_id_01'] = wp_insert_post( $post );

		/**
		 * Test Post 02 を作成
		 */
		$post               = array(
			'post_title'    => 'test-post-02',
			'post_status'   => 'publish',
			'post_content'  => 'test-content-02',
			'post_category' => array( $data['term_cate_02_id'], $data['term_cate_02_child_id'] ),
			'post_date'     => '2021-05-01 00:00:00',
			'post_modified' => '2021-07-01 00:00:00',
		);
		$data['post_id_02'] = wp_insert_post( $post );

		/**
		 * Test Event 01 を作成.
		 */
		$post                     = array(
			'post_title'    => 'test-event-01',
			'post_type'     => 'event',
			'post_status'   => 'publish',
			'post_content'  => 'event-content-01',
			'post_date'     => '2021-05-01 00:00:00',
			'post_modified' => '2021-11-01 ' . $data['term_cate_01_id'] . ':00:00',
		);
		$data['event_post_id_01'] = wp_insert_post( $post );
		wp_set_object_terms( $data['event_post_id_01'], array( $data['term_event_01_id'], $data['term_event_01_child_id'] ), 'event_cat' );

		/**
		 * Test Event 02 を作成.
		 */
		$post                     = array(
			'post_title'    => 'test-event-02',
			'post_type'     => 'event',
			'post_status'   => 'publish',
			'post_content'  => 'event-content-02',
			'post_date'     => '2021-07-01 00:00:00',
			'post_modified' => '2022-01-01 ' . $data['term_cate_01_id'] . ':00:00',
		);
		$data['event_post_id_02'] = wp_insert_post( $post );
		wp_set_object_terms( $data['event_post_id_02'], array( $data['term_event_01_id'], $data['term_event_01_child_id'] ), 'event_cat' );

		$tests = array(
			// デフォルト （ カテゴリーリスト ）
			array(
				'attributes' => array(),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_empty_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_id'] . '">empty_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_child_id'] . '">empty_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_id'] . '">empty_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_child_id'] . '">empty_category_02_child</a></li><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a></li><li class="cat-item cat-item-1"><a href="' . home_url() . '/?cat=1">Uncategorized</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => '',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => false,
					'showPostCounts'     => false,
					'hideIfEmpty'        => false,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_empty_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_id'] . '">empty_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_child_id'] . '">empty_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_id'] . '">empty_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_child_id'] . '">empty_category_02_child</a></li><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a></li><li class="cat-item cat-item-1"><a href="' . home_url() . '/?cat=1">Uncategorized</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => false,
					'showPostCounts'     => false,
					'hideIfEmpty'        => false,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_empty_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_id'] . '">empty_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_child_id'] . '">empty_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_id'] . '">empty_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_child_id'] . '">empty_category_02_child</a></li><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a></li><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a></li><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a></li><li class="cat-item cat-item-1"><a href="' . home_url() . '/?cat=1">Uncategorized</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Event Category',
					'isSelectedTaxonomy' => 'event_cat',
					'displayAsDropdown'  => false,
					'showHierarchy'      => false,
					'showPostCounts'     => false,
					'hideIfEmpty'        => false,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--event_cat vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_empty_event_01_id'] . '"><a href="' . home_url() . '/?event_cat=empty_event_01">empty_event_01</a></li><li class="cat-item cat-item-' . $data['term_event_empty_01_child_id'] . '"><a href="' . home_url() . '/?event_cat=empty_event_01_child">empty_event_01_child</a></li><li class="cat-item cat-item-' . $data['term_event_empty_02_id'] . '"><a href="' . home_url() . '/?event_cat=empty_event_02">empty_event_02</a></li><li class="cat-item cat-item-' . $data['empty_event_02_child_id'] . '"><a href="' . home_url() . '/?event_cat=empty_event_02_child">empty_event_02_child</a></li><li class="cat-item cat-item-' . $data['term_event_01_id'] . '"><a href="' . home_url() . '/?event_cat=test_event_01">test_event_01</a></li><li class="cat-item cat-item-' . $data['term_event_01_child_id'] . '"><a href="' . home_url() . '/?event_cat=test_event_01_child">test_event_01_child</a></li><li class="cat-item cat-item-' . $data['event_02_id'] . '"><a href="' . home_url() . '/?event_cat=test_event_02">test_event_02</a></li><li class="cat-item cat-item-' . $data['event_02_child_id'] . '"><a href="' . home_url() . '/?event_cat=test_event_02_child">test_event_02_child</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => true,
					'showPostCounts'     => false,
					'hideIfEmpty'        => false,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_empty_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_id'] . '">empty_category_01</a><ul class="children"><li class="cat-item cat-item-' . $data['term_cate_empty_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_child_id'] . '">empty_category_01_child</a></li></ul></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_id'] . '">empty_category_02</a><ul class="children"><li class="cat-item cat-item-' . $data['term_cate_empty_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_child_id'] . '">empty_category_02_child</a></li></ul></li><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a><ul class="children"><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a></li></ul></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a><ul class="children"><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a></li></ul></li><li class="cat-item cat-item-1"><a href="' . home_url() . '/?cat=1">Uncategorized</a></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => true,
					'showPostCounts'     => true,
					'hideIfEmpty'        => false,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_empty_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_id'] . '">empty_category_01</a> (0)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_empty_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_01_child_id'] . '">empty_category_01_child</a> (0)</li></ul></li><li class="cat-item cat-item-' . $data['term_cate_empty_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_id'] . '">empty_category_02</a> (0)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_empty_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_empty_02_child_id'] . '">empty_category_02_child</a> (0)</li></ul></li><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a> (1)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a> (1)</li></ul></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a> (1)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a> (1)</li></ul></li><li class="cat-item cat-item-1"><a href="' . home_url() . '/?cat=1">Uncategorized</a> (0)</li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => true,
					'showPostCounts'     => true,
					'hideIfEmpty'        => true,
					'showOnlyTopLevel'   => false,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a> (1)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_01_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_child_id'] . '">test_category_01_child</a> (1)</li></ul></li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a> (1)<ul class="children"><li class="cat-item cat-item-' . $data['term_cate_02_child_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_child_id'] . '">test_category_02_child</a> (1)</li></ul></li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => false,
					'showPostCounts'     => true,
					'hideIfEmpty'        => true,
					'showOnlyTopLevel'   => true,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a> (1)</li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a> (1)</li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => true,
					'showPostCounts'     => true,
					'hideIfEmpty'        => true,
					'showOnlyTopLevel'   => true,
					'className'          => '',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a> (1)</li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a> (1)</li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => false,
					'showHierarchy'      => true,
					'showPostCounts'     => true,
					'hideIfEmpty'        => true,
					'showOnlyTopLevel'   => true,
					'className'          => 'aaaa',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap aaaa wp-block-vk-blocks-taxonomy"><ul class="vk_taxonomy-list"><li class="cat-item cat-item-' . $data['term_cate_01_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_01_id'] . '">test_category_01</a> (1)</li><li class="cat-item cat-item-' . $data['term_cate_02_id'] . '"><a href="' . home_url() . '/?cat=' . $data['term_cate_02_id'] . '">test_category_02</a> (1)</li></ul></div>',
			),
			array(
				'attributes' => array(
					'blockLabel'         => 'Main Category',
					'isSelectedTaxonomy' => 'category',
					'displayAsDropdown'  => true,
					'showHierarchy'      => true,
					'showPostCounts'     => true,
					'hideIfEmpty'        => true,
					'showOnlyTopLevel'   => true,
					'className'          => 'aaaa',
				),
				'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap aaaa wp-block-vk-blocks-taxonomy"><select name="category_name" id="vk_taxonomy-11" class="vk_taxonomy__input-wrap vk_taxonomy__input-wrap--select"><option value="0">All of Category</option><option class="level-0" value="test_category_01">test_category_01&nbsp;&nbsp;(1)</option><option class="level-0" value="test_category_02">test_category_02&nbsp;&nbsp;(1)</option></select></div><script type="text/javascript">/* <![CDATA[ */( function() {var dropdown = document.getElementById( "vk_taxonomy-11" );function onCatChange() {if ( !!dropdown.options[ dropdown.selectedIndex ].value ) {location.href = "' . home_url() . '/?category_name=" + dropdown.options[ dropdown.selectedIndex ].value;}}dropdown.onchange = onCatChange;})();/* ]]> */</script>',
			),
		);

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_get_taxonomy_form_html' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $tests as $key => $test_value ) {

			WP_Block_Supports::init();
			WP_Block_Supports::$block_to_render = array(
				'blockName' => 'vk-blocks/taxonomy',
				'attrs'     => $test_value['attributes'],
			);

			$return = vk_blocks_taxonomy_render_callback( $test_value['attributes'] );
			// 書式を統一化
			$return = str_replace( "'", '"', $return );
			$return = str_replace( '  ', ' ', $return );
			$return = str_replace( ' >', '>', $return );
			// delete before after space.
			$return = trim( $return );
			// convert tab and br to space.
			$return = preg_replace( '/[\n\r\t]/', '', $return );
			// Change multiple spaces to single space.
			$return = preg_replace( '/\s(?=\s)/', '', $return );

			// PHPunit
			print 'correct ::::' . $test_value['correct'] . PHP_EOL;
			print 'return  ::::' . $return . PHP_EOL;
			$this->assertEquals( $test_value['correct'], $return );
			print PHP_EOL;
		}
		unregister_post_type( 'event' );
		unregister_taxonomy( 'event_cat' );
	}
}
