<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * Dynamic text render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_dynamic_text_render_callback( $attributes ) {
	$options = array(
		'textAlign'                 => ( isset( $attributes['textAlign'] ) ) ? esc_attr( $attributes['textAlign'] ) : null,
		'displayElement'            => $attributes['displayElement'],
		'tagName'                   => $attributes['tagName'],
		'ancestorPageHiddenOption' => $attributes['ancestorPageHiddenOption'],
	);

	$post = get_post();
	if ( 'ancestor-page' === $options['displayElement'] && ! ( $post->post_parent ) && 'page' === $post->post_type && $options['ancestorPageHiddenOption'] ) {
		return;
	}

	// 投稿タイプの名前取得
	$post_type_info = VkHelpers::get_post_type_info();
	$post_type_name = $post_type_info['name'];

	// 先祖階層のページタイトルを取得
	$ancestor_post_title = '';
	if ( ! empty( $post ) && ! empty( $post->ancestors ) ) {
		foreach ( $post->ancestors as $post_id ) {
			$ancestor_post_title = get_post( $post_id )->post_title;
		}
	} elseif ( ! empty( $post ) ) {
		$ancestor_post_title = get_post( $post->ID )->post_title;
	}

	// カスタムフィールド
	// $custom_field = __( 'カスタムフィールドを入れる', 'vk-blocks' );

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
		$block_content .= $post_type_name;
	} elseif ( 'ancestor-page' === $options['displayElement'] ) {
		$block_content .= $ancestor_post_title;
	}
	// カスタムフィールド選択時を未実装のためコメントアウト
	// elseif ( 'custom-field' === $options['displayElement'] ) {
	// $block_content = sprintf( '<p class="vk_dynamicText_content">%1$s</p>', $custom_field );
	// }
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
					'className'                 => array(
						'type'    => 'string',
						'default' => '',
					),
					'textAlign'                 => array(
						'type' => 'string',
					),
					'displayElement'            => array(
						'type'    => 'string',
						'default' => 'please-select',
					),
					'tagName'                   => array(
						'type'    => 'string',
						'default' => 'div',
					),
					'ancestorPageHiddenOption' => array(
						'type'    => 'boolean',
						'default' => true,
					),
				)
			),
			'render_callback' => 'vk_blocks_dynamic_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_dynamic_text', 99 );
