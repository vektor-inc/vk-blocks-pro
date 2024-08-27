<?php
/**
 * Registers the `vk-blocks/blog-card-title` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card Title callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_blog_card_title_render_callback( $attributes, $content, $block ) {
	if ( ! isset( $block->context['vk-blocks/blog-card-url'] ) ) {
		return null;
	}

	$data  = VK_Blocks_Blog_Card::vk_get_blog_card_data( $block->context['vk-blocks/blog-card-url'] );
	$title = ! empty( $data['title'] ) ? $data['title'] : false;

	if ( ! $title ) {
		return null;
	}

	$tag_name = 'h5';
	if ( isset( $attributes['level'] ) ) {
		$tag_name = 'h' . $attributes['level'];
	}

	if ( isset( $attributes['isLink'] ) && $attributes['isLink'] ) {
		$rel   = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
		$title = sprintf(
			'<a href="%1$s" target="%2$s" %3$s>%4$s</a>',
			esc_url( $block->context['vk-blocks/blog-card-url'] ),
			esc_attr( $attributes['linkTarget'] ),
			$rel,
			$title
		);
	}

	$classes = array();
	if ( isset( $attributes['textAlign'] ) ) {
		$classes[] = 'has-text-align-' . $attributes['textAlign'];
	}
	if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
		$classes[] = 'has-link-color';
	}
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$title
	);
}

/**
 * Register block blog-card-title
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_title() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_title_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_title', 99 );
