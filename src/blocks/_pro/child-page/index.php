<?php
/**
 * Registers the `vk-blocks/child-page` block.
 */
if ( function_exists( 'register_block_type_from_metadata' ) ) {

	function vk_child_page_render_callback( $attributes ) {
		$wp_query     = Vk_Blocks_PostList::get_loop_query_child( $attributes );
		$options_loop = array( 'class_loop_outer' => 'vk_childPage' );

		return Vk_Blocks_PostList::render_post_list( $attributes, $wp_query, $options_loop );
	}

	function register_block_vkb_child_page() {
		global $vk_blocks_common_attributes;
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'    => 'vk-blocks-build-editor-css',
				'editor_script'   => 'vk-blocks-build-js',
				'attributes'      => array_merge(
					array(
						'selectId'                   => array(
							'type'    => 'number',
							'default' => -1,
						),
						'name'                       => array(
							'type'    => 'string',
							'default' => '',
						),
						'layout'                     => array(
							'type'    => 'string',
							'default' => 'card-horizontal',
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
							'default' => 2,
						),
						'col_lg'                     => array(
							'type'    => 'number',
							'default' => 2,
						),
						'col_xl'                     => array(
							'type'    => 'number',
							'default' => 2,
						),
						'col_xxl'                    => array(
							'type'    => 'number',
							'default' => 2,
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
							'default' => true,
						),
						'display_author'             => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'display_date'               => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'display_new'                => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'display_taxonomies'         => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'display_btn'                => array(
							'type'    => 'boolean',
							'default' => true,
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
							'default' => '{}',
						),
						'isCheckedTerms'             => array(
							'type'    => 'string',
							'default' => '[]',
						),
						'className'                  => array(
							'type'    => 'string',
							'default' => '',
						),
						'selfIgnore'                 => array(
							'type'    => 'boolean',
							'default' => false,
						),
					),
					$vk_blocks_common_attributes
				),
				'render_callback' => 'vk_child_page_render_callback',
			)
		);
	}
	add_action( 'init', 'register_block_vkb_child_page', 99 );
}
