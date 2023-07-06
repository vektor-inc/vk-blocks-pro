<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * Dynamic text custom field render
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_dynamic_text_custom_field_render( $attributes, $content, $block ) {
	$options = array(
		'displayElement'  => $attributes['displayElement'],
		'customFieldName' => ( isset( $attributes['customFieldName'] ) ) ? wp_kses_post( $attributes['customFieldName'] ) : null,
		'fieldType'       => $attributes['fieldType'],
		'isLinkSet'       => $attributes['isLinkSet'],
		'isLinkTarget'    => $attributes['isLinkTarget'],
		// fieldType を attributes で取得するようにする?
		// そもそも displayElement で custom-field-text とか custom-field-textarea とかで分ける方がいいか悩む
	);

	if ( 'custom-field' === $options['displayElement'] && ! $options['customFieldName'] ) {
		return;
	}
	if ( 'custom-field' === $options['displayElement'] && ! isset( $block->context['postId'] ) ) {
		return;
	}

	if ( 'text' === $options['fieldType'] ) {
		$custom_field_content = esc_html( get_post_meta( $block->context['postId'], $options['customFieldName'], true ) );
	} elseif ( 'textarea' === $options['fieldType'] ) {
		$custom_field_content = nl2br( esc_textarea( get_post_meta( $block->context['postId'], $options['customFieldName'], true ) ) );
	} elseif ( 'wysiwyg' === $options['fieldType'] ) {
		$custom_field_content = wpautop( wp_kses_post( get_post_meta( $block->context['postId'], $options['customFieldName'], true ) ) );
	} elseif ( 'url' === $options['fieldType'] ) {
		$custom_field_url = esc_url( get_post_meta( $block->context['postId'], $options['customFieldName'], true ) );
		if ( $options['isLinkSet'] ) {
			if ( $options['isLinkTarget'] ) {
				$custom_field_content = '<a href="' . $custom_field_url . '" target="_blank" rel="noreferrer noopener">' . $custom_field_url . '</a>';
			} else {
				$custom_field_content = '<a href="' . $custom_field_url . '">' . $custom_field_url . '</a>';
			}
		} else {
			$custom_field_content = $custom_field_url;
		}
	}

	return $custom_field_content;
}

/**
 * Dynamic text render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_dynamic_text_render_callback( $attributes, $content, $block ) {
	$options = array(
		'textAlign'                => ( isset( $attributes['textAlign'] ) ) ? esc_attr( $attributes['textAlign'] ) : null,
		'displayElement'           => $attributes['displayElement'],
		'tagName'                  => $attributes['tagName'],
		'ancestorPageHiddenOption' => $attributes['ancestorPageHiddenOption'],
		'customFieldName'          => ( isset( $attributes['customFieldName'] ) ) ? wp_kses_post( $attributes['customFieldName'] ) : null,
	);

	$classes = 'vk_dynamicText';
	if ( isset( $attributes['textAlign'] ) ) {
		$classes = ' has-text-align-' . $attributes['textAlign'];
	}
	// block.json の Supports で設定したクラス名やスタイルを取得する
	$wrapper_classes = get_block_wrapper_attributes( array( 'class' => $classes ) );

	$block_content = '';
	if ( $options['tagName'] ) {
		$block_content .= '<' . $options['tagName'] . ' ' . $wrapper_classes . '>';
	};
	if ( 'post-type' === $options['displayElement'] ) {
		// 投稿タイプの名前取得.
		$post_type_info = VkHelpers::get_post_type_info();
		$post_type_name = '';
		// * 検索結果ページなどで投稿タイプ情報が取得できない場合があるので空の場合は空文字を返す.
		// Cope with php warning that brought by can't get post type name on such as the search result page.
		if ( ! empty( $post_type_info['name'] ) ) {
			$post_type_name = $post_type_info['name'];
		}
		$block_content .= $post_type_name;
	} elseif ( 'ancestor-page' === $options['displayElement'] ) {
		$post = get_post();
		// 親ページがない（＝先祖階層） && 先祖階層のページを非表示にするオプションが有効の場合は処理を終了.
		if ( empty( $post->post_parent ) && $options['ancestorPageHiddenOption'] ) {
			return;
		}
		// 先祖階層のページタイトルを取得.
		$ancestor_post_title = '';
		if ( ! empty( $post ) && ! empty( $post->ancestors ) ) {
			foreach ( $post->ancestors as $post_id ) {
				$ancestor_post_title = get_post( $post_id )->post_title;
			}
		} elseif ( ! empty( $post ) ) {
			$ancestor_post_title = get_post( $post->ID )->post_title;
		}
		$block_content .= $ancestor_post_title;
	} elseif ( 'custom-field' === $options['displayElement'] ) {
		$block_content .= vk_blocks_dynamic_text_custom_field_render( $attributes, $content, $block );
	}
	if ( $options['tagName'] ) {
		$block_content .= '</' . $options['tagName'] . '>';
	}

	return $block_content;
}

/**
 * Register Dynamic Text block.
 *
 * @return void
 */
function vk_blocks_register_block_dynamic_text() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/dynamic-text',
			VK_BLOCKS_DIR_URL . 'build/_pro/dynamic-text/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/dynamic-text',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'className'                => array(
						'type'    => 'string',
						'default' => '',
					),
					'textAlign'                => array(
						'type' => 'string',
					),
					'displayElement'           => array(
						'type'    => 'string',
						'default' => 'please-select',
					),
					'tagName'                  => array(
						'type'    => 'string',
						'default' => 'div',
					),
					'ancestorPageHiddenOption' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'customFieldName'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'fieldType'                => array(
						'type'    => 'string',
						'default' => 'text',
					),
					'isLinkSet'                => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'isLinkTarget'             => array(
						'type'    => 'boolean',
						'default' => false,
					),
				)
			),
			'render_callback' => 'vk_blocks_dynamic_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_dynamic_text', 99 );
