<?php

class VkBlocksPostList {

	/**
	 * Return html to display latest post list.
	 *
	 * @param $name
	 * @param $attributes
	 *
	 * @return string
	 */
	public function render_post_list( $attributes ) {

		$name = $attributes['name'];
		if($name === 'vk-blocks/post-list'){
			$wp_query = $this->get_loop_query( $attributes );
		} elseif ( $name === 'vk-blocks/child-page' ) {
			$wp_query = $this->get_loop_query_child( $attributes );
		}

		if ( $wp_query === false || $wp_query->posts === array() ) {
			return $this->renderNoPost();
		}

		$options = array(
			'layout'                     => $attributes['layout'],
			'slug'                       => '',
			'display_image'              => $attributes['display_image'],
			'display_image_overlay_term' => $attributes['display_image_overlay_term'],
			'display_excerpt'            => $attributes['display_excerpt'],
			'display_date'               => $attributes['display_date'],
			'display_new'                => $attributes['display_new'],
			'display_btn'                => $attributes['display_btn'],
			'image_default_url'          => VK_BLOCKS_URL . 'images/no-image.png',
			'overlay'                    => false,
			'new_text'                   => $attributes['new_text'],
			'new_date'                   => $attributes['new_date'],
			'btn_text'                   => $attributes['btn_text'],
			'btn_align'                  => $attributes['btn_align'],
			'class_outer'                => 'vk_PostList_card ' . VK_Component_Posts::get_col_size_classes( $attributes ),
			'class_title'                => '',
			'body_prepend'               => '',
			'body_append'                => '',
		);

		$options_loop = array( 'class_loop_outer' => 'vk_PostList' );
		$elm          = VK_Component_Posts::get_loop( $wp_query, $options, $options_loop );

		wp_reset_query();
		wp_reset_postdata();

		return $elm;
	}

	private function isArrayExist( $array ) {
		if ( ! $array ) {
			return false;
		}
	}

	private function format_terms( $isCheckedTerms ) {

		$return             = [];
		$return['relation'] = 'OR';

		foreach ( $isCheckedTerms as $key => $value ) {

			if ( $value !== [] ) {

				$new_array = array(
					'taxonomy' => $key,
					'field'    => 'slug',
					'terms'    => $value,
				);
				array_push( $return, $new_array );
			}
		}
		return $return;
	}

	public function get_loop_query( $attributes ) {

		$isCheckedPostType = json_decode( $attributes['isCheckedPostType'], true );
		$isCheckedTerms    = json_decode( $attributes['isCheckedTerms'], true );

		if ( empty( $isCheckedPostType ) ) {
			return false;
		}

		// $count      = ( isset( $instance['count'] ) && $instance['count'] ) ? $instance['count'] : 10;

		$args = array(
			'post_type'      => $isCheckedPostType,
			'tax_query'      => $this::format_terms( $isCheckedTerms ),
			'paged'          => 1,
			//0で全件取得
			'posts_per_page' => $attributes['numberPosts'],
			'order'          => 'DESC',
			'orderby'        => 'date',
		);

		return new WP_Query( $args );

	}

	public function get_loop_query_child($attributes){

		if ( $attributes['url'] === null || $attributes['url'] === '' ) {
			$parent_id = $attributes['postId'];
		} else if ( url_to_postid( $attributes['url'] ) !== 0 ) {
			$parent_id = url_to_postid( $attributes['url'] );
		} else {
			return $this->renderNoPost();
		}


//parent idが正しく指定されなかった時は、何も撮ってこないクエリを投げる
		$args =  array(
			'post_type'      => 'page',
			'paged'          => 0,
			//0で全件取得
			'order'          => 'DESC',
			'orderby'        => 'date',
			'post_parent' => $parent_id
		);

		return new WP_Query( $args );
	}

	public function renderNoPost() {
		return '<div>' . __( 'No Post is selected', 'vk-blocks' ) . '</div>';
	}

}


/**
 * Gutenberg Callback function.
 *
 * @param $name
 * @param $attributes
 *
 * @return string
 */
function vk_blocks_render_post_list( $attributes ) {

	$PostList = new VkBlocksPostList();

	return $PostList->render_post_list( $attributes );

}


