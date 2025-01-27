<?php
/**
 * Class VK Blocks PostList
 *
 * @package vk_blocks
 */

use VektorInc\VK_Component\VK_Component_Posts;

/**
 * VK Blocks PostList
 */
class Vk_Blocks_PostList {

	/**
	 * Return html to display latest post list.
	 *
	 * @param array  $attributes attributes.
	 * @param object $wp_query wp_query.
	 * @param array  $options_loop options loop.
	 *
	 * @return string
	 */
	public static function render_post_list( $attributes, $wp_query, $options_loop ) {

		if ( ! empty( $attributes['className'] ) ) {
			$options_loop['class_loop_outer'] .= ' ' . esc_attr( $attributes['className'] );
		}

		if ( ! isset( $wp_query ) || false === $wp_query || 'false' === $wp_query || empty( $wp_query->posts ) ) {
			return wp_kses_post( self::get_render_no_post( $wp_query ) );
		}
		$options = array(
			'layout'                     => esc_html( $attributes['layout'] ),
			'slug'                       => '',
			'display_image'              => esc_html( $attributes['display_image'] ),
			'display_image_overlay_term' => esc_html( $attributes['display_image_overlay_term'] ),
			'display_excerpt'            => esc_html( $attributes['display_excerpt'] ),
			'display_author'             => esc_html( $attributes['display_author'] ),
			'display_date'               => esc_html( $attributes['display_date'] ),
			'display_new'                => esc_html( $attributes['display_new'] ),
			'display_taxonomies'         => esc_html( $attributes['display_taxonomies'] ),
			'display_btn'                => esc_html( $attributes['display_btn'] ),
			'image_default_url'          => esc_url( VK_BLOCKS_URL . 'images/no-image.png' ),
			'overlay'                    => false,
			'new_text'                   => esc_html( $attributes['new_text'] ),
			'new_date'                   => esc_html( $attributes['new_date'] ),
			'btn_text'                   => esc_html( $attributes['btn_text'] ),
			'btn_align'                  => esc_html( $attributes['btn_align'] ),
			'col_xs'                     => esc_html( $attributes['col_xs'] ),
			'col_sm'                     => esc_html( $attributes['col_sm'] ),
			'col_md'                     => esc_html( $attributes['col_md'] ),
			'col_lg'                     => esc_html( $attributes['col_lg'] ),
			'col_xl'                     => esc_html( $attributes['col_xl'] ),
			'col_xxl'                    => esc_html( $attributes['col_xxl'] ),
			'class_outer'                => '',
			'class_title'                => '',
			'body_prepend'               => '',
			'body_append'                => '',
			'vkb_hidden'                 => isset( $attributes['vkb_hidden'] ) ? esc_attr( $attributes['vkb_hidden'] ) : '',
			'vkb_hidden_xxl'             => isset( $attributes['vkb_hidden_xxl'] ) ? esc_attr( $attributes['vkb_hidden_xxl'] ) : '',
			'vkb_hidden_xl'              => isset( $attributes['vkb_hidden_xl'] ) ? esc_attr( $attributes['vkb_hidden_xl'] ) : '',
			'vkb_hidden_xl_v2'           => isset( $attributes['vkb_hidden_xl_v2'] ) ? esc_attr( $attributes['vkb_hidden_xl_v2'] ) : '',
			'vkb_hidden_lg'              => isset( $attributes['vkb_hidden_lg'] ) ? esc_attr( $attributes['vkb_hidden_lg'] ) : '',
			'vkb_hidden_md'              => isset( $attributes['vkb_hidden_md'] ) ? esc_attr( $attributes['vkb_hidden_md'] ) : '',
			'vkb_hidden_sm'              => isset( $attributes['vkb_hidden_sm'] ) ? esc_attr( $attributes['vkb_hidden_sm'] ) : '',
			'vkb_hidden_xs'              => isset( $attributes['vkb_hidden_xs'] ) ? esc_attr( $attributes['vkb_hidden_xs'] ) : '',
			'marginTop'                  => isset( $attributes['marginTop'] ) ? esc_attr( $attributes['marginTop'] ) : '',
			'marginBottom'               => isset( $attributes['marginBottom'] ) ? esc_attr( $attributes['marginBottom'] ) : '',
		);

		$elm = VK_Component_Posts::get_loop( $wp_query, $options, $options_loop );

		wp_reset_postdata();

		return $elm;
	}

