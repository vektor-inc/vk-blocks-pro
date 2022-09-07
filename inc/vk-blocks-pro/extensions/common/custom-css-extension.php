<?php
/**
 * VK Blocks - Custom Css Extension
 *
 * @package vk-blocks
 */

/**
 * Render Custom Css Extension css
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_custom_css_extension( $block_content, $block ) {
	if ( ! empty( $block['attrs']['vkbCustomCss'] ) ) {
		$css        = $block['attrs']['vkbCustomCss'];
		$class_name = ! empty( $block['attrs']['className'] ) ? $block['attrs']['className'] : '';
		// 追加CSSクラスを半角文字列で分けて配列化
		$now_class_array  = ! empty( $class_name ) ? explode( ' ', $class_name ) : array();
		$custom_css_class = preg_grep( '/vk_custom_css-[\S]/', $now_class_array );
		// selector文字列をクラス名に変換
		$css = preg_replace( '/selector/', '.' . current( $custom_css_class ), $css );
		$css = vk_blocks_minify_css( $css );
		if ( ! empty( $css ) ) {
			return '<style>' . $css . '</style>' . $block_content;
		}
		return $block_content;
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_custom_css_extension', 10, 2 );

/**
 * 各ブロックにvkbCustomCssのattributesを追加する
 *
 * @param string $settings settings.
 * @param array  $metadata metadata.
 * @return string
 */
function vk_blocks_add_custom_css_attributes( $settings, $metadata ) {
	if ( preg_match( '/core|vk-blocks/', $metadata['name'] ) ) {
		$attributes = array();
		if ( ! empty( $settings['attributes'] ) ) {
			$attributes = $settings['attributes'];
		}
		$add_attributes = array(
			'vkbCustomCss' => array(
				'type'    => 'string',
				'default' => '',
			),
		);

		$settings['attributes'] = array_merge(
			$attributes,
			$add_attributes
		);
	}
	return $settings;
}
add_filter( 'block_type_metadata_settings', 'vk_blocks_add_custom_css_attributes', 10, 2 );
