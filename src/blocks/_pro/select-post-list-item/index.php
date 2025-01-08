<?php
/**
 * Registers the `vk-blocks/select-post-list-item` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Component\VK_Component_Posts;

/**
 * Register select-post-list-item Block
 *
 * @return void
 */
function vk_blocks_register_block_select_post_list_item() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array(
				'url'                        => array(
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
				'className'                  => array(
					'type'    => 'string',
					'default' => '',
				),
			),
			'render_callback' => 'vk_blocks_select_post_list_item_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_select_post_list_item', 99 );

/**
 * Render callback of select_post_list_item block
 *
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 * @return string
 */
function vk_blocks_select_post_list_item_render_callback( $attributes, $content ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'url'                        => '',
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
			'className'                  => '',
		)
	);

	$content = '';
	$post    = '';
	$columns = array(
		'col_xs'  => $attributes['col_xs'],
		'col_sm'  => $attributes['col_sm'],
		'col_md'  => $attributes['col_md'],
		'col_lg'  => $attributes['col_lg'],
		'col_xl'  => $attributes['col_xl'],
		'col_xxl' => $attributes['col_xxl'],
	);

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

	if ( 'postListText' !== $options['layout'] ) {
		// If get info of column that deploy col to class annd add
		if ( empty( $options['class_outer'] ) ) {
			$options['class_outer'] = VK_Component_Posts::get_col_size_classes( $columns );
		} else {
			$options['class_outer'] .= ' ' . VK_Component_Posts::get_col_size_classes( $columns );
		}
	}

	if ( ! empty( $attributes['url'] ) ) {
		$post_id = url_to_postid( $attributes['url'] );
		if ( ! empty( $post_id ) ) {
			$post = get_post( $post_id );
		}
	}

	if ( ! empty( $post ) && ! empty( $options ) ) {
		$content = VK_Component_Posts::get_view( $post, $options );
	}

	return $content;
}