	/**
	 * Is Array Exist
	 *
	 * @param array $arr array.
	 *
	 * @return bool
	 */
	private function is_array_exist( $arr ) {
		if ( ! $arr ) {
			return false;
		}
		return true;
	}

	/**
	 * Format Terms
	 *
	 * @param array  $tax_query_relation : AND or OR.
	 * @param array  $is_checked_terms : checked terms. チェックされたタームidの配列.
	 * @param string $post_type Post type.
	 *
	 * @return array $return : tax_query
	 */
	private static function format_terms( $tax_query_relation, $is_checked_terms, $post_type ) {
		$return = array(
			'relation' => $tax_query_relation,
		);

		foreach ( $is_checked_terms as $term_id ) {
			$term = get_term( $term_id );
			if ( ! $term || is_wp_error( $term ) ) {
				continue; // Skip invalid or non-existent terms
			}
			$post_type_taxonomies = get_object_taxonomies( $post_type );

			if ( in_array( $term->taxonomy, $post_type_taxonomies, true ) ) {
				$new_array = array(
					'taxonomy' => $term->taxonomy,
					'field'    => 'term_id',
					'terms'    => $term_id,
				);
				$return[]  = $new_array;
			}
		}
		return $return;
	}

	/**
	 * Get Loop Query
	 *
	 * @param array $attributes attributes.
	 *
	 * @return WP_Query|bool WP_Query object or false.
	 */
	public static function get_loop_query( $attributes ) {

		$is_checked_post_type = json_decode( $attributes['isCheckedPostType'], true );
		$is_checked_terms     = json_decode( $attributes['isCheckedTerms'], true );
		$tax_query_relation   = isset( $attributes['taxQueryRelation'] ) ? $attributes['taxQueryRelation'] : 'OR';

		if ( empty( $is_checked_post_type ) ) {
			return false;
		}

		$post__not_in = array();
		if ( ! empty( $attributes['selfIgnore'] ) ) {
			$post__not_in = array( get_the_ID() );
		}

		$offset         = isset( $attributes['offset'] ) ? intval( $attributes['offset'] ) : 0;
		$posts_per_page = isset( $attributes['numberPosts'] ) ? intval( $attributes['numberPosts'] ) : 0;

		$date_query = array();
		if ( ! empty( $attributes['targetPeriod'] ) ) {
			switch ( $attributes['targetPeriod'] ) {
				case 'from-today':
					$date_query = array(
						array(
							'column'    => 'post_date_gmt',
							'after'     => gmdate( 'Y-m-d' ),
							'inclusive' => true,
						),
					);
					break;
				case 'from-now':
					$date_query = array(
						array(
							'column'    => 'post_date_gmt',
							'after'     => gmdate( 'Y-m-d H:i:s' ),
							'inclusive' => true,
						),
					);
					break;
				case 'from-tomorrow':
					$date_query = array(
						array(
							'column'    => 'post_date_gmt',
							'after'     => gmdate( 'Y-m-d', strtotime( '+1 day' ) ),
							'inclusive' => true,
						),
					);
					break;
			}
		}

		global $wp_query;

		// とりあえず１を入れつつ2ページ目の情報があったら上書き
		$paged = 1;
		if ( ! empty( $attributes['pagedlock'] ) ) {
			$paged = 1;
		} elseif ( is_singular() && isset( $wp_query->query_vars['page'] ) ) {
			$paged  = $wp_query->query_vars['page'] ? $wp_query->query_vars['page'] : 1;
			$offset = $offset + $posts_per_page * ( $paged - 1 );
		} elseif ( isset( $wp_query->query_vars['paged'] ) ) {
			$paged  = $wp_query->query_vars['paged'] ? $wp_query->query_vars['paged'] : 1;
			$offset = $offset + $posts_per_page * ( $paged - 1 );
		}

		$args = array(
			'post_type'              => $is_checked_post_type,
			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			'tax_query'              => ! empty( $is_checked_terms ) ? self::format_terms( $tax_query_relation, $is_checked_terms, $is_checked_post_type ) : array(),
			'paged'                  => $paged,
			// 0で全件取得
			'posts_per_page'         => $posts_per_page,
			'order'                  => $attributes['order'],
			'orderby'                => $attributes['orderby'],
			'post__not_in'           => array_map( 'intval', $post__not_in ),
			'date_query'             => $date_query,
			'update_post_meta_cache' => false,
			'no_found_rows'          => true,
		);

		if ( ! is_null( $offset ) ) {
			$args['offset'] = $offset;
		}

		if ( ! empty( $date_query ) ) {
			$args['date_query'] = $date_query;
		}

		$sticky_posts = isset( $attributes['stickyPosts'] ) ? $attributes['stickyPosts'] : 'include';

		switch ( $sticky_posts ) {
			case 'include':
				$args['ignore_sticky_posts'] = false;
				break;

			case 'exclude':
				$args['post__not_in']        = array_merge( $args['post__not_in'], get_option( 'sticky_posts' ) );
				$args['ignore_sticky_posts'] = true;
				break;

			case 'only':
				$sticky_posts = get_option( 'sticky_posts' );
				if ( ! empty( $sticky_posts ) ) {
					$args['post__in']       = $sticky_posts;
					$args['posts_per_page'] = count( $sticky_posts );
					$args['orderby']        = 'post__in';
				} else {
					$args['post__in'] = array( 0 );
				}
				break;
		}

		$args = apply_filters( 'vk_blocks_post_list_query_args', $args, $attributes );

		return new WP_Query( $args );
	}

