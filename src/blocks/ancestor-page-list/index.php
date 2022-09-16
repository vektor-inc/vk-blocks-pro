<?php
/**
 * Registers the `vk-blocks/archive-list` block.
 *
 * @package vk-blocks
 */

/**
 * Get Ancestor Page ID
 * 先祖階層の投稿IDを取得する関数
 *
 * @return init $post_anc_id : 先祖階層の投稿ID
 */
function vk_blocks_get_ancestor_page_id() {
	global $post;
	$post_anc_id = '';
	if ( ! empty( $post ) && ! empty( $post->ancestors ) ) {
		foreach ( $post->ancestors as $post_id ) {
			$post_anc_id = $post_id;
		}
	} elseif ( ! empty( $post ) ) {
		$post_anc_id = $post->ID;
	}
	return $post_anc_id;
}

/**
 * Get Block heading part html
 * ブロックのタイトル部分のHTMLを取得する関数
 *
 * @param array $attributes : block attributes .
 * @return string $title : title html .
 */
function vk_blocks_get_ancestor_page_list_title( $attributes ) {
	$title = '';

	if ( $attributes['ancestorTitleDisplay'] ) {
		$post_anc_id = vk_blocks_get_ancestor_page_id();

		if ( ! empty( $post_anc_id ) && is_singular() ) {
			$title_text = get_the_title( $post_anc_id );
		} else {
			// On site editor screen.
			$title_text = esc_html__( 'Ancestor Page Title', 'vk-blocks' );
		}

		$title_link = ! empty( $post_anc_id ) ? get_permalink( $post_anc_id ) : '';

		// Ancestor Title Tag.
		$tag_name = $attributes['ancestorTitleTagName'];
		// Ancestor Title Class.
		$class = 'vk_ancestorPageList_title';
		if ( ! empty( $attributes['ancestorTitleClassName'] ) ) {
			$class .= ' ' . $attributes['ancestorTitleClassName'];
		}

		$title .= '<' . $tag_name . ' class="' . $class . '">';
		if ( ! empty( $attributes['ancestorTitleLink'] ) && ! empty( $title_link ) ) {
			$title .= '<a href="' . $title_link . '">';
		}
		$title .= esc_html( $title_text );
		if ( ! empty( $attributes['ancestorTitleLink'] ) ) {
			$title .= '</a>';
		}
		$title .= '</' . $tag_name . '>';
	}
	return $title;
}

/**
 * Archive list render callback
 * ブロックのレンダリングコールバック
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_ancestor_page_list_render_callback( $attributes ) {
	$post_anc_id = vk_blocks_get_ancestor_page_id();

	$page_list = '';

	// Site editor screen message.
	$massage_no_child = '<ul class="vk_ancestorPageList_list"><li class="page_item page-item-**"><a href="#">' . esc_html__( 'Dummy Text', 'vk-blocks' ) . '</a></li><li class="page_item page-item-**"><a href="#">' . esc_html__( 'Dummy Text', 'vk-blocks' ) . '</a></li></ul><div class="alert alert-warning">' . esc_html__( 'Because of the site editor have not child page that, the page list from ancestor is not displayed. Now displaying the dummy text list instead of the page list from ancestor.', 'vk-blocks' ) . '<br />* ' . esc_html__( 'This message only display on the edit screen.', 'vk-blocks' ) . '</div>';

	if ( $post_anc_id ) {
		$page_list = wp_list_pages(
			array(
				'title_li' => '',
				'child_of' => $post_anc_id,
				'echo'     => 0,
			)
		);

		// 子ページがある場合のみ表示の設定 && 子ページがない場合.
		if ( ! empty( $attributes['displayHasChildOnly'] ) && ! $page_list ) {
			if ( ! is_singular() ) { // フルサイト編集では is_admin が効かないので is_singular で判定.
				return $massage_no_child;
			} else {
				return;
			}
		}
	}

	// 非表示クラス.
	$classes = 'vk_ancestorPageList';
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

	if ( isset( $attributes['hiddenGrandChild'] ) && $attributes['hiddenGrandChild'] ) {
		$classes .= ' vk_ancestorPageList-hiddenGrandChild-true';
	}

	// block.jsonのSupportsで設定したクラス名やスタイルを取得する.
	$wrapper_classes = get_block_wrapper_attributes(
		array(
			'class' => $classes,
		)
	);

	$block  = '<aside ' . $wrapper_classes . '>';
	$block .= vk_blocks_get_ancestor_page_list_title( $attributes );
	if ( $page_list ) {
		$block .= '<ul class="vk_ancestorPageList_list">' . $page_list . '</ul></aside>';
	} else {
		if ( ! is_singular() && ! is_archive() ) { // フルサイト編集では is_admin が効かないので is_singular で判定.
			$block .= $massage_no_child;
		}
	}
	$block .= '</aside>';

	return $block;
}

/**
 * Register block ancestor-page-list
 * ブロックの登録
 *
 * @return void
 */
function vk_blocks_register_block_ancestor_page_list() {
	global $vk_blocks_common_attributes;

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/ancestor-page-list',
			VK_BLOCKS_DIR_URL . 'build/ancestor-page-list/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/ancestor-page-list',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'className' => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				array(
					'ancestorTitleDisplay' => array(
						'type'    => 'boolean',
						'default' => true,
					),
				),
				array(
					'ancestorTitleTagName' => array(
						'type'    => 'string',
						'default' => 'h4',
					),
				),
				array(
					'ancestorTitleClassName' => array(
						'type'    => 'string',
						'default' => null,
					),
				),
				array(
					'ancestorTitleLink' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				array(
					'displayHasChildOnly' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				array(
					'hiddenGrandChild' => array(
						'type'    => 'boolean',
						'default' => false,
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_ancestor_page_list_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_ancestor_page_list', 99 );
