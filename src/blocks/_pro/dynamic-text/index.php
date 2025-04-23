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
		'isButtonStyle'            => false,
		'buttonEffect'             => '',
		'buttonColor'              => 'primary',
		'buttonColorCustom'        => null,
		'buttonTextColorCustom'    => null,
		'buttonType'               => '0',
		'buttonSize'               => 'md',
		'buttonAlign'              => 'left',
		'fontAwesomeIconBefore'    => null,
		'fontAwesomeIconAfter'     => null,
		'borderRadius'             => null,
		'subCaption'               => null,
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
			$link_text = ! empty( $attributes['customFieldLinkText'] ) ? wp_kses( $attributes['customFieldLinkText'], array( 'i' => array( 'class' => array() ) ) ) : $custom_field_url;

			// FontAwesomeアイコン処理
			$icon_before = '';
			$icon_after  = '';

			if ( ! empty( $attributes['fontAwesomeIconBefore'] ) ) {
				$fa_before_class = preg_match( '/class="(.*?)"/', $attributes['fontAwesomeIconBefore'], $matches ) ? $matches[1] . ' vk_button_link_before' : '';
				$style_before    = ! empty( $attributes['iconSizeBefore'] ) ? ' style="font-size: ' . esc_attr( $attributes['iconSizeBefore'] ) . '"' : '';
				$icon_before     = '<i class="' . esc_attr( $fa_before_class ) . '"' . $style_before . '></i>';
			}

			if ( ! empty( $attributes['fontAwesomeIconAfter'] ) ) {
				$fa_after_class = preg_match( '/class="(.*?)"/', $attributes['fontAwesomeIconAfter'], $matches ) ? $matches[1] . ' vk_button_link_after' : '';
				$style_after    = ! empty( $attributes['iconSizeAfter'] ) ? ' style="font-size: ' . esc_attr( $attributes['iconSizeAfter'] ) . '"' : '';
				$icon_after     = '<i class="' . esc_attr( $fa_after_class ) . '"' . $style_after . '></i>';
			}

			if ( $attributes['isLinkTarget'] ) {
				$custom_field_content = '<a href="' . $custom_field_url . '" target="_blank" rel="noreferrer noopener">' . $link_text . '</a>';
			} else {
				$custom_field_content = '<a href="' . $custom_field_url . '">' . $link_text . '</a>';
			}

			if ( $attributes['isButtonStyle'] ) {
				// ボタンスタイルの場合はアイコン付きでHTMLを生成
				$content_with_icons = $icon_before . $link_text . $icon_after;

				// VKBButtonと同じクラス構造を使用
				$button_classes = 'vk_button_link';

				// ボタンタイプに基づいてクラスを追加
				$button_type       = $attributes['buttonType'];
				$is_default_button = '0' === $button_type;
				$is_null_button    = null === $button_type;
				if ( $is_default_button || $is_null_button ) {
					// 塗りつぶし
					if ( 'custom' !== $attributes['buttonColor'] && empty( $attributes['buttonColorCustom'] ) ) {
						$button_classes .= ' btn has-background has-vk-color-' . $attributes['buttonColor'] . '-background-color';
					} else {
						$button_classes .= ' btn has-background';
						// カスタムパレットカラーの場合
						if ( ! empty( $attributes['buttonColorCustom'] ) && preg_match( '/^[a-z0-9-]+$/', $attributes['buttonColorCustom'] ) ) {
							$button_classes .= ' has-' . $attributes['buttonColorCustom'] . '-background-color';
						}
					}

// ボタンタイプに基づいてクラスを追加
$button_type = $attributes['buttonType'];
$is_default_button = '0' === $button_type;
$is_null_button = null === $button_type;
if ( $is_default_button || $is_null_button ) {
    // 塗りつぶし
    if ( 'custom' !== $attributes['buttonColor'] && empty( $attributes['buttonColorCustom'] ) ) {
        $button_classes .= ' btn has-background has-vk-color-' . $attributes['buttonColor'] . '-background-color';
    } else {
        $button_classes .= ' btn has-background';
        // カスタムパレットカラーの場合
        if ( ! empty( $attributes['buttonColorCustom'] ) && preg_match( '/^[a-z0-9-]+$/', $attributes['buttonColorCustom'] ) ) {
            $button_classes .= ' has-' . $attributes['buttonColorCustom'] . '-background-color';
        }
    }

					// 文字色
					if ( 'custom' === $attributes['buttonColor'] && ! empty( $attributes['buttonTextColorCustom'] ) ) {
							$button_classes .= ' btn has-text-color has-vk-color-' . $attributes['buttonTextColorCustom'] . '-color';
							// カスタムパレットカラーの場合
							if ( preg_match( '/^[a-z0-9-]+$/', $attributes['buttonTextColorCustom'] ) ) {
								$button_classes .= ' has-' . $attributes['buttonTextColorCustom'] . '-color';
							}
						}

						// has-primary-hover-colorを追加
						$button_classes .= ' has-' . $attributes['buttonTextColorCustom'] . '-color';
					}
				} elseif ( '1' === $button_type ) {
					// 塗りなし
					if ( 'custom' !== $attributes['buttonColor'] && empty( $attributes['buttonColorCustom'] ) ) {
						$button_classes .= ' btn has-text-color is-style-outline has-vk-color-' . $attributes['buttonColor'] . '-color';
					} else {
						$button_classes .= ' btn has-text-color is-style-outline';
						// カスタムパレットカラーの場合
						if ( ! empty( $attributes['buttonColorCustom'] ) && preg_match( '/^[a-z0-9-]+$/', $attributes['buttonColorCustom'] ) ) {
							$button_classes .= ' has-' . $attributes['buttonColorCustom'] . '-color';
						}
					}
				} elseif ( '2' === $button_type ) {
					// テキストのみ
					if ( 'custom' !== $attributes['buttonColor'] && empty( $attributes['buttonColorCustom'] ) ) {
						$button_classes .= ' has-text-color vk_button_link-type-text has-vk-color-' . $attributes['buttonColor'] . '-color';
					} else {
						$button_classes .= ' has-text-color vk_button_link-type-text';
						// カスタムパレットカラーの場合
						if ( ! empty( $attributes['buttonColorCustom'] ) && preg_match( '/^[a-z0-9-]+$/', $attributes['buttonColorCustom'] ) ) {
							$button_classes .= ' has-' . $attributes['buttonColorCustom'] . '-color';
						}
					}
				}

				// ボタンサイズ
				$button_classes .= ' btn-' . $attributes['buttonSize'];

				// buttonAlign Block
				if ( 'block' === $attributes['buttonAlign'] ) {
					$button_classes .= ' btn-block';
				} elseif ( 'wide' === $attributes['buttonAlign'] ) {
					$button_classes .= ' btn-wide';
				}

				// ボタンエフェクト
				if ( isset( $attributes['buttonEffect'] ) && 'shine' === $attributes['buttonEffect'] ) {
					$button_classes .= ' vk_button_link-effect-shine';
				}

				// インラインスタイル
				$inline_style = '';

				// カスタムカラーがHEXカラーの場合
				if ( ! empty( $attributes['buttonColorCustom'] ) && preg_match( '/^#[a-fA-F0-9]{3,6}$/', $attributes['buttonColorCustom'] ) ) {
					$button_type       = $attributes['buttonType'];
					$is_default_button = '0' === $button_type;
					$is_null_button    = null === $button_type;
					if ( $is_default_button || $is_null_button ) {
						$inline_style .= 'background-color:' . esc_attr( $attributes['buttonColorCustom'] ) . ';';
					} else {
						$inline_style .= 'color:' . esc_attr( $attributes['buttonColorCustom'] ) . ';';
						if ( '1' === $button_type ) {
							$inline_style .= 'border-color:' . esc_attr( $attributes['buttonColorCustom'] ) . ';';
						}
					}
				}

				// テキストカラーがHEXカラーの場合
				$button_type       = $attributes['buttonType'];
				$is_default_button = '0' === $button_type;
				$is_null_button    = null === $button_type;
				if ( ( $is_default_button || $is_null_button ) &&
					! empty( $attributes['buttonTextColorCustom'] ) &&
					preg_match( '/^#[a-fA-F0-9]{3,6}$/', $attributes['buttonTextColorCustom'] ) ) {
					$inline_style .= 'color:' . esc_attr( $attributes['buttonTextColorCustom'] ) . ';';
				}

				// ボーダーラジウス
				if ( ! empty( $attributes['borderRadius'] ) ) {
					$inline_style .= 'border-radius:' . esc_attr( $attributes['borderRadius'] ) . ';';
				}

				$style_attr = ! empty( $inline_style ) ? ' style="' . $inline_style . '"' : '';

				$custom_field_content = '<a href="' . $custom_field_url . '" class="' . $button_classes . '"'
					. ( $attributes['isLinkTarget'] ? ' target="_blank" rel="noreferrer noopener"' : '' )
					. ' role="button" aria-pressed="true"'
					. $style_attr . '>';

				$custom_field_content .= '<div class="vk_button_link_caption">' . $content_with_icons . '</div>';

				// サブキャプションがある場合は表示
				if ( ! empty( $attributes['subCaption'] ) ) {
					$custom_field_content .= '<p class="vk_button_link_subCaption">' . esc_html( $attributes['subCaption'] ) . '</p>';
				}

				$custom_field_content .= '</a>';
			} else {
				$custom_field_content = '<a href="' . $custom_field_url . '"' . ( $attributes['isLinkTarget'] ? ' target="_blank" rel="noreferrer noopener"' : '' ) . '>' . $link_text . '</a>';
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
		$classes .= ' has-text-align-' . $attributes['textAlign'];
	}
	if ( isset( $attributes['isButtonStyle'] ) && $attributes['isButtonStyle'] ) {
		$classes .= ' vk_dynamicText_button';
		if ( isset( $attributes['buttonAlign'] ) ) {
			$classes .= ' vk_button-align-' . $attributes['buttonAlign'];
		}
	}
	if ( isset( $attributes['buttonEffect'] ) && 'shine' === $attributes['buttonEffect'] ) {
		$classes .= ' is-style-shine';
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
			'style'           => array( 'vk-blocks/dynamic-text', 'vk-blocks/button-control' ),
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
					'isButtonStyle'            => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'buttonEffect'             => array(
						'type'    => 'string',
						'default' => '',
					),
					'buttonColor'              => array(
						'type'    => 'string',
						'default' => 'primary',
					),
					'buttonType'               => array(
						'type'    => 'string',
						'default' => '0',
					),
					'buttonSize'               => array(
						'type'    => 'string',
						'default' => 'md',
					),
					'buttonAlign'              => array(
						'type'    => 'string',
						'default' => 'left',
					),
					'fontAwesomeIconBefore'    => array(
						'type'    => 'string',
						'default' => null,
					),
					'fontAwesomeIconAfter'     => array(
						'type'    => 'string',
						'default' => null,
					),
					'iconSizeBefore'           => array(
						'type'    => 'string',
						'default' => null,
					),
					'iconSizeAfter'            => array(
						'type'    => 'string',
						'default' => null,
					),
					'borderRadius'             => array(
						'type'    => 'string',
						'default' => null,
					),
					'buttonColorCustom'        => array(
						'type'    => 'string',
						'default' => null,
					),
					'buttonTextColorCustom'    => array(
						'type'    => 'string',
						'default' => null,
					),
					'subCaption'               => array(
						'type'    => 'string',
						'default' => null,
					),
				)
			),
			'render_callback' => 'vk_blocks_dynamic_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_dynamic_text', 99 );
