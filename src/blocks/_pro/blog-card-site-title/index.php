<?php
/**
 * Registers the `vk-blocks/blog-card-site-title` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card Site Title render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_blog_card_site_title_render_callback( $attributes, $content, $block ) {
	if ( ! isset( $block->context['vk-blocks/blog-card-url'] ) ) {
		return null;
	}

	$data       = VK_Blocks_Blog_Card::vk_get_blog_card_data( $block->context['vk-blocks/blog-card-url'] );
	$site_title = ! empty( $data['site_title'] ) ? $data['site_title'] : false;
	$domain     = ! empty( $data['domain'] ) ? $data['domain'] : false;

	if ( ! $site_title ) {
		return null;
	}

	$tag_name = 'p';
	if ( isset( $attributes['level'] ) ) {
		$tag_name = 0 === $attributes['level'] ? 'p' : 'h' . (int) $attributes['level'];
	}

	if ( ! empty( $domain ) && $attributes['isLink'] ) {
		$rel         = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
		$link_target = ! empty( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '_self';

		$site_title = sprintf(
			'<a href="%1$s" target="%2$s" %3$s>%4$s</a>',
			esc_url( $domain ),
			esc_attr( $link_target ),
			$rel,
			esc_html( $site_title )
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
		$attributes['isLink'] ? $site_title : esc_html( $site_title )
	);
}

/**
 * Register block blog-card-site-title
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_site_title() {
	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_site_title_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_site_title', 99 );
