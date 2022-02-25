<?php
/**
 * Server-side rendering of the `vk-blocks/post-template` block.
 *
 * @package vk-blocks
 */

/**
 * Renders the `vk-blocks/post-template` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the output of the query, structured using the layout defined by the block's inner blocks.
 */
function vk_blocks_render_block_post_template( $attributes, $content, $block ) {
	$page_key = isset( $block->context['queryId'] ) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page';
	$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];

	$query_args = vk_blocks_build_query_vars_from_query_block( $block, $page );
	// Override the custom query with the global query if needed.
	$use_global_query = ( isset( $block->context['query']['inherit'] ) && $block->context['query']['inherit'] );
	if ( $use_global_query ) {
		global $wp_query;
		if ( $wp_query && isset( $wp_query->query_vars ) && is_array( $wp_query->query_vars ) ) {
			// Unset `offset` because if is set, $wp_query overrides/ignores the paged parameter and breaks pagination.
			unset( $query_args['offset'] );
			$query_args = wp_parse_args( $wp_query->query_vars, $query_args );

			if ( empty( $query_args['post_type'] ) && is_singular() ) {
				$query_args['post_type'] = get_post_type( get_the_ID() );
			}
		}
	}

	$query = new WP_Query( $query_args );

	if ( ! $query->have_posts() ) {
		return '';
	}

	// カラムのクラス名
	$classnames = '';
	if ( isset( $block->context['displayLayout'] ) && isset( $block->context['query'] ) ) {
		if ( isset( $block->context['displayLayout']['type'] ) && 'flex' === $block->context['displayLayout']['type'] ) {
			$classnames = "is-flex-container columns-{$block->context['displayLayout']['columns']}";
		}
	}

	// useBlockProps的な属性がとれる
	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $classnames ) );

	// WP_Block https://developer.wordpress.org/reference/classes/wp_block/
	$content = '';
	while ( $query->have_posts() ) {
		$query->the_post();
		$block_content = (
			new WP_Block(
				$block->parsed_block,
				array(
					'postType' => get_post_type(),
					'postId'   => get_the_ID(),
				)
			)
		)->render( array( 'dynamic' => false ) ); // phpcs:ignore
		$post_classes  = implode( ' ', get_post_class( 'wp-block-post' ) );
		$content      .= '<div class="' . esc_attr( $post_classes ) . '">' . $block_content . '</div>';
	}

	wp_reset_postdata();

	return sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_attributes,
		$content
	);
}

/**
 * Registers the `vk-blocks/post-template` block on the server.
 */
function vk_blocks_register_block_post_template() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-template',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-template/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'             => 'vk-blocks/post-template',
			'editor_style'      => 'vk-blocks-build-editor-css',
			'editor_script'     => 'vk-blocks-build-js',
			'render_callback'   => 'vk_blocks_render_block_post_template',
			'skip_inner_blocks' => true,
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_template', 99 );
