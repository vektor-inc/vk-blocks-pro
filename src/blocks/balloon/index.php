<?php
/**
 * VK Blocks - Balloon Blocks
 *
 * @package vk-blocks
 */

/**
 * Register balloon block.
 *
 * @return void
 */
function vk_blocks_register_block_vk_balloon() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/balloon',
			VK_BLOCKS_DIR_URL . 'build/balloon/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/balloon',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_vk_balloon', 99 );

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

		// タクソノミーブロックで警告を出す際に使うタクソノミーのリスト.
		$taxonomy_list = array();
		// タクソノミーブロックで使うタクソノミーの選択肢.
		$taxonomy_option = array(
			array(
				'label' => __( 'Any', 'vk-filter-search-pro-global-edition' ),
				'value' => '',
			),
		);
		foreach ( $the_taxonomies as $the_taxonomy ) {
			$taxonomy_list[] = array(
				'label' => $the_taxonomy->labels->singular_name,
				'value' => $the_taxonomy->name,
			);
			$terms           = get_terms( $the_taxonomy->name );
			if ( ! empty( $terms ) ) {
				$taxonomy_option[] = array(
					'label' => $the_taxonomy->labels->singular_name,
					'value' => $the_taxonomy->name,
				);
			}
		}
