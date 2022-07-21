<?php
/**
 * Registers the `vk-blocks/archive-list` block.
 *
 * @package vk-blocks
 */

/**
 * Archive list render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_ancestor_page_list_render_callback( $attributes ) {

	global $post;

	if ( $post->ancestors ) {
		foreach ( $post->ancestors as $post_anc_id ) {
			$post_id = $post_anc_id;
		}
	} else {
		$post_id = $post->ID;
	}

	if ( $post_id ) {
		$page_list = wp_list_pages(
			array(
				'title_li' => '',
				'child_of' => $post_id,
				'echo'     => 0,
			)
		);

		if ( ! $page_list ) {
			return '';
		}
	}
	wp_reset_query();
	wp_reset_postdata();

	// 非表示クラス.
	$classes = 'vk_ancestorPageList';
	if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
		$classes .= ' vk_hidden';
	}
	if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
		$classes .= ' vk_hidden-xxl';
	}
	if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
		$classes .= ' vk_hidden-xl';
	}
	if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
		$classes .= ' vk_hidden-lg';
	}
	if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
		$classes .= ' vk_hidden-md';
	}
	if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
		$classes .= ' vk_hidden-sm';
	}
	if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
		$classes .= ' vk_hidden-xs';
	}

	// block.jsonのSupportsで設定したクラス名やスタイルを取得する.
	$wrapper_classes = get_block_wrapper_attributes( array( 'class' => $classes ) );
	$title           = '<h3>' . esc_html( $post->post_title ) . '</h3>';
	$block           = sprintf(
		'<aside %1$s>' . $title . '<ul %1$s>%2$s</ul></aside>',
		$wrapper_classes,
		$page_list
	);
	return $block;
}

/**
 * Register block archive-list
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {
	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'className' => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				array(
					'hideGrandChild' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_ancestor_page_list_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );
