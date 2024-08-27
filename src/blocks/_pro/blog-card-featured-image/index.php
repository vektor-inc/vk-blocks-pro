<?php
/**
 * Registers the `vk-blocks/blog-card` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card Featured Image render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_blog_card_featured_image_render_callback( $attributes, $content, $block ) {
	if ( ! isset( $block->context['vk-blocks/blog-card-url'] ) ) {
		return '';
	}

	$data          = VK_Blocks_Blog_Card::vk_get_blog_card_data( $block->context['vk-blocks/blog-card-url'] );
	$thumbnail_url = ! empty( $data['featured_image'] ) ? $data['featured_image'] : false;

	if ( ! $thumbnail_url ) {
		return null;
	}

	$is_link = isset( $attributes['isLink'] ) && $attributes['isLink'];
	$attr    = get_block_core_post_featured_image_border_attributes( $attributes );

	$extra_styles = '';

	// Aspect ratio with a height set needs to override the default width/height.
	if ( ! empty( $attributes['aspectRatio'] ) ) {
		$extra_styles .= 'width:100%;height:100%;';
	} elseif ( ! empty( $attributes['height'] ) ) {
		$extra_styles .= "height:{$attributes['height']};";
	}

	if ( ! empty( $attributes['scale'] ) ) {
		$extra_styles .= "object-fit:{$attributes['scale']};";
	}

	if ( ! empty( $extra_styles ) ) {
		$attr['style'] = empty( $attr['style'] ) ? $extra_styles : $attr['style'] . $extra_styles;
	}

	$attr          = array_map( 'esc_attr', $attr );
	$favicon_image = rtrim( "<img src='$thumbnail_url'" );

	foreach ( $attr as $name => $value ) {
		$favicon_image .= " $name=" . '"' . $value . '"';
	}

	$favicon_image .= ' />';

	if ( $is_link ) {
		$link_target   = $attributes['linkTarget'];
		$rel           = ! empty( $attributes['rel'] ) ? 'rel="' . esc_attr( $attributes['rel'] ) . '"' : '';
		$height        = ! empty( $attributes['height'] ) ? 'style="' . esc_attr( safecss_filter_attr( 'height:' . $attributes['height'] ) ) . '"' : '';
		$favicon_image = sprintf(
			'<a href="%1$s" target="%2$s" %3$s %4$s>%5$s</a>',
			$block->context['vk-blocks/blog-card-url'],
			esc_attr( $link_target ),
			$rel,
			$height,
			$favicon_image
		);
	} else {
		$favicon_image = $favicon_image;
	}

	$aspect_ratio = ! empty( $attributes['aspectRatio'] )
		? esc_attr( safecss_filter_attr( 'aspect-ratio:' . $attributes['aspectRatio'] ) ) . ';'
		: '';
	$width        = ! empty( $attributes['width'] )
		? esc_attr( safecss_filter_attr( 'width:' . $attributes['width'] ) ) . ';'
		: '';
	$height       = ! empty( $attributes['height'] )
		? esc_attr( safecss_filter_attr( 'height:' . $attributes['height'] ) ) . ';'
		: '';
	if ( ! $height && ! $width && ! $aspect_ratio ) {
		$wrapper_attributes = get_block_wrapper_attributes();
	} else {
		$wrapper_attributes = get_block_wrapper_attributes( array( 'style' => $aspect_ratio . $width . $height ) );
	}
	return "<figure {$wrapper_attributes}>{$favicon_image}</figure>";
}

/**
 * Register block blog-card-featured-image
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_featured_image() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/blog-card-featured-image',
			VK_BLOCKS_DIR_URL . 'build/_pro/blog-card-featured-image/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/blog-card-featured-image',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_featured_image_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_featured_image', 99 );