//WP_Query::__set_state( array(
//	'query'                 => array(
//		'post_type'   => 'page',
//		'paged'       => 0,
//		'order'       => 'DESC',
//		'orderby'     => 'date',
//		'post_parent' => 38.0,
//	),
//	'query_vars'            => array(
//		'post_type'              => 'page',
//		'paged'                  => 0,
//		'order'                  => 'DESC',
//		'orderby'                => 'date',
//		'post_parent'            => 38.0,
//		'error'                  => '',
//		'm'                      => '',
//		'p'                      => 0,
//		'subpost'                => '',
//		'subpost_id'             => '',
//		'attachment'             => '',
//		'attachment_id'          => 0,
//		'name'                   => '',
//		'pagename'               => '',
//		'page_id'                => 0,
//		'second'                 => '',
//		'minute'                 => '',
//		'hour'                   => '',
//		'day'                    => 0,
//		'monthnum'               => 0,
//		'year'                   => 0,
//		'w'                      => 0,
//		'category_name'          => '',
//		'tag'                    => '',
//		'cat'                    => '',
//		'tag_id'                 => '',
//		'author'                 => '',
//		'author_name'            => '',
//		'feed'                   => '',
//		'tb'                     => '',
//		'meta_key'               => '',
//		'meta_value'             => '',
//		'preview'                => '',
//		's'                      => '',
//		'sentence'               => '',
//		'title'                  => '',
//		'fields'                 => '',
//		'menu_order'             => '',
//		'embed'                  => '',
//		'category__in'           => array(),
//		'category__not_in'       => array(),
//		'category__and'          => array(),
//		'post__in'               => array(),
//		'post__not_in'           => array(),
//		'post_name__in'          => array(),
//		'tag__in'                => array(),
//		'tag__not_in'            => array(),
//		'tag__and'               => array(),
//		'tag_slug__in'           => array(),
//		'tag_slug__and'          => array(),
//		'post_parent__in'        => array(),
//		'post_parent__not_in'    => array(),
//		'author__in'             => array(),
//		'author__not_in'         => array(),
//		'ignore_sticky_posts'    => false,
//		'suppress_filters'       => false,
//		'cache_results'          => true,
//		'update_post_term_cache' => true,
//		'lazy_load_term_meta'    => true,
//		'update_post_meta_cache' => true,
//		'posts_per_page'         => 10,
//		'nopaging'               => false,
//		'comments_per_page'      => '50',
//		'no_found_rows'          => false,
//	),
//	'tax_query'             => WP_Tax_Query::__set_state( array(
//		'queries'           => array(),
//		'relation'          => 'AND',
//		'table_aliases'     => array(),
//		'queried_terms'     => array(),
//		'primary_table'     => 'wp_posts',
//		'primary_id_column' => 'ID',
//	) ),
//	'meta_query'            => WP_Meta_Query::__set_state( array(
//		'queries'           => array(),
//		'relation'          => null,
//		'meta_table'        => null,
//		'meta_id_column'    => null,
//		'primary_table'     => null,
//		'primary_id_column' => null,
//		'table_aliases'     => array(),
//		'clauses'           => array(),
//		'has_or_relation'   => false,
//	) ),
//	'date_query'            => false,
//	'request'               => 'SELECT SQL_CALC_FOUND_ROWS wp_posts.ID FROM wp_posts WHERE 1=1 AND wp_posts.post_parent = 38 AND wp_posts.post_type = \'page\' AND (wp_posts.post_status = \'publish\' OR wp_posts.post_status = \'private\') ORDER BY wp_posts.post_date DESC LIMIT 0, 10',
//	'posts'                 => array(),
//	'post_count'            => 0,
//	'current_post'          => - 1,
//	'in_the_loop'           => false,
//	'comment_count'         => 0,
//	'current_comment'       => - 1,
//	'found_posts'           => 0,
//	'max_num_pages'         => 0,
//	'max_num_comment_pages' => 0,
//	'is_single'             => false,
//	'is_preview'            => false,
//	'is_page'               => false,
//	'is_archive'            => false,
//	'is_date'               => false,
//	'is_year'               => false,
//	'is_month'              => false,
//	'is_day'                => false,
//	'is_time'               => false,
//	'is_author'             => false,
//	'is_category'           => false,
//	'is_tag'                => false,
//	'is_tax'                => false,
//	'is_search'             => false,
//	'is_feed'               => false,
//	'is_comment_feed'       => false,
//	'is_trackback'          => false,
//	'is_home'               => false,
//	'is_404'                => false,
//	'is_embed'              => false,
//	'is_paged'              => false,
//	'is_admin'              => false,
//	'is_attachment'         => false,
//	'is_singular'           => false,
//	'is_robots'             => false,
//	'is_posts_page'         => false,
//	'is_post_type_archive'  => false,
//	'query_vars_hash'       => 'efc267526e2a91573959ce030080237d',
//	'query_vars_changed'    => false,
//	'thumbnails_cached'     => false,
//	'stopwords'             => null,
//	'compat_fields'         => array( 0 => 'query_vars_hash', 1 => 'query_vars_changed', ),
//	'compat_methods'        => array( 0 => 'init_query_flags', 1 => 'parse_tax_query', ),
//) )
//

