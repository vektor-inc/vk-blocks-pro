<?php

/**
 * Registers the `vk-blocks/select-post-list` block.
 */
if( function_exists('register_block_type_from_metadata')) {

	function register_block_vkb_select_post_list() {
		global $vk_blocks_common_attributes;
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'    => 'vk-blocks-build-editor-css',
				'editor_script'   => 'vk-blocks-build-js',
				'attributes'    => array_merge(
					array(
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
					),
					$vk_blocks_common_attributes
				),
				'render_callback' => 'vk_select_post_list_render_callback',
			)
		);
	}
	add_action( 'init', 'register_block_vkb_select_post_list', 99 );

	function vk_select_post_list_render_callback( $attributes, $content ) {
		$attributes = wp_parse_args(
			$attributes,
			array(
				'layout'                     => 'card',
				'col_xs'                     => 1,
				'col_sm'                     => 2,
				'col_md'                     => 3,
				'col_lg'                     => 3,
				'col_xl'                     => 3,
				'col_xxl'                    => 3,
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
			)
		);
		add_filter( 'vk_blocks_select_post_list_options', $attributes );

		return $content;
	}
}
