<?php
/**
 * Registers the `vk-blocks/post-list` block.
 *
 * @package vk-blocks
 */

/**
 * Post List Get Block Data
 *
 * @return array
 */
function vk_blocks_post_list_get_block_data() {

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
function vk_blocks_post_list_render_callback( $attributes ) {
	$wp_query     = Vk_Blocks_PostList::get_loop_query( $attributes );
	$options_loop = array( 'class_loop_outer' => 'vk_postList' );

	return Vk_Blocks_PostList::render_post_list( $attributes, $wp_query, $options_loop );
}

/**
 * Register block post-list
 *
 * @return void
 */
function vk_blocks_register_block_post_list() {
	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'name'                       => array(
						'type'    => 'string',
						'default' => '',
					),
					'layout'                     => array(
						'type'    => 'string',
						'default' => 'card',
					),
					'col_xs'                     => array(
						'type'    => 'number',
						'default' => 1,
					),
					'col_sm'                     => array(
						'type'    => 'number',
						'default' => 2,
					),
					'col_md'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_lg'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_xl'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_xxl'                    => array(
						'type'    => 'number',
						'default' => 3,
					),
					'display_image'              => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_image_overlay_term' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_excerpt'            => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_author'             => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_date'               => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_new'                => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_taxonomies'         => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_btn'                => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'new_date'                   => array(
						'type'    => 'number',
						'default' => 7,
					),
					'new_text'                   => array(
						'type'    => 'string',
						'default' => 'New!!',
					),
					'btn_text'                   => array(
						'type'    => 'string',
						'default' => 'Read more',
					),
					'btn_align'                  => array(
						'type'    => 'string',
						'default' => 'text-right',
					),
					'numberPosts'                => array(
						'type'    => 'number',
						'default' => 6,
					),
					'isCheckedPostType'          => array(
						'type'    => 'string',
						'default' => '["post"]',
					),
					'coreTerms'                  => array(
						'type'    => 'string',
						'default' => '[]',
					),
					'taxQueryRelation'           => array(
						'type'    => 'string',
						'default' => 'OR',
					),
					'isCheckedTerms'             => array(
						'type'    => 'string',
						'default' => '[]',
					),
					'targetPeriod'               => array(
						'type'    => 'string',
						'default' => 'all',
					),
					'order'                      => array(
						'type'    => 'string',
						'default' => 'DESC',
					),
					'orderby'                    => array(
						'type'    => 'string',
						'default' => 'date',
					),
					'offset'                     => array(
						'type'    => 'number',
						'default' => 0,
					),
					'pagedlock'                  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'selfIgnore'                 => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'stickyPosts'                => array(
						'type'    => 'string',
						'default' => 'include',
					),
					'className'                  => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_post_list_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_list', 99 );

/**
 * 投稿タイプとタクソノミーを JS に渡す
 */
function vk_blocks_post_list_set_data() {

	// データを取得
	$block_data = vk_blocks_post_list_get_block_data();

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
add_action( 'enqueue_block_editor_assets', 'vk_blocks_post_list_set_data' );
