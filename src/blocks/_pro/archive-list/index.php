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
	$options = array(
		'postType'        => esc_html( $attributes['postType'] ),
		'displayType'     => ( 'yearly' === $attributes['displayType'] ) ? 'yearly' : 'monthly',
		'displayDropdown' => $attributes['displayDropdown'] ? true : false,
		'showCount'       => $attributes['showCount'] ? true : false,
	);

	// Get archive list html
	$get_posts = get_posts(
		array(
			'post_type' => $options['postType'],
		)
	);

	if ( empty( $get_posts ) ) {
		return null;
	}

	$arg = array(
		'format'          => $options['displayDropdown'] ? 'option' : 'html',
		'show_post_count' => $options['showCount'],
		'echo'            => false,
		'post_type'       => $options['postType'],
	);

	if ( 'yearly' === $options['displayType'] ) {
		$arg['type'] = 'yearly';
		if ( ! $options['showCount'] && strtoupper( get_locale() ) === 'JA' ) {
			$arg['after'] = '年';
		}
	}

	$archives = wp_get_archives( $arg );

	if ( empty( $archives ) ) {
		// no archive
		return null;
	}

	$classes = 'vk_archiveList';

	// 非表示クラス
	if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
		$classes .= ' vk_hidden';
	}
	if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
		$classes .= ' vk_hidden-xxl';
	}
	if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
		$classes .= ' vk_hidden-xl';
	}
	if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
		$classes .= ' vk_hidden-lg';
	}
	if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
		$classes .= ' vk_hidden-md';
	}
	if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
		$classes .= ' vk_hidden-sm';
	}
	if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
		$classes .= ' vk_hidden-xs';
	}

	// block.jsonのSupportsで設定したクラス名やスタイルを取得する
	$wrapper_classes = get_block_wrapper_attributes( array( 'class' => $classes ) );

	$block_content = '';
	if ( $options['displayDropdown'] ) {
		// dropdown
		$label = '';
		if ( 'yearly' === $attributes['displayType'] ) {
			$label .= __( 'Please select year', 'vk-blocks-pro' );
		} else {
			$label .= __( 'Please select month', 'vk-blocks-pro' );
		}

		$block_content = sprintf(
			'<select name="archive-list-dropdown" onChange="document.location.href=this.options[this.selectedIndex].value;"><option value="">%1$s</option>%2$s</select>',
			$label,
			$archives
		);
	} else {
		// list
		$block_content = sprintf(
			'<ul class="vk_archive-list">%1$s</ul>',
			$archives
		);
	}
	$formatted_output = sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_classes,
		$block_content
	);

	// タブ、改行コード、連続した半角スペースを削除するための正規表現
	$pattern = "/\t|\r\n|\n|\r|\s{2,}/";

	// preg_replace を使用して、タブ、改行コード、および連続した半角スペースを削除
	$clean_output = preg_replace( $pattern, '', $formatted_output );
	return $clean_output;
}

/**
 * Register block archive-list
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {
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
			'post_types' => $post_types,
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );
