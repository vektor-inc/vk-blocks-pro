<?php
/**
 * Server-side rendering of the `vk-blocks/post-template` block.
 *
 * @package vk-blocks
 */

/**
 * Queryブロックで作ったqueryからWP_Query形式に整形する.
 *
 * @param mixed $block Block context.
 * @param mixed $page Page Number.
 * @return mixed
 */
function vk_blocks_build_query_vars_from_query_block( $block, $page ) {
	$query = array(
		'post_type'    => 'post',
		'order'        => 'DESC',
		'orderby'      => 'date',
		'post__not_in' => array(),
	);

	if ( isset( $block->context['query'] ) ) {
		if ( ! empty( $block->context['query']['postType'] ) ) {
			$post_type_param = $block->context['query']['postType'];
			if ( is_post_type_viewable( $post_type_param ) ) {
				$query['post_type'] = $post_type_param;
			}
		}
		if ( isset( $block->context['query']['sticky'] ) && ! empty( $block->context['query']['sticky'] ) ) {
			$sticky = get_option( 'sticky_posts' );
			if ( 'only' === $block->context['query']['sticky'] ) {
				$query['post__in'] = $sticky;
			} else {
				$query['post__not_in'] = array_merge( $query['post__not_in'], $sticky );
			}
		}
		if ( ! empty( $block->context['query']['exclude'] ) ) {
			$excluded_post_ids     = array_map( 'intval', $block->context['query']['exclude'] );
			$excluded_post_ids     = array_filter( $excluded_post_ids );
			$query['post__not_in'] = array_merge( $query['post__not_in'], $excluded_post_ids );
		}
		if (
			isset( $block->context['query']['perPage'] ) &&
			is_numeric( $block->context['query']['perPage'] )
		) {
			$per_page = absint( $block->context['query']['perPage'] );
			$offset   = 0;

			if (
				isset( $block->context['query']['offset'] ) &&
				is_numeric( $block->context['query']['offset'] )
			) {
				$offset = absint( $block->context['query']['offset'] );
			}

			$query['offset']         = ( $per_page * ( $page - 1 ) ) + $offset;
			$query['posts_per_page'] = $per_page;
		}
		if ( ! empty( $block->context['query']['categoryIds'] ) ) {
			$term_ids              = array_map( 'intval', $block->context['query']['categoryIds'] );
			$term_ids              = array_filter( $term_ids );
			$query['category__in'] = $term_ids;
		}
		if ( ! empty( $block->context['query']['tagIds'] ) ) {
			$term_ids         = array_map( 'intval', $block->context['query']['tagIds'] );
			$term_ids         = array_filter( $term_ids );
			$query['tag__in'] = $term_ids;
		}
		if (
			isset( $block->context['query']['order'] ) &&
			in_array( strtoupper( $block->context['query']['order'] ), array( 'ASC', 'DESC' ), true )
		) {
			$query['order'] = strtoupper( $block->context['query']['order'] );
		}
		if ( isset( $block->context['query']['orderBy'] ) ) {
			$query['orderby'] = $block->context['query']['orderBy'];
		}
		if (
			isset( $block->context['query']['author'] ) &&
			(int) $block->context['query']['author'] > 0
		) {
			$query['author'] = (int) $block->context['query']['author'];
		}
		if ( ! empty( $block->context['query']['search'] ) ) {
			$query['s'] = $block->context['query']['search'];
		}
		if ( ! empty( $block->context['query']['postParent'] ) ) {
			$query['post_parent'] = $block->context['query']['postParent'];
		}
	}

	/**
	 * Filters the WP_Query args array from the `Query` block properties.
	 * https://github.com/WordPress/gutenberg/issues/36504
	 *
	 * @since 6.0.0
	 *
	 * @param string[] $query WP_Query args array.
	 * @param WP_Block $block Block instance.
	 * @param int      $page  Current query's page.
	 */
	return apply_filters( 'vk_blocks_query_vars_from_query_block', $query, $block, $page );
}

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
