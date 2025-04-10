<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * Get default attribute
 *
 * @return array $attributes_default
 */
function vk_blocks_dynamic_text_get_attributes_default() {
	$attributes_default = array(
		'textAlign'                => null,
		'displayElement'           => 'please-select',
		'tagName'                  => 'div',
		'ancestorPageHiddenOption' => null,
		'parentPageHiddenOption'   => null,
		'userNameBeforeText'       => null,
		'userNameAfterText'        => null,
		'customFieldName'          => null,
		'postSlug'                 => null,
		'customFieldLinkText'      => null,
		'fieldType'                => 'text',
		'isLinkSet'                => false,
		'isLinkTarget'             => false,
	);
	return $attributes_default;
}

/**
 * Dynamic text custom field render
 *
 * @param array  $attributes Block attributes.
 * @param string $content Inner content.
 * @param object $block block.
 * @return string
 */
function vk_blocks_dynamic_text_custom_field_render( $attributes, $content, $block ) {
	$attributes_default = vk_blocks_dynamic_text_get_attributes_default();
	$attributes         = array_merge( $attributes_default, $attributes );

	if ( 'custom-field' === $attributes['displayElement'] && ! $attributes['customFieldName'] ) {
		return;
	}
	if ( 'custom-field' === $attributes['displayElement'] && ! isset( $block->context['postId'] ) ) {
		return;
	}

	if ( 'text' === $attributes['fieldType'] ) {
		$custom_field_content = esc_html( get_post_meta( $block->context['postId'], $attributes['customFieldName'], true ) );
	} elseif ( 'textarea' === $attributes['fieldType'] ) {
		$custom_field_content = nl2br( esc_textarea( get_post_meta( $block->context['postId'], $attributes['customFieldName'], true ) ) );
	} elseif ( 'wysiwyg' === $attributes['fieldType'] ) {
		$custom_field_content = wpautop( wp_kses_post( get_post_meta( $block->context['postId'], $attributes['customFieldName'], true ) ) );
	} elseif ( 'url' === $attributes['fieldType'] ) {
		$custom_field_url = esc_url( get_post_meta( $block->context['postId'], $attributes['customFieldName'], true ) );
		if ( $attributes['isLinkSet'] ) {
			$link_text = ! empty( $attributes['customFieldLinkText'] ) ? wp_kses( $attributes['customFieldLinkText'] , array( 'i' => array( 'class' => array() ) ) ) : $custom_field_url;
			if ( $attributes['isLinkTarget'] ) {
				$custom_field_content = '<a href="' . $custom_field_url . '" target="_blank" rel="noreferrer noopener">' . $link_text . '</a>';
			} else {
				$custom_field_content = '<a href="' . $custom_field_url . '">' . $link_text . '</a>';
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
	$attributes_default = vk_blocks_dynamic_text_get_attributes_default();
	$attributes         = array_merge( $attributes_default, $attributes );

	$classes = 'vk_dynamicText';
	if ( isset( $attributes['textAlign'] ) ) {
		$classes = ' has-text-align-' . $attributes['textAlign'];
	}
	// block.json の Supports で設定したクラス名やスタイルを取得する
	$wrapper_classes = get_block_wrapper_attributes( array( 'class' => $classes ) );

	$block_content = '';
	if ( $attributes['tagName'] ) {
		$block_content .= '<' . $attributes['tagName'] . ' ' . $wrapper_classes . '>';
	}
	if ( 'post-type' === $attributes['displayElement'] ) {
		// 投稿タイプの名前取得.
		$post_type_info = VkHelpers::get_post_type_info();
		$post_type_name = '';
		// * 検索結果ページなどで投稿タイプ情報が取得できない場合があるので空の場合は空文字を返す.
		// Cope with php warning that brought by can't get post type name on such as the search result page.
		if ( ! empty( $post_type_info['name'] ) ) {
			$post_type_name = $post_type_info['name'];
		}
		$block_content .= $post_type_name;
	} elseif ( 'ancestor-page' === $attributes['displayElement'] ) {
		$post = get_post();
		// 親ページがない（＝先祖階層） && 先祖階層のページを非表示にするオプションが有効の場合は処理を終了.
		if ( empty( $post->post_parent ) && $attributes['ancestorPageHiddenOption'] ) {
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
	} elseif ( 'parent-page' === $attributes['displayElement'] ) {
		$post = get_post();
		// 親ページがない（＝先祖階層） && 親ページを非表示にするオプションが有効の場合は処理を終了.
		if ( empty( $post->post_parent ) && $attributes['parentPageHiddenOption'] ) {
			return;
		}

		$parent_post_title = '';
		if ( ! empty( $post ) && ! empty( $post->post_parent ) ) {
			$parent_post_title = get_post( $post->post_parent )->post_title;
		} elseif ( ! empty( $post ) ) {
			$parent_post_title = get_post( $post )->post_title;
		}
		$block_content .= $parent_post_title;
	} elseif ( 'user-name' === $attributes['displayElement'] ) {
		if ( is_user_logged_in() ) {
			$current_user = wp_get_current_user();
			if ( $current_user->display_name ) {
				$prefix = isset( $attributes['userNamePrefixText'] ) ? esc_html( $attributes['userNamePrefixText'] ) : '';
				$suffix = isset( $attributes['userNameSuffixText'] ) ? esc_html( $attributes['userNameSuffixText'] ) : '';

				$block_content .= $prefix . $current_user->display_name . $suffix;
			}
		} else {
			$loggedout_text = isset( $attributes['userNameLoggedOutText'] ) ? esc_html( $attributes['userNameLoggedOutText'] ) : '';
			if ( isset( $attributes['isLoginLink'] ) && $attributes['isLoginLink'] ) {
				$post = get_post();
				if ( is_singular() ) {
					$current_url = get_permalink( $post->id );
				} else {
					$http_host   = isset( $_SERVER['HTTP_HOST'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_HOST'] ) ) : '';
					$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
					$current_url = ( is_ssl() ? 'https://' : 'http://' ) . $http_host . $request_uri;
				}
				$block_content .= '<a href="' . wp_login_url( $current_url ) . '">' . esc_html( $loggedout_text ) . '</a>';
			} else {
				$block_content .= esc_html( $loggedout_text );
			}
		}
	} elseif ( 'custom-field' === $attributes['displayElement'] ) {
		$block_content .= vk_blocks_dynamic_text_custom_field_render( $attributes, $content, $block );
	} elseif ( 'post-slug' === $attributes['displayElement'] ) {
		$post = isset( $block->context['postId'] ) ? get_post( $block->context['postId'] ) : null;
		if ( $post ) {
			$block_content .= esc_html( $post->post_name );
		}
	}
	if ( $attributes['tagName'] ) {
		$block_content .= '</' . $attributes['tagName'] . '>';
	}

	return $block_content;
}

/**
 * Register Dynamic Text block.
 *
 * @return void
 */
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
					'parentPageHiddenOption'   => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'userNamePrefixText'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'userNameSuffixText'       => array(
						'type'    => 'string',
						'default' => '',
					),
					'userNameLoggedOutText'    => array(
						'type'    => 'string',
						'default' => '',
					),
					'isLoginLink'              => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'customFieldName'          => array(
						'type'    => 'string',
						'default' => '',
					),
					'postSlug'                 => array(
						'type'    => 'string',
						'default' => '',
					),
					'customFieldLinkText'      => array(
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
