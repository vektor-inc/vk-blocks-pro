<?php
/**
 * Registers the `vk-blocks/blog-card` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card excerpt render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_blog_card_2_render_callback( $attributes ) {
	if ( ! isset( $attributes['url'] ) ) {
		return null;
	}

	$data         = VK_Blocks_Blog_Card::vk_get_blog_card_data( $attributes['url'] );
	$cannot_embed = isset( $data['cannot_embed'] ) ? $data['cannot_embed'] : false;

	$classes = array();
	if ( isset( $attributes['cardType'] ) ) {
		$classes[] = $attributes['cardType'];
	}

	if ( $cannot_embed ) {
		$classes[] = 'cannot_embed';
		$content   = $attributes['url'];
	} else {
		$content = VK_Blocks_Blog_Card::vk_get_blog_card_html( $attributes['url'], false, $attributes );
	}

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

	return sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, $content );
}

/**
 * Register block block-blog-card-2
 *
 * @return void
 */
function vk_blocks_register_block_blog_card_2() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/blog_card_2',
			VK_BLOCKS_DIR_URL . 'build/_pro/blog-card-2/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/blog_card_2',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_2_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card_2', 99 );
