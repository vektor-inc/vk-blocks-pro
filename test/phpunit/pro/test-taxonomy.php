<?php

class TaxonomyTest extends WP_UnitTestCase {

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
		 * Empty Category 01 を作成
		 */
		$catarr             = array(
			'cat_name' => 'empty_category_01',
		);
		$data['cate_id_03'] = wp_insert_category( $catarr );

		/**
		 * Empty Category 02 を作成
		 */
		$catarr             = array(
			'cat_name' => 'empty_category_02',
		);
		$data['cate_id_04'] = wp_insert_category( $catarr );

		/**
		 * Test Event 01 を作成
		 */
		$args                = array(
			'slug' => 'test_event_01',
		);
		$term_info_01        = wp_insert_term( 'test_event_01', 'event_cat', $args );
		$data['event_id_01'] = $term_info_01['term_id'];

		/**
		 * Test Event 02 を作成
		 */
		$args                = array(
			'slug' => 'test_event_02',
		);
		$term_info_02        = wp_insert_term( 'test_event_02', 'event_cat', $args );
		$data['event_id_02'] = $term_info_02['term_id'];

		/**
		 * Empty Event 01 を作成
		 */
		$args                = array(
			'slug' => 'empty_event_01',
		);
		$term_info_01        = wp_insert_term( 'empty_event_01', 'event_cat', $args );
		$data['event_id_03'] = $term_info_01['term_id'];

		/**
		 * Empty Event 02 を作成
		 */
		$args                = array(
			'slug' => 'empty_event_02',
		);
		$term_info_02        = wp_insert_term( 'empty_event_02', 'event_cat', $args );
		$data['event_id_04'] = $term_info_02['term_id'];

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
        wp_set_post_tags( $data['post_id_01'], 'test_tag_01' );

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
        wp_set_post_tags( $data['post_id_02'], 'test_tag_02' );

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
		wp_set_object_terms( $data['event_id_01'], 'test_event_01', 'event_cat' );

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
		wp_set_object_terms( $data['event_id_02'], 'test_event_02', 'event_cat' );

        $tests = array(
            // デフォルト
            array(
                'attributes' => array(),
                'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><div class="vk_taxnomy-label">' . get_taxonomy( 'category' )->labels->singular_name . '</div><ul class="vkfs__input-wrap vkfs__input-wrap--list"><li class="cat-item cat-item-14"><a href="http://localhost:8889/?cat=14">empty_category_01</a></li><li class="cat-item cat-item-15"><a href="http://localhost:8889/?cat=15">empty_category_02</a></li><li class="cat-item cat-item-12"><a href="http://localhost:8889/?cat=12">test_category_01</a></li><li class="cat-item cat-item-13"><a href="http://localhost:8889/?cat=13">test_category_02</a></li><li class="cat-item cat-item-1"><a href="http://localhost:8889/?cat=1">Uncategorized</a></li></ul></div>'
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
                'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><div class="vk_taxnomy-label">' . get_taxonomy( 'category' )->labels->singular_name . '</div><ul class="vkfs__input-wrap vkfs__input-wrap--list"><li class="cat-item cat-item-14"><a href="http://localhost:8889/?cat=14">empty_category_01</a></li><li class="cat-item cat-item-15"><a href="http://localhost:8889/?cat=15">empty_category_02</a></li><li class="cat-item cat-item-12"><a href="http://localhost:8889/?cat=12">test_category_01</a></li><li class="cat-item cat-item-13"><a href="http://localhost:8889/?cat=13">test_category_02</a></li><li class="cat-item cat-item-1"><a href="http://localhost:8889/?cat=1">Uncategorized</a></li></ul></div>'
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
                'correct'    => '<div class="vk_taxonomy vk_taxonomy--category vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><div class="vk_taxnomy-label">Main Category</div><ul class="vkfs__input-wrap vkfs__input-wrap--list"><li class="cat-item cat-item-14"><a href="http://localhost:8889/?cat=14">empty_category_01</a></li><li class="cat-item cat-item-15"><a href="http://localhost:8889/?cat=15">empty_category_02</a></li><li class="cat-item cat-item-12"><a href="http://localhost:8889/?cat=12">test_category_01</a></li><li class="cat-item cat-item-13"><a href="http://localhost:8889/?cat=13">test_category_02</a></li><li class="cat-item cat-item-1"><a href="http://localhost:8889/?cat=1">Uncategorized</a></li></ul></div>'
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
                'correct'    => '<div class="vk_taxonomy vk_taxonomy--event_cat vk_taxonomy-outer-wrap wp-block-vk-blocks-taxonomy"><div class="vk_taxnomy-label">Main Event Category</div><ul class="vkfs__input-wrap vkfs__input-wrap--list"><li class="cat-item cat-item-18"><a href="http://localhost:8889/?event_cat=empty_event_01">empty_event_01</a></li><li class="cat-item cat-item-19"><a href="http://localhost:8889/?event_cat=empty_event_02">empty_event_02</a></li><li class="cat-item cat-item-16"><a href="http://localhost:8889/?event_cat=test_event_01">test_event_01</a></li><li class="cat-item cat-item-17"><a href="http://localhost:8889/?event_cat=test_event_02">test_event_02</a></li></ul></div>'
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
                'attrs'     => $test_value['attributes']
            );
            
			$return = vk_blocks_taxonomy_render_callback( $test_value['attributes'] );
            // 書式を統一化
            $return = str_replace( "'", '"', $return );
            $return = str_replace( "  ", " ", $return );
            $return = str_replace( " >", ">", $return );
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