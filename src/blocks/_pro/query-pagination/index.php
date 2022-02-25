<?php
/**
 * Server-side rendering of the `core/query-pagination` block.
 *
 * @package vk-blocks
 */

/**
 * Renders the `core/query-pagination` block on the server.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Block default content.
 *
 * @return string Returns the wrapper for the Query pagination.
 */
function vk_blocks_render_block_query_pagination( $attributes, $content ) {
	if ( empty( $content ) ) {
		return '';
	}

	return sprintf(
		'<div %1$s>%2$s</div>',
		get_block_wrapper_attributes(),
		$content
	);
}

/**
 * Registers the `core/query-pagination` block on the server.
 */
function vk_blocks_register_block_query_pagination() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/query-pagination',
			VK_BLOCKS_DIR_URL . 'build/_pro/query-pagination/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/query-pagination',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_render_block_query_pagination',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_query_pagination', 99 );