	/**
	 * Get Loop Query Child
	 *
	 * @param array $attributes attributes.
	 *
	 * @return WP_Query|bool WP_Query object or false.
	 */
	public static function get_loop_query_child( $attributes ) {

		// ParentIdを指定.
		if ( isset( $attributes['selectId'] ) && 'false' !== $attributes['selectId'] ) {
			$select_id = ( $attributes['selectId'] > 0 ) ? $attributes['selectId'] : get_the_ID();

			$post__not_in = array();
			if ( ! empty( $attributes['selfIgnore'] ) ) {
				$post__not_in = array( get_the_ID() );
			}

			$offset = '';
			if ( ! empty( $attributes['offset'] ) ) {
				$offset = intval( $attributes['offset'] );
			}

			$args = array(
				'post_type'      => 'page',
				'paged'          => 0,
				// 0で全件取得
				'posts_per_page' => -1,
				'order'          => 'ASC',
				'orderby'        => 'menu_order',
				'post_parent'    => intval( $select_id ),
				'offset'         => $offset,
				'post__not_in'   => $post__not_in,
			);
			return new WP_Query( $args );
		} else {
			return false;
		}
	}

	/**
	 * Render No Posts
	 *
	 * @param object $wp_query @since 1.27.0.
	 * @return string
	 */
	public static function get_render_no_post( $wp_query = null ) {
		$name = '';
		if ( ! empty( $wp_query->query['post_type'] ) ) {
			if ( is_array( $wp_query->query['post_type'] ) ) {
				$post_type = $wp_query->query['post_type'][0];
			} else {
				$post_type = $wp_query->query['post_type'];
			}
			$post_type_object = get_post_type_object( $post_type );
			if ( ! empty( $post_type_object->label ) ) {
				$name = $post_type_object->label;
			}
		}

		if ( ! $name ) {
			$name = __( 'Post', 'vk-blocks-pro' );
		}

		/* translators: %s: 投稿タイプ名 */
		$html = '<div class="alert alert-warning text-center">' . sprintf( __( 'There are no %ss.', 'vk-blocks-pro' ), $name ) . '</div>';
		return apply_filters( 'vk_blocks_post_list_render_no_post', $html, $wp_query );
	}
}
