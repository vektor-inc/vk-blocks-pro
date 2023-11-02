<?php
/**
 * Registers the `vk-blocks/blog-card-excerpt` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card excerpt render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_blog_card_excerpt_render_callback( $attributes, $content, $block ) {
	if ( ! isset( $block->context['vk-blocks/blog-card-url'] ) ) {
		return null;
	}

	$data    = VK_Blocks_Blog_Card::vk_get_blog_card_data( $block->context['vk-blocks/blog-card-url'] );
	$excerpt = ! empty( $data['excerpt'] ) ? $data['excerpt'] : false;

	if ( ! $excerpt ) {
		return null;
	}

	if ( isset( $attributes['excerptLength'] ) ) {
		$excerpt = wp_trim_words( $excerpt, $attributes['excerptLength'] );
	}

	$classes = array();
	if ( isset( $attributes['textAlign'] ) ) {
		$classes[] = 'has-text-align-' . $attributes['textAlign'];
	}

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

	$content = '<p class="wp-block-vk-blocks-blog-card-excerpt__excerpt">' . $excerpt . '</p>';
	return sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, $content );
}

/**
 * Register block blog-card-excerpt
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_excerpt() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/blog-card-excerpt',
			VK_BLOCKS_DIR_URL . 'build/_pro/blog-card-excerpt/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/blog-card-excerpt',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_excerpt_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_excerpt', 99 );
