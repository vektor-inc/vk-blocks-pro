<?php
/**
 * Registers the `vk-blocks/alert` block.
 *
 * @package vk-blocks
 */

/**
 * Register Alert block.
 *
 * @return void
 */
function vk_blocks_register_block_alert() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/alert',
			VK_BLOCKS_DIR_URL . 'build/alert/style.css',
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
			'label' => __( 'Any', 'vk-filter-search-pro-global-edition' ),
			'value' => '',
		),
	);
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms           = get_terms( $the_taxonomy->name );
		if ( ! empty( $terms ) ) {
			$taxonomy_option[] = array(
				'label' => $the_taxonomy->labels->singular_name,
				'value' => $the_taxonomy->name,
			);
		}
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/alert',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
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
add_action( 'init', 'vk_blocks_register_block_alert', 99 );

