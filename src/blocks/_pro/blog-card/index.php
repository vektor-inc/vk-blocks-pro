<?php
/**
 * Registers the `vk-blocks/blog-card` block.
 *
 * @package vk-blocks
 */

/**
 * Blog Card excerpt render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @return string
 */
function vk_blocks_blog_card_render_callback( $attributes, $content ) {
	if ( ! isset( $attributes['url'] ) ) {
		return null;
	}

	$data         = VK_Blocks_Blog_Card::vk_get_blog_card_data( $attributes['url'] );
	$cannot_embed = ! empty( $data['cannot_embed'] ) ? $data['cannot_embed'] : false;

	if ( $cannot_embed ) {
		$wrapper_attributes = get_block_wrapper_attributes();
		$content            = $attributes['url'];
		return sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, $content );
	}

	return $content;
}

/**
 * Register block blog-card
 *
 * @return void
 */
function vk_blocks_register_block_blog_card() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/blog-card',
			VK_BLOCKS_DIR_URL . 'build/_pro/blog-card/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/blog-card',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_blog_card_render_callback',
			'providesContext' => array(
				'url',
			),
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_blog_card', 99 );
