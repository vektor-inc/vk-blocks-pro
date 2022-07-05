<?php
/**
 * Registers the `vk-blocks/archive-list` block.
 *
 * @package vk-blocks
 */

/**
 * Archive list render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_archive_list_render_callback( $attributes ) {
	$archives        = Vk_Blocks_ArchiveList::get_archive_list( $attributes );
	$options_archive = array( 'class_archive_outer' => 'vk_archiveList' );

	return Vk_Blocks_ArchiveList::render_archive_list( $attributes, $archives, $options_archive );
}

/**
 * Register block archive-list
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/archive-list',
			VK_BLOCKS_DIR_URL . 'build/archive-list/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'postType'        => array(
						'type'    => 'string',
						'default' => 'post',
					),
					'displayType'     => array(
						'type'    => 'string',
						'default' => 'monthly',
					),
					'displayDropdown' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showCount'       => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'className'       => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_archive_list_render_callback',
		)
	);

	// 投稿タイプの選択で使うスリストを作成
	$post_types = array();

	// 投稿が空でない場合にリスト・選択肢に追加.
	$get_posts = get_posts(
		array(
			'post_type'        => 'post',
			'suppress_filters' => false,
		)
	);
	if ( ! empty( $get_posts ) ) {
		$post_types[] = array(
			'label' => get_post_type_object( 'post' )->labels->singular_name,
			'slug'  => get_post_type_object( 'post' )->name,
		);
	}

	// その他の投稿タイプが空でない場合にリスト・選択肢に追加.
	$the_post_types = get_post_types(
		array(
			'public'   => true,
			'show_ui'  => true,
			'_builtin' => false,
		),
		'objects',
		'and'
	);

	foreach ( $the_post_types as $the_post_type ) {
		$get_posts = get_posts(
			array(
				'post_type'        => $the_post_type->name,
				'suppress_filters' => false,
			)
		);
		if ( ! empty( $get_posts ) ) {
			$post_types[] = array(
				'label' => $the_post_type->labels->singular_name,
				'slug'  => $the_post_type->name,
			);
		}
	}

	// ブロックに値を渡す
	wp_localize_script(
		'vk-blocks-build-js',
		'vk_block_archve_list_post_type_params',
		array(
			'post_types'	=> $post_types,
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );