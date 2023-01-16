<?php
/**
 * Registers the `vk-blocks/post-list` block.
 *
 * @package vk-blocks
 */

/**
 * Post List Get Block Data
 * 
 * @return array
 */
function vk_blocks_post_list_get_block_data() {

	// キャッシュを取得
	$transients = get_transient( 'vk_blocks_post_list_block_data' );

	// キャッシュがあればそれを返す
	if ( ! empty( $transients ) ) {
		return $transients;
	}

	// Create $post_type_option ///////////////////////////
	$the_post_types = get_post_types(
		// Only public post types.
		array(
			'public' => true,
		),
		'objects',
		'and'
	);

	$post_type_option = array();
	foreach ( $the_post_types as $post_type ) {
		$post_type_option[] = array(
			'label' => $post_type->label,
			'slug'  => $post_type->name,
		);
	}

	// Set up taxonomies ///////////////////////////
	$the_taxonomies = get_taxonomies(
		// Only public taxonomies.
		array(
			'public' => true,
		),
		'objects',
		'and'
	);

	$term_by_taxonomy_name = array();
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms                                        = array_values( get_terms( $the_taxonomy->name, array( 'hide_empty' => false ) ) );
		$term_by_taxonomy_name[ $the_taxonomy->name ] = array_map(
			function( $term ) {
				return array(
					'term_id' => $term->term_id,
					'name'    => $term->name,
				);
			},
			$terms
		);
	}

	$data = array(
		'post_type_option'      => $post_type_option,
		'term_by_taxonomy_name' => $term_by_taxonomy_name,
	);

	set_transient( 'vk_blocks_post_list_block_data', $data, 60 * 60 * 24 );

	return $data;

}

/**
 * 編集画面を開いた時点で条件付きでキャッシュをクリア
 */
function vk_blocks_post_list_editor_refresh_block_data() {

	// オプションを取得
	$options = VK_Blocks_Options::get_options();

	// キャッシュの有効時間（秒）
	$cache_time = 60 * 60;

	// 最後にキャッシュされた時間を取得
	$last_cached = ! empty( $options['last-block-data-cached'] ) ? $options['last-block-data-cached'] : '1970-01-01 00:00:00' ;

	// 現在の時刻を取得
	$current_time = date( 'Y-m-d H:i:s' );

	// 差分を取得・キャッシュが初めてならキャッシュの有効時間が経過したものとみなす
	$diff = strtotime( $current_time ) -  strtotime( $last_cached );

	// フラグがなければパターンのデータのキャッシュをパージ
	if ( $diff > $cache_time  ) {
		// パターンのデータのキャッシュをパージ
		delete_transient( 'vkfs_block_data' );
		// 最後にキャッシュされた時間を更新
		$options['last-block-data-cached'] = $current_time;
		// 最低１時間はキャッシュを保持
		update_option( 'vk_blocks_options', $options );
	}
}
add_action( 'load-post.php', 'vk_blocks_post_list_editor_refresh_block_data' );
add_action( 'load-post-new.php', 'vk_blocks_post_list_editor_refresh_block_data' );
add_action( 'load-site-editor.php', 'vk_blocks_post_list_editor_refresh_block_data' );

/**
 * Post list render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_post_list_render_callback( $attributes ) {
	$wp_query     = Vk_Blocks_PostList::get_loop_query( $attributes );
	$options_loop = array( 'class_loop_outer' => 'vk_postList' );

	return Vk_Blocks_PostList::render_post_list( $attributes, $wp_query, $options_loop );
}

/**
 * Register block post-list
 *
 * @return void
 */
function vk_blocks_register_block_post_list() {
	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'name'                       => array(
						'type'    => 'string',
						'default' => '',
					),
					'layout'                     => array(
						'type'    => 'string',
						'default' => 'card',
					),
					'col_xs'                     => array(
						'type'    => 'number',
						'default' => 1,
					),
					'col_sm'                     => array(
						'type'    => 'number',
						'default' => 2,
					),
					'col_md'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_lg'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_xl'                     => array(
						'type'    => 'number',
						'default' => 3,
					),
					'col_xxl'                    => array(
						'type'    => 'number',
						'default' => 3,
					),
					'display_image'              => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_image_overlay_term' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_excerpt'            => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_author'             => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_date'               => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_new'                => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'display_taxonomies'         => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'display_btn'                => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'new_date'                   => array(
						'type'    => 'number',
						'default' => 7,
					),
					'new_text'                   => array(
						'type'    => 'string',
						'default' => 'New!!',
					),
					'btn_text'                   => array(
						'type'    => 'string',
						'default' => 'Read more',
					),
					'btn_align'                  => array(
						'type'    => 'string',
						'default' => 'text-right',
					),
					'numberPosts'                => array(
						'type'    => 'number',
						'default' => 6,
					),
					'isCheckedPostType'          => array(
						'type'    => 'string',
						'default' => '["post"]',
					),
					'coreTerms'                  => array(
						'type'    => 'string',
						'default' => '[]',
					),
					'taxQueryRelation'           => array(
						'type'    => 'string',
						'default' => 'OR',
					),
					'isCheckedTerms'             => array(
						'type'    => 'string',
						'default' => '[]',
					),
					'targetPeriod'               => array(
						'type'    => 'string',
						'default' => 'all',
					),
					'order'                      => array(
						'type'    => 'string',
						'default' => 'DESC',
					),
					'orderby'                    => array(
						'type'    => 'string',
						'default' => 'date',
					),
					'offset'                     => array(
						'type'    => 'number',
						'default' => 0,
					),
					'selfIgnore'                 => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'className'                  => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_post_list_render_callback',
		)
	);

	// キャッシュからデータを取得
	$block_data = vk_blocks_post_list_get_block_data();

	// PHPで作った投稿タイプとタクソノミー情報をjsに渡す ///////////////////////////
	// Pass post type and taxonomy information created in PHP to js /////////
	wp_localize_script(
		'vk-blocks-build-js',
		'vk_block_post_type_params',
		array(
			'post_type_option'      => $block_data['post_type_option'],
			'term_by_taxonomy_name' => $block_data['term_by_taxonomy_name'],
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_list', 99 );
