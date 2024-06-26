<?php
/**
 * Class VK Blocks PostList
 *
 * @package vk_blocks
 */

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
			$options_loop['class_loop_outer'] .= ' ' . $attributes['className'];
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
			'image_default_url'          => VK_BLOCKS_URL . 'images/no-image.png',
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
			'vkb_hidden'                 => isset( $attributes['vkb_hidden'] ) ? $attributes['vkb_hidden'] : '',
			'vkb_hidden_xxl'             => isset( $attributes['vkb_hidden_xxl'] ) ? $attributes['vkb_hidden_xxl'] : '',
			'vkb_hidden_xl'              => isset( $attributes['vkb_hidden_xl'] ) ? $attributes['vkb_hidden_xl'] : '',
			'vkb_hidden_xl_v2'           => isset( $attributes['vkb_hidden_xl_v2'] ) ? $attributes['vkb_hidden_xl_v2'] : '',
			'vkb_hidden_lg'              => isset( $attributes['vkb_hidden_lg'] ) ? $attributes['vkb_hidden_lg'] : '',
			'vkb_hidden_md'              => isset( $attributes['vkb_hidden_md'] ) ? $attributes['vkb_hidden_md'] : '',
			'vkb_hidden_sm'              => isset( $attributes['vkb_hidden_sm'] ) ? $attributes['vkb_hidden_sm'] : '',
			'vkb_hidden_xs'              => isset( $attributes['vkb_hidden_xs'] ) ? $attributes['vkb_hidden_xs'] : '',
			'marginTop'                  => isset( $attributes['marginTop'] ) ? $attributes['marginTop'] : '',
			'marginBottom'               => isset( $attributes['marginBottom'] ) ? $attributes['marginBottom'] : '',
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

		$is_checked_terms   = json_decode( $attributes['isCheckedTerms'], true );
		$tax_query_relation = isset( $attributes['taxQueryRelation'] ) ? $attributes['taxQueryRelation'] : 'OR';

		if ( empty( $is_checked_post_type ) ) {
			return false;
		}

		$post__not_in = array();
		if ( ! empty( $attributes['selfIgnore'] ) ) {
			$post__not_in = array( get_the_ID() );
		}

		$offset = isset( $attributes['offset'] ) ? intval( $attributes['offset'] ) : 0;

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
			$paged = $wp_query->query_vars['page'];
		} elseif ( isset( $wp_query->query_vars['paged'] ) ) {
			$paged = $wp_query->query_vars['paged'];
		}

		$all_posts    = array();
		$offset_count = 0;

		foreach ( $is_checked_post_type as $post_type ) {
			$args = array(
				'post_type'      => $post_type,
				'paged'          => 1,
				'posts_per_page' => -1,
				'order'          => $attributes['order'],
				'orderby'        => $attributes['orderby'],
				'post__not_in'   => $post__not_in,
				'date_query'     => $date_query,
			    // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				'tax_query'      => ! empty( $is_checked_terms ) ? self::format_terms( $tax_query_relation, $is_checked_terms, $post_type ) : array(),
			);

			if ( ! empty( $is_checked_terms ) ) {
				$args['tax_query'] = self::format_terms( $tax_query_relation, $is_checked_terms, $post_type );
			}

			$temp_query = new WP_Query( $args );
			$all_posts  = array_merge( $all_posts, $temp_query->posts );
		}

		if ( 'rand' === $attributes['orderby'] ) {
			shuffle( $all_posts );
		} else {
			usort(
				$all_posts,
				function ( $a, $b ) use ( $attributes ) {
					if ( 'date' === $attributes['orderby'] ) {
						if ( 'ASC' === $attributes['order'] ) {
							return strtotime( $a->post_date ) - strtotime( $b->post_date );
						} else {
							return strtotime( $b->post_date ) - strtotime( $a->post_date );
						}
					} elseif ( 'modified' === $attributes['orderby'] ) {
						if ( 'ASC' === $attributes['order'] ) {
							return strtotime( $a->post_modified ) - strtotime( $b->post_modified );
						} else {
							return strtotime( $b->post_modified ) - strtotime( $a->post_modified );
						}
					} elseif ( 'title' === $attributes['orderby'] ) {
						return strcmp( $a->post_title, $b->post_title ) * ( 'ASC' === $attributes['order'] ? 1 : -1 );
					} else {
						return 0;
					}
				}
			);
		}

		$all_posts = array_slice( $all_posts, $offset, intval( $attributes['numberPosts'] ) );

		$wp_query_combined             = new WP_Query();
		$wp_query_combined->posts      = $all_posts;
		$wp_query_combined->post_count = count( $all_posts );

		return $wp_query_combined;
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
