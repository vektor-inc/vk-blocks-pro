<?php

/*
$ vagrant ssh
$ cd $(wp theme path --dir lightning)
$ bash bin/install-wp-tests.sh wordpress_test root 'WordPress' localhost latest
$ phpunit
*/

class Get_Post_List_Data_Test extends WP_UnitTestCase {

	function test_get_block_data() {



		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'Get_Post_List_Data' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		/**
		 * カスタム投稿タイプを設置
		 */
		register_post_type(
			'event',
			array(
                'label'       => 'Event',
				'has_archive' => true,
                'public'   => true,
                'show_ui'  => true,
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
                'public'   => true,
                'show_ui'  => true,
			)
		);

		/**
		 * Test Category 01 を作成
		 */
		$catarr             = array(
			'cat_name' => 'test_category_01',
		);
		$data['cate_id_01'] = wp_insert_category( $catarr );

		/**
		 * Test Category 02 を作成
		 */
		$catarr             = array(
			'cat_name' => 'test_category_02',
		);
		$data['cate_id_02'] = wp_insert_category( $catarr );

		/**
		 * Event Test 01 を作成
		 */
		$args                = array(
			'slug' => 'event_test_01',
		);
		$term_info_01        = wp_insert_term( 'event_test_01', 'event_cat', $args );
		$data['event_cat_id_01'] = $term_info_01['term_id'];

		/**
		 * Event Test 02 を作成
		 */
		$args                = array(
			'slug' => 'event_test_02',
		);
		$term_info_02        = wp_insert_term( 'event_test_02', 'event_cat', $args );
		$data['event_cat_id_02'] = $term_info_02['term_id'];

		/**
		 * Test Post 01 を作成
		 */
		$post               = array(
			'post_title'    => 'test-post-01',
			'post_status'   => 'publish',
			'post_content'  => 'test-content-01',
			'post_category' => array( $data['cate_id_01'] ),
			'post_date'     => '2021-11-01 00:00:00',
			'post_modified' => '2022-01-01 00:00:00',
		);
		$data['post_id_01'] = wp_insert_post( $post );
		add_post_meta( $data['post_id_01'], 'test_field_01', 1000 );
		add_post_meta( $data['post_id_01'], 'test_field_02', 10000 );

		/**
		 * Test Post 02 を作成
		 */
		$post               = array(
			'post_title'    => 'test-post-02',
			'post_status'   => 'publish',
			'post_content'  => 'test-content-02',
			'post_category' => array( $data['cate_id_02'] ),
			'post_date'     => '2021-05-01 00:00:00',
			'post_modified' => '2021-07-01 00:00:00',
		);
		$data['post_id_02'] = wp_insert_post( $post );
		add_post_meta( $data['post_id_02'], 'test_field_01', 2000 );
		add_post_meta( $data['post_id_02'], 'test_field_02', 20000 );

		/**
		 * Test Post 03 を作成（カスタムフィールドに数字が文字列として保存されてしまっている場合）
		 */
		$post               = array(
			'post_title'   => 'test-post-03',
			'post_status'  => 'publish',
			'post_content' => 'test-content-03',
			'post_date'     => '2021-03-01 00:00:00',
			'post_modified' => '2021-05-01 00:00:00',
		);
		$data['post_id_03'] = wp_insert_post( $post );
		add_post_meta( $data['post_id_03'], 'number_string', '1000' );

		/**
		 * Test Page 01 を作成
		 */
		$post            = array(
			'post_title'    => 'test-page-01',
			'post_type'     => 'page',
			'post_status'   => 'publish',
			'post_content'  => 'content',
			'post_date'     => '2020-07-01 00:00:00',
			'post_modified' => '2022-01-01 00:00:00',
		);
		$data['page_id'] = wp_insert_post( $post );

		/**
		 * Test Event 01 を作成.
		 */
		$post                = array(
			'post_title'    => 'test-event-01',
			'post_type'     => 'event',
			'post_status'   => 'publish',
			'post_content'  => 'event-content-01',
			'post_date'     => '2021-05-01 00:00:00',
			'post_modified' => '2021-11-01 12:00:00',
		);
		$data['event_id_01'] = wp_insert_post( $post );
		wp_set_object_terms( $data['event_id_01'], 'event_test_01', 'event_cat' );
		add_post_meta( $data['event_id_01'], 'test_field_01', 3000 );
		add_post_meta( $data['event_id_01'], 'test_field_02', 30000 );

		/**
		 * Test Event 02 を作成.
		 */
		$post                = array(
			'post_title'    => 'test-event-02',
			'post_type'     => 'event',
			'post_status'   => 'publish',
			'post_content'  => 'event-content-02',
			'post_date'     => '2021-07-01 00:00:00',
			'post_modified' => '2022-01-01 12:00:00',
		);
		$data['event_id_02'] = wp_insert_post( $post );
		wp_set_object_terms( $data['event_id_02'], 'event_test_02', 'event_cat' );
		add_post_meta( $data['event_id_02'], 'test_field_01', 4000 );
		add_post_meta( $data['event_id_02'], 'test_field_02', 40000 );

        delete_transient( 'vk_blocks_post_list_block_data' );

        $return  = vk_blocks_post_list_get_block_data();
        $correct = array(
			'post_type_option'         => array(
                array(
					'label' => get_post_type_object( 'post' )->label,
					'slug'  => get_post_type_object( 'post' )->name,
				),
                array(
					'label' => get_post_type_object( 'page' )->label,
					'slug'  => get_post_type_object( 'page' )->name,
				),
				array(
					'label' => get_post_type_object( 'attachment' )->label,
					'slug'  => get_post_type_object( 'attachment' )->name,
				),
                array(
					'label' => get_post_type_object( 'event' )->label,
					'slug'  => get_post_type_object( 'event' )->name,
				),
            ),
			'term_by_taxonomy_name'             => array(
				'category' => array(
					array(
						'term_id' => $data['cate_id_01'],
						'name'    => 'test_category_01',
					),
					array(
						'term_id' => $data['cate_id_02'],
						'name'    => 'test_category_02',
					),
					array(
						'term_id' => ( int ) get_term_by( 'name', 'Uncategorized', 'category' )->term_id,
						'name'    => 'Uncategorized',
					),
				),
				'post_tag'    => array(),
				'post_format' => array(),
				'event_cat'   => array(
					array(
						'term_id' => $data['event_cat_id_01'],
						'name'    => 'event_test_01',
					),
					array(
						'term_id' => $data['event_cat_id_02'],
						'name'    => 'event_test_02',
					),
				)

            ),
		);

        // PHPunit
        print 'correct ::::' . PHP_EOL;
        var_dump( $correct );
        print 'return  ::::' . PHP_EOL;
        var_dump( $return );



		$this->assertEquals( $return, $correct );

	}
}