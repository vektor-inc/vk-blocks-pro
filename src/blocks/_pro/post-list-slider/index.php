<?php
/**
 * Registers the `vk-blocks/post-list-slider` block.
 *
 * @package vk-blocks
 */

/**
 * Post List Get Block Data
 *
 * @return array
 */
function vk_blocks_post_list_slider_get_block_data() {

	// Create $post_type_option ///////////////////////////
	$the_post_types = get_post_types(
		// Only public post types.
		array(
			'public' => true,
		),
		'objects',
		'and'
	);

	$post_type_option = array();
	foreach ( $the_post_types as $post_type ) {
		$post_type_option[] = array(
			'label' => $post_type->label,
			'slug'  => $post_type->name,
		);
	}

	// Set up taxonomies ///////////////////////////
	$the_taxonomies = get_taxonomies(
		// Only public taxonomies.
		array(
			'public' => true,
		),
		'objects',
		'and'
	);

	$term_by_taxonomy_name = array();
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms                                        = array_values(
			get_terms(
				array(
					'taxonomy'   => $the_taxonomy->name,
					'hide_empty' => false,
				)
			)
		);
		$term_by_taxonomy_name[ $the_taxonomy->name ] = array_map(
			function ( $term ) {
				return array(
					'term_id' => $term->term_id,
					'name'    => $term->name,
				);
			},
			$terms
		);
	}

	$data = array(
		'post_type_option'      => $post_type_option,
		'term_by_taxonomy_name' => $term_by_taxonomy_name,
	);

	return $data;
}

/**
 * Post list render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_post_list_slider_render_callback( $attributes ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'layout'                     => 'card',
			'display_image'              => true,
			'display_image_overlay_term' => true,
			'display_excerpt'            => false,
			'display_author'             => false,
			'display_date'               => true,
			'display_new'                => true,
			'display_taxonomies'         => false,
			'display_btn'                => false,
			'new_date'                   => 7,
			'new_text'                   => 'New!!',
			'btn_text'                   => 'Read more',
			'btn_align'                  => 'text-right',
			'numberPosts'                => 6,
			'isCheckedPostType'          => '["post"]',
			'coreTerms'                  => '[]',
			'taxQueryRelation'           => 'OR',
			'isCheckedTerms'             => '[]',
			'targetPeriod'               => 'all',
			'order'                      => 'DESC',
			'orderby'                    => 'date',
			'offset'                     => 0,
			'pagedlock'                  => false,
			'selfIgnore'                 => false,
			'className'                  => '',
		)
	);

	$wp_query = Vk_Blocks_PostList::get_loop_query( $attributes );

	$options = array(
		'layout'                     => $attributes['layout'],
		'display_image'              => $attributes['display_image'],
		'display_image_overlay_term' => $attributes['display_image_overlay_term'],
		'display_excerpt'            => $attributes['display_excerpt'],
		'display_author'             => $attributes['display_author'],
		'display_date'               => $attributes['display_date'],
		'display_new'                => $attributes['display_new'],
		'display_taxonomies'         => $attributes['display_taxonomies'],
		'display_btn'                => $attributes['display_btn'],
		'new_date'                   => $attributes['new_date'],
		'new_text'                   => $attributes['new_text'],
		'btn_text'                   => $attributes['btn_text'],
		'btn_align'                  => $attributes['btn_align'],
		'image_default_url'          => VK_BLOCKS_URL . 'images/no-image.png',
		'overlay'                    => false,
		'slug'                       => '',
		'class_outer'                => $attributes['className'],
	);

	$html = '';

	if ( $wp_query->have_posts() ) {
		$html .= '<div class="swiper">';
		$html .= '<div class="swiper-wrapper">';
		while ( $wp_query->have_posts() ) {
			$wp_query->the_post();
			$html .= '<div class="swiper-slide">';
			global $post;
			$html .= VK_Component_Posts::get_view( $post, $options );
			$html .= '</div>';
		}
		$html .= '</div>';
		$html .= '<div class="swiper-button-prev"></div>';
		$html .= '<div class="swiper-button-next"></div>';
		$html .= '</div>';
	}
	wp_reset_postdata();
	return $html;
}

/**
 * Register block post-list
 *
 * @return void
 */
function vk_blocks_register_block_post_list_slider() {

	register_block_type(
		__DIR__,
		array(
			'render_callback' => 'vk_blocks_post_list_slider_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_list_slider', 99 );

/**
 * 投稿タイプとタクソノミーを JS に渡す
 */
function vk_blocks_post_list_slider_set_data() {

	// データを取得
	$block_data = vk_blocks_post_list_slider_get_block_data();

	// PHPで作った投稿タイプとタクソノミー情報をjsに渡す ///////////////////////////
	// Pass post type and taxonomy information created in PHP to js /////////
	wp_localize_script(
		'vk-blocks-build-js',
		'vk_block_post_type_params',
		array(
			'post_type_option'      => $block_data['post_type_option'],
			'term_by_taxonomy_name' => $block_data['term_by_taxonomy_name'],
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'vk_blocks_post_list_slider_set_data' );