//
//WP_Query::__set_state( array(
//	'query'                 => array(
//		'post_type'   => 'page',
//		'paged'       => 0,
//		'order'       => 'DESC',
//		'orderby'     => 'date',
//		'post_parent' => 5,
//	),
//	'query_vars'            => array(
//		'post_type'              => 'page',
//		'paged'                  => 0,
//		'order'                  => 'DESC',
//		'orderby'                => 'date',
//		'post_parent'            => 5,
//		'error'                  => '',
//		'm'                      => '',
//		'p'                      => 0,
//		'subpost'                => '',
//		'subpost_id'             => '',
//		'attachment'             => '',
//		'attachment_id'          => 0,
//		'name'                   => '',
//		'pagename'               => '',
//		'page_id'                => 0,
//		'second'                 => '',
//		'minute'                 => '',
//		'hour'                   => '',
//		'day'                    => 0,
//		'monthnum'               => 0,
//		'year'                   => 0,
//		'w'                      => 0,
//		'category_name'          => '',
//		'tag'                    => '',
//		'cat'                    => '',
//		'tag_id'                 => '',
//		'author'                 => '',
//		'author_name'            => '',
//		'feed'                   => '',
//		'tb'                     => '',
//		'meta_key'               => '',
//		'meta_value'             => '',
//		'preview'                => '',
//		's'                      => '',
//		'sentence'               => '',
//		'title'                  => '',
//		'fields'                 => '',
//		'menu_order'             => '',
//		'embed'                  => '',
//		'category__in'           => array(),
//		'category__not_in'       => array(),
//		'category__and'          => array(),
//		'post__in'               => array(),
//		'post__not_in'           => array(),
//		'post_name__in'          => array(),
//		'tag__in'                => array(),
//		'tag__not_in'            => array(),
//		'tag__and'               => array(),
//		'tag_slug__in'           => array(),
//		'tag_slug__and'          => array(),
//		'post_parent__in'        => array(),
//		'post_parent__not_in'    => array(),
//		'author__in'             => array(),
//		'author__not_in'         => array(),
//		'ignore_sticky_posts'    => false,
//		'suppress_filters'       => false,
//		'cache_results'          => true,
//		'update_post_term_cache' => true,
//		'lazy_load_term_meta'    => true,
//		'update_post_meta_cache' => true,
//		'posts_per_page'         => 10,
//		'nopaging'               => false,
//		'comments_per_page'      => '50',
//		'no_found_rows'          => false,
//	),
//	'tax_query'             => WP_Tax_Query::__set_state( array(
//		'queries'           => array(),
//		'relation'          => 'AND',
//		'table_aliases'     => array(),
//		'queried_terms'     => array(),
//		'primary_table'     => 'wp_posts',
//		'primary_id_column' => 'ID',
//	) ),
//	'meta_query'            => WP_Meta_Query::__set_state( array(
//		'queries'           => array(),
//		'relation'          => null,
//		'meta_table'        => null,
//		'meta_id_column'    => null,
//		'primary_table'     => null,
//		'primary_id_column' => null,
//		'table_aliases'     => array(),
//		'clauses'           => array(),
//		'has_or_relation'   => false,
//	) ),
//	'date_query'            => false,
//	'request'               => 'SELECT SQL_CALC_FOUND_ROWS wp_posts.ID FROM wp_posts WHERE 1=1 AND wp_posts.post_parent = 5 AND wp_posts.post_type = \'page\' AND (wp_posts.post_status = \'publish\' OR wp_posts.post_status = \'private\') ORDER BY wp_posts.post_date DESC LIMIT 0, 10',
//	'posts'                 => array(
//		0 => WP_Post::__set_state( array(
//			'ID'                    => 8,
//			'post_author'           => '1',
//			'post_date'             => '2019-12-06 07:13:52',
//			'post_date_gmt'         => '2019-12-06 07:13:52',
//			'post_content'          => '',
//			'post_title'            => '子ページ',
//			'post_excerpt'          => '',
//			'post_status'           => 'publish',
//			'comment_status'        => 'closed',
//			'ping_status'           => 'closed',
//			'post_password'         => '',
//			'post_name'             => '%e5%ad%90%e3%83%9a%e3%83%bc%e3%82%b8',
//			'to_ping'               => '',
//			'pinged'                => '',
//			'post_modified'         => '2019-12-06 07:13:52',
//			'post_modified_gmt'     => '2019-12-06 07:13:52',
//			'post_content_filtered' => '',
//			'post_parent'           => 5,
//			'guid'                  => 'http://vccw.test/?page_id=8',
//			'menu_order'            => 0,
//			'post_type'             => 'page',
//			'post_mime_type'        => '',
//			'comment_count'         => '0',
//			'filter'                => 'raw',
//		) ),
//	),
//	'post_count'            => 1,
//	'current_post'          => - 1,
//	'in_the_loop'           => false,
//	'post'                  => WP_Post::__set_state( array(
//		'ID'                    => 8,
//		'post_author'           => '1',
//		'post_date'             => '2019-12-06 07:13:52',
//		'post_date_gmt'         => '2019-12-06 07:13:52',
//		'post_content'          => '',
//		'post_title'            => '子ページ',
//		'post_excerpt'          => '',
//		'post_status'           => 'publish',
//		'comment_status'        => 'closed',
//		'ping_status'           => 'closed',
//		'post_password'         => '',
//		'post_name'             => '%e5%ad%90%e3%83%9a%e3%83%bc%e3%82%b8',
//		'to_ping'               => '',
//		'pinged'                => '',
//		'post_modified'         => '2019-12-06 07:13:52',
//		'post_modified_gmt'     => '2019-12-06 07:13:52',
//		'post_content_filtered' => '',
//		'post_parent'           => 5,
//		'guid'                  => 'http://vccw.test/?page_id=8',
//		'menu_order'            => 0,
//		'post_type'             => 'page',
//		'post_mime_type'        => '',
//		'comment_count'         => '0',
//		'filter'                => 'raw',
//	) ),
//	'comment_count'         => 0,
//	'current_comment'       => - 1,
//	'found_posts'           => '1',
//	'max_num_pages'         => 1.0,
//	'max_num_comment_pages' => 0,
//	'is_single'             => false,
//	'is_preview'            => false,
//	'is_page'               => false,
//	'is_archive'            => false,
//	'is_date'               => false,
//	'is_year'               => false,
//	'is_month'              => false,
//	'is_day'                => false,
//	'is_time'               => false,
//	'is_author'             => false,
//	'is_category'           => false,
//	'is_tag'                => false,
//	'is_tax'                => false,
//	'is_search'             => false,
//	'is_feed'               => false,
//	'is_comment_feed'       => false,
//	'is_trackback'          => false,
//	'is_home'               => false,
//	'is_404'                => false,
//	'is_embed'              => false,
//	'is_paged'              => false,
//	'is_admin'              => false,
//	'is_attachment'         => false,
//	'is_singular'           => false,
//	'is_robots'             => false,
//	'is_posts_page'         => false,
//	'is_post_type_archive'  => false,
//	'query_vars_hash'       => '79700064a9e25d9b7e2c86cb99190c5e',
//	'query_vars_changed'    => false,
//	'thumbnails_cached'     => false,
//	'stopwords'             => null,
//	'compat_fields'         => array( 0 => 'query_vars_hash', 1 => 'query_vars_changed', ),
//	'compat_methods'        => array( 0 => 'init_query_flags', 1 => 'parse_tax_query', ),
//) )
