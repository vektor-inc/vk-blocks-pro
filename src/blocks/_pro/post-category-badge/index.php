<?php
/**
 * Registers the `vk-blocks/post-category-badge` block.
 *
 * @package vk-blocks
 */

/**
 * Single Term render callback
 *
 * @param array    $attributes Block attributes.
 * @param string   $content Block content.
 * @param WP_Block $block Block context.
 * @return string
 */
function vk_blocks_post_category_badge_render_callback( $attributes, $content, $block ) {
	$post              = get_post( $block->context['postId'] );
	$taxonomy          = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : '';
	$max_display_count = isset( $attributes['maxDisplayCount'] ) ? $attributes['maxDisplayCount'] : 0;
	$gap               = isset( $attributes['gap'] ) ? $attributes['gap'] : array(
		'top'    => '0.5em',
		'right'  => '0.5em',
		'bottom' => '0.5em',
		'left'   => '0.5em',
	);

	// gapが文字列の場合は配列に変換（後方互換性）
	if ( is_string( $gap ) ) {
		$gap = array(
			'top'    => $gap,
			'right'  => $gap,
			'bottom' => $gap,
			'left'   => $gap,
		);
	}

	// gapの値を取得（topを使用）
	$gap_value = isset( $gap['top'] ) ? $gap['top'] : '0.5em';

	// 複数表示の場合（maxDisplayCount === 0 または 2以上）
	if ( 0 === $max_display_count || $max_display_count >= 2 ) {
		$terms = get_the_terms( $post, $taxonomy ? $taxonomy : 'category' );
		if ( ! $terms || is_wp_error( $terms ) ) {
			return '';
		}

		$output = '';
		$count  = 0;
		foreach ( $terms as $term ) {
			if ( 0 !== $max_display_count && $count >= $max_display_count ) {
				break;
			}
			$output .= vk_blocks_render_single_badge( $term, $attributes );
			++$count;
		}
		return '<div class="vk_categoryBadge_multiple" style="display: flex; gap: ' . esc_attr( $gap_value ) . '; flex-wrap: wrap;">' . $output . '</div>';
	}

	// 単一表示の場合（maxDisplayCount === 1）
	if ( class_exists( '\VektorInc\VK_Term_Color\VkTermColor' ) && method_exists( '\VektorInc\VK_Term_Color\VkTermColor', 'get_post_single_term_info' ) ) {
		$term_color_info = \VektorInc\VK_Term_Color\VkTermColor::get_post_single_term_info( $post, array( 'taxonomy' => $taxonomy ) );
	} else {
		return '';
	}

	if ( ! $term_color_info ) {
		return '';
	}
	$classes          = array( 'vk_categoryBadge' );
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	if ( ! empty( $align_class_name ) ) {
		array_push( $classes, $align_class_name );
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => implode( ' ', $classes ),
			'style' => 'background-color: ' . $term_color_info['color'] . ';' .
						'color:' . $term_color_info['text_color'] . ';',
		)
	);

	if ( $attributes['hasLink'] ) {
		return '<a ' . $wrapper_attributes . ' href="' . $term_color_info['term_url'] . '">' . $term_color_info['term_name'] . '</a>';
	} else {
		return '<div ' . $wrapper_attributes . '>' . $term_color_info['term_name'] . '</div>';
	}
}

/**
 * Render single badge
 *
 * @param WP_Term $term Term object.
 * @param array   $attributes Block attributes.
 * @return string
 */
function vk_blocks_render_single_badge( $term, $attributes ) {
	$classes          = array( 'vk_categoryBadge' );
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	if ( ! empty( $align_class_name ) ) {
		array_push( $classes, $align_class_name );
	}

	$color      = '#999999';
	$text_color = '';
	if ( class_exists( '\VektorInc\VK_Term_Color\VkTermColor' ) ) {
		$term_color = get_term_meta( $term->term_id, 'term_color', true );
		if ( $term_color ) {
			$color = $term_color;
		}
		$term_text_color = get_term_meta( $term->term_id, 'term_text_color', true );
		if ( $term_text_color ) {
			$text_color = $term_text_color;
		} else {
			// term_text_colorがなければ自動判定
			$text_color = \VektorInc\VK_Term_Color\VkTermColor::get_dynamic_text_color( $color );
		}
	} else {
		$text_color = '#FFFFFF';
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class' => implode( ' ', $classes ),
			'style' => 'background-color: ' . $color . ';' .
						'color:' . $text_color . ';',
		)
	);

	if ( $attributes['hasLink'] ) {
		return '<a ' . $wrapper_attributes . ' href="' . get_term_link( $term ) . '">' . $term->name . '</a>';
	} else {
		return '<div ' . $wrapper_attributes . '>' . $term->name . '</div>';
	}
}

/**
 * Build Category Badge Block variations.
 *
 * @return array
 */
function vk_blocks_post_category_badge_build_variations() {
	$taxonomies = get_taxonomies(
		array(
			'publicly_queryable' => true,
			'show_in_rest'       => true,
		),
		'objects'
	);

	// Split the available taxonomies to `built_in` and custom ones,
	// in order to prioritize the `built_in` taxonomies at the
	// search results.
	$built_ins         = array(
		array(
			'name'       => 'category-badge',
			'title'      => 'カテゴリーバッジ',
			'isDefault'  => true,
			'attributes' => array(
				'style' => array(
					'typography' => array(
						'fontSize'   => '0.8rem',
						'fontWeight' => '500',
					),
					'spacing'    => array(
						'padding' => array(
							'top'    => '0',
							'bottom' => '0',
							'left'   => '1em',
							'right'  => '1em',
						),
					),
				),
			),
		),
	);
	$custom_variations = array();

	// Create and register the eligible taxonomies variations.
	foreach ( $taxonomies as $taxonomy ) {
		if ( 'post_tag' === $taxonomy->name ) {
			continue;
		}

		$variation = array(
			'name'        => $taxonomy->name,
			'title'       => __( 'Category Badge', 'vk-blocks-pro' ) . ' / ' . $taxonomy->label,
			'description' => sprintf(
				/* translators: %s: taxonomy's label */
				__( 'Display a list of assigned terms from the taxonomy: %s', 'vk-blocks-pro' ),
				$taxonomy->label
			),
			'attributes'  => array(
				'taxonomy' => $taxonomy->name,
				'style'    => array(
					'typography' => array(
						'fontSize'   => '0.8rem',
						'fontWeight' => '500',
					),
					'spacing'    => array(
						'padding' => array(
							'top'    => '0',
							'bottom' => '0',
							'left'   => '1em',
							'right'  => '1em',
						),
					),
				),
			),
		);
		if ( $taxonomy->_builtin ) {
			$built_ins[] = $variation;
		} else {
			$custom_variations[] = $variation;
		}
	}

	return array_merge( $built_ins, $custom_variations );
}

/**
 * Register Category Badge block.
 *
 * @return void
 */
function vk_blocks_register_block_post_category_badge() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-category-badge',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-category-badge/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'              => 'vk-blocks/post-category-badge',
			'editor_style'       => 'vk-blocks-build-editor-css',
			'editor_script'      => 'vk-blocks-build-js',
			'render_callback'    => 'vk_blocks_post_category_badge_render_callback',
			'variation_callback' => 'vk_blocks_post_category_badge_build_variations',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_category_badge', 99 );
