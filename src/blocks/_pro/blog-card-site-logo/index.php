<?php
/**
 * Registers the `vk-blocks/blog-card-site-logo` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card Site Logo render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_blog_card_site_logo_render_callback( $attributes, $content, $block ) {
	if ( ! isset( $block->context['vk-blocks/blog-card-url'] ) ) {
		return '';
	}

	$data          = VK_Blocks_Blog_Card::vk_get_blog_card_data( $block->context['vk-blocks/blog-card-url'] );
	$site_logo_url = ! empty( $data['site_logo'] ) ? $data['site_logo'] : false;
	$domain        = ! empty( $data['domain'] ) ? $data['domain'] : false;

	if ( ! $site_logo_url ) {
		return null;
	}

	$is_link = isset( $attributes['isLink'] ) && $attributes['isLink'];
	$attr    = get_block_core_post_featured_image_border_attributes( $attributes );

	$attr          = array_map( 'esc_attr', $attr );
	$favicon_image = rtrim( "<img src='$site_logo_url'" );

	foreach ( $attr as $name => $value ) {
		$favicon_image .= " $name=" . '"' . $value . '"';
	}

	$favicon_image .= ' />';

	if ( ! empty( $domain ) && $is_link ) {
		$link_target   = $attributes['linkTarget'];
		$rel           = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
		$favicon_image = sprintf(
			'<a href="%1$s" target="%2$s" %3$s>%4$s</a>',
			esc_url( $domain ),
			esc_attr( $link_target ),
			$rel,
			$favicon_image
		);
	} else {
		$favicon_image = $favicon_image;
	}

	$wrapper_attributes = get_block_wrapper_attributes();
	return "<figure {$wrapper_attributes}>{$favicon_image}</figure>";
}

/**
 * Register block blog-card-site-logo
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_site_logo() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/blog-card-site-logo',
			VK_BLOCKS_DIR_URL . 'build/_pro/blog-card-site-logo/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/blog-card-site-logo',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_site_logo_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_site_logo', 99 );
