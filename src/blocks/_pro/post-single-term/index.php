<?php
/**
 * Registers the `vk-blocks/post-new-badge` block.
 *
 * @package vk-blocks
 */

/**
 * New Badge render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 * @return string
 */
function vk_blocks_post_single_term_render_callback( $attributes, $content, $block ) {
	$post = get_post($block->context['postId']);
	$wrapper_attributes = get_block_wrapper_attributes();
	return "<div $wrapper_attributes>" . 
	\VektorInc\VK_Term_Color\VkTermColor::get_single_term_with_color( $post ) . "</div>";
}

/**
 * Register New Badge block.
 *
 * @return void
 */
function vk_blocks_register_block_post_single_term() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-single-term',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-single-term/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/post-single-term',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_post_single_term_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_single_term', 99 );
