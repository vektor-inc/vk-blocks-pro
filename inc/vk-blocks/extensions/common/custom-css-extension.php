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
		$class_name = $block['attrs']['className'];
		// 追加CSSクラスを半角文字列で分けて配列化
		$now_class_array = ! empty( $class_name ) ? explode( ' ', $class_name ) : array();
		$delete_class    = preg_grep( '/vk_custom_css-[\S]/', $now_class_array );
		$css             = preg_replace( '/selector/', '.' . current( $delete_class ), $css );
		$css             = vk_blocks_minify_css( $css );
		return '<style>' . $css . '</style>' . $block_content;
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_custom_css_extension', 10, 2 );
