<?php

/**
 * Registers the `vk-blocks/post-list` block.
 */
if( function_exists('register_block_type_from_metadata')) {

	function register_block_vkb_post_list() {
		global $vk_blocks_common_attributes;
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style' => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
				'attributes'      => array_merge(
					array(
						'name'                       => array(
							'type' => 'string',
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
						'col_xxl'                    => array(
							'type'    => 'number',
							'default' => 3,
						),
						'col_xl'                     => array(
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
							'default' => '[]',
						),
						'coreTerms'                  => array(
							'type'    => 'string',
							'default' => '{}',
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
				'render_callback' => 'vk_blocks_render_post_list',
			)
		);
	}
	add_action( 'init', 'register_block_vkb_post_list', 99 );
}
