<?php
/**
 * Registers the `vk-blocks/taxonomy` block.
 *
 * @package vk-blocks
 */

/**
 * Register Alert block.
 *
 * @return void
 */
function vk_blocks_register_block_taxonomy() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/taxonomy',
			VK_BLOCKS_DIR_URL . 'build/_pro/taxonomy/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	/**
	 * 選択させるタクソノミーのリストを生成し渡す
	 */
	// タクソノミーリストを生成.
	$the_taxonomies = get_taxonomies(
		array(
			'public'  => true,
			'show_ui' => true,
		),
		'objects',
		'and'
	);

	// タクソノミーブロックで使うタクソノミーの選択肢.
	$taxonomy_option = array(
		array(
			'label' => __( 'Any', 'vk-blocks' ),
			'value' => '',
		),
	);
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms = get_terms( $the_taxonomy->name );
		if ( ! empty( $terms ) ) {
			$taxonomy_option[] = array(
				'label' => $the_taxonomy->labels->singular_name,
				'value' => $the_taxonomy->name,
			);
		}
	}

	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/taxonomy',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'blockLabel'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'isSelectedTaxonomy' => array(
						'type'    => 'string',
						'default' => 'category',
					),
					'displayAsDropdown'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showHierarchy'      => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showPostCounts'     => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'hideIfEmpty'        => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showOnlyTopLevel'   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'className'          => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_taxonomy_render_callback',
		)
	);

	wp_localize_script(
		'vk-blocks-build-js',
		'vkTaxonomy',
		array(
			'taxonomyOption' => $taxonomy_option,
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_taxonomy', 99 );

/**
 * Render callback of Taxonomy block
 *
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 * @return string
 */
function vk_blocks_taxonomy_render_callback( $attributes, $content ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'blockLabel'         => '',
			'isSelectedTaxonomy' => 'category',
			'displayAsDropdown'  => false,
			'showHierarchy'      => false,
			'showPostCounts'     => false,
			'hideIfEmpty'        => false,
			'showOnlyTopLevel'   => false,
			'className'          => '',
		)
	);

	static $block_id = 0;
	++$block_id;

	$taxonomy_data = get_taxonomy( $attributes['isSelectedTaxonomy'] );
	$default_label = $taxonomy_data->labels->singular_name;

	$block_label = '' !== $attributes['blockLabel'] ? $attributes['blockLabel'] : $default_label;

	$common_args = array(
		'echo'         => false,
		'show_count'   => ! empty( $attributes['showPostCounts'] ) ? $attributes['showPostCounts'] : false,
		'hide_empty'   => ! empty( $attributes['hideIfEmpty'] ) ? $attributes['hideIfEmpty'] : false,
		'hierarchical' => ! empty( $attributes['showHierarchy'] ) ? $attributes['showHierarchy'] : false,
		'taxonomy'     => ! empty( $attributes['isSelectedTaxonomy'] ) ? $attributes['isSelectedTaxonomy'] : 'category',
	);
	$common_args = apply_filters( 'vk_blocks_taxlist_args', $common_args ); // 9.13.0.0

	$dropdown_args = array(
		// translators: 
		'show_option_all' => sprintf( __( 'All of %s', 'vk-blocks' ), $taxonomy_data->labels->singular_name ),
		'id'              => 'vk_taxonomy-' . $block_id,
		'class'           => 'vk_taxonomy__input-wrap vk_taxonomy__input-wrap--select',
	);

	$list_args = array(
		'style'           => 'list',
		'title_li'        => '',
		'show_option_all' => false,
	);

	$content  = '<div class="vk_taxonomy vk_taxonomy--' . $attributes['isSelectedTaxonomy'] . ' vk_taxonomy-outer-wrap ' . $attributes['className'] . '">';
	$content .= '<div class="vk_taxnomy-label">' . $block_label . '</div>';
	if ( ! empty( $attributes['displayAsDropdown'] ) ) {
		$content .= wp_dropdown_categories(
			array_merge(
				$common_args,
				$dropdown_args
			)
		);
	} else {
		$content .= '<ul class="vkfs__input-wrap vkfs__input-wrap--list">';
		$content .= wp_list_categories(
			array_merge(
				$common_args,
				$list_args
			)
		);
		$content .= '</ul>';
	}

	$content .= '</div>';

	return $content;
}
