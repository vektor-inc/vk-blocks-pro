<?php
/**
 * VK Blocks - Custom Css Extension
 *
 * @package vk-blocks
 */

/**
 * Render Custom Css Extension css
 *
 * @see https://github.com/WordPress/gutenberg/blob/3358251ae150e33dd6c0e0fb15be110cca1b5c59/lib/block-supports/layout.php#L294
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_custom_css_extension( $block_content, $block ) {
	if ( ! empty( $block['attrs']['vkbCustomCss'] ) ) {
		$css = $block['attrs']['vkbCustomCss'];
		// Uniqueクラスを生成
		$custom_css_class = wp_unique_id( 'vk_custom_css_' );
		// selector文字列があるとき
		if ( strpos( $css, 'selector' ) !== false ) {
			// selectorをUniqueクラスに変換
			$css = preg_replace( '/selector/', '.' . $custom_css_class, $css );

			// vk_custom_cssをUniqueクラスに変換
			if ( strpos( $block_content, 'vk_custom_css"' ) !== false ) {
				// vk_custom_cssが最後に(のみ)付いている時 (ex:class="hoge vk_custom_css")
				$block_content = preg_replace( '/vk_custom_css"/', $custom_css_class . '"', $block_content, 1 );
			} elseif ( strpos( $block_content, 'vk_custom_css ' ) !== false ) {
				// vk_custom_cssが途中に付いている時半角スペースが後に続く (ex:class="hoge vk_custom_css huga")
				$block_content = preg_replace( '/vk_custom_css/', $custom_css_class, $block_content, 1 );
			}
		}
		$css = vk_blocks_minify_css( $css );
		if ( ! empty( $css ) ) {
			if ( function_exists( 'wp_enqueue_block_support_styles' ) ) {
				wp_enqueue_block_support_styles( $css );
				return $block_content;
				// 5.8のサポートを切るならelse内は削除する
			} else {
				return '<style>' . $css . '</style>' . $block_content;
			}
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
