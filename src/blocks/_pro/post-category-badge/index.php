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
	$post     = get_post( $block->context['postId'] );
	$taxonomy = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : '';

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

function vk_blocks_block_core_post_terms_build_variations() {
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
		$variation = array(
			'name'        => $taxonomy->name,
			'title'       => 'カテゴリーバッジ/' . $taxonomy->label,
			'description' => sprintf(
				/* translators: %s: taxonomy's label */
				__( 'Display a list of assigned terms from the taxonomy: %s' ),
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
			'variation_callback' => 'vk_blocks_block_core_post_terms_build_variations',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_category_badge', 99 );
