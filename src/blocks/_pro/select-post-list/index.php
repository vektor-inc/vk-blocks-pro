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
						'numberPosts'                => array(
							'type'    => 'number',
							'default' => 6,
						),
						'postUrl1'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl2'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl3'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl4'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl5'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl6'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl7'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl8'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl9'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl10'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl11'                => array(
							'type'    => 'string',
							'default' => '',
						),
						'postUrl12'                => array(
							'type'    => 'string',
							'default' => '',
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
				'btn_align'                  =>'text-right',
				'numberPosts'                => 6,
				'postUrl1'                   => '',
				'postUrl2'                   => '',
				'postUrl3'                   => '',
				'postUrl4'                   => '',
				'postUrl5'                   => '',
				'postUrl6'                   => '',
				'postUrl7'                   => '',
				'postUrl8'                   => '',
				'postUrl9'                   => '',
				'postUrl10'                  => '',
				'postUrl11'                  => '',
				'postUrl12'                  => '',
			)
		);

		$options = array(
			'layout'                     => esc_html( $attributes['layout'] ),
			'col_xs'                     => esc_html( $attributes['col_xs'] ),
			'col_sm'                     => esc_html( $attributes['col_sm'] ),
			'col_md'                     => esc_html( $attributes['col_md'] ),
			'col_lg'                     => esc_html( $attributes['col_lg'] ),
			'col_xl'                     => esc_html( $attributes['col_xl'] ),
			'col_xxl'                    => esc_html( $attributes['col_xxl'] ),
			'display_image'              => esc_html( $attributes['display_image'] ),
			'display_image_overlay_term' => esc_html( $attributes['display_image_overlay_term'] ),
			'display_excerpt'            => esc_html( $attributes['display_excerpt'] ),
			'display_author'             => esc_html( $attributes['display_author'] ),
			'display_date'               => esc_html( $attributes['display_date'] ),
			'display_new'                => esc_html( $attributes['display_new'] ),
			'display_taxonomies'         => esc_html( $attributes['display_taxonomies'] ),
			'display_btn'                => esc_html( $attributes['display_btn'] ),
			'image_default_url'          => VK_BLOCKS_URL . 'images/no-image.png',
			'new_text'                   => esc_html( $attributes['new_text'] ),
			'new_date'                   => esc_html( $attributes['new_date'] ),
			'btn_text'                   => esc_html( $attributes['btn_text'] ),
			'btn_align'                  => esc_html( $attributes['btn_align'] ),
			'overlay'                    => false,
			'slug'                       => '',
			'class_outer'                => '',
			'class_title'                => '',
			'body_prepend'               => '',
			'body_append'                => '',
			'vkb_hidden'                 => $attributes['vkb_hidden'],
			'vkb_hidden_xxl'             => $attributes['vkb_hidden_xxl'],
			'vkb_hidden_xl'              => $attributes['vkb_hidden_xl'],
			'vkb_hidden_lg'              => $attributes['vkb_hidden_lg'],
			'vkb_hidden_md'              => $attributes['vkb_hidden_md'],
			'vkb_hidden_sm'              => $attributes['vkb_hidden_sm'],
			'vkb_hidden_xs'              => $attributes['vkb_hidden_xs'],
		);

		$post__in = array();
		for ( $i = 1; $i <= $attributes['numberPosts']; $i++ ) {
			if ( ! empty( $attributes[ 'postUrl' . $i ] ) ) {
				$post_url   = esc_url( $attributes[ 'postUrl' . $i ] );
				$post_id    = url_to_postid( $post_url );
				$post__in[] = $post_id;
			}
		}

		$query_args = array(
			'post_type'           => 'any',
			'post__in'            => $post__in,
			'ignore_sticky_posts' => true,
		);

		$wp_query = new WP_Query( $query_args );
		$options_loop = array( 'class_loop_outer' => 'vk_postList' );
		$content = VK_Component_Posts::get_loop( $wp_query, $options, $options_loop );

		wp_reset_query();
		wp_reset_postdata();

		return $content;

	}
}
