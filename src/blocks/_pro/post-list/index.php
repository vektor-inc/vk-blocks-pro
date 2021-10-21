<?php
/**
 * Registers the `vk-blocks/post-list` block.
 *
 * @package vk-blocks
 */

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

	// Register Script.
	$asset = include VK_BLOCKS_DIR_PATH . 'build/_pro/post-list/block-build.asset.php';
	wp_register_script(
		'vk-blocks/post-list',
		VK_BLOCKS_DIR_URL . 'build/_pro/post-list/block-build.js',
		$asset['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

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
					'isCheckedTerms'             => array(
						'type'    => 'string',
						'default' => '[]',
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
					'selfIgnore'                 => array(
						'type'    => 'boolean',
						'default' => false,
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

	$the_taxonomies = get_taxonomies(
		array(),
		'objects',
		'and'
	);

	$term_by_taxonomy_name = array();
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms                                        = get_terms( $the_taxonomy->name, array( 'hide_empty' => false ) );
		$term_by_taxonomy_name[ $the_taxonomy->name ] = array_map(
			function( $term ) {
				return array(
					'term_id' => $term->term_id,
					'name'    => $term->name,
				);
			},
			$terms
		);
	}

	wp_localize_script(
		'vk-blocks-build-js',
		'vk_block_post_type_params',
		array(
			'term_by_taxonomy_name' => $term_by_taxonomy_name,
		)
	);

	wp_localize_script(
		'vk-blocks/post-list',
		'vk_block_post_type_params',
		array(
			'term_by_taxonomy_name' => $term_by_taxonomy_name,
		)
	);	

}
add_action( 'init', 'vk_blocks_register_block_post_list', 99 );

