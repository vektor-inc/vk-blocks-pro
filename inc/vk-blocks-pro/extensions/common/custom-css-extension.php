<?php
/**
 * VK Blocks - Custom Css Extension
 *
 * @package vk-blocks
 */

/**
 * カスタムCSSをサポートしているかどうか
 *
 * @param string $block_name block_name.
 * @return string
 */
function vk_blocks_has_custom_css_support( $block_name ) {
	$block_type = WP_Block_Type_Registry::get_instance()->get_registered( $block_name );
	if ( ! block_has_support( $block_type, array( 'customClassName' ), true ) ) {
		return false;
	}

	$return_bool = preg_match( '/core|vk-blocks/', $block_name ) ? true : false;

	$exclude_blocks = array(
		// ExUnitに入っているvk blocksブロック
		'vk-blocks/share-button',
		'vk-blocks/child-page-index',
		'vk-blocks/contact-section',
		'vk-blocks/page-list-ancestor',
		'vk-blocks/sitemap',
		'vk-blocks/cta',
	);
	foreach ( $exclude_blocks as $exclude_block ) {
		if ( $block_name === $exclude_block ) {
			$return_bool = false;
		}
	}
	return $return_bool;
};

/**
 * 各ブロックにvkbCustomCssのattributesを追加する
 *
 * @param string $settings settings.
 * @param array  $metadata metadata.
 * @return string
 */
function vk_blocks_add_custom_css_attributes( $settings, $metadata ) {
	if ( ! vk_blocks_has_custom_css_support( $metadata['name'] ) ) {
		return $settings;
	}

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
	return $settings;
}
add_filter( 'block_type_metadata_settings', 'vk_blocks_add_custom_css_attributes', 10, 2 );

/**
 * Render Custom Css Extension css
 *
 * @see https://github.com/WordPress/gutenberg/blob/3358251ae150e33dd6c0e0fb15be110cca1b5c59/lib/block-supports/layout.php#L294
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_render_custom_css( $block_content, $block ) {
	if ( ! vk_blocks_has_custom_css_support( $block['blockName'] ) ) {
		return $block_content;
	}

	if ( empty( $block['attrs']['vkbCustomCss'] ) ) {
		return $block_content;
	}

	$css = $block['attrs']['vkbCustomCss'];
	// selector文字列があるとき
	if ( strpos( $css, 'selector' ) !== false ) {
		// Uniqueクラスを生成
		$unique_class = wp_unique_id( 'vk_custom_css_' );
		// selectorをUniqueクラスに変換
		$css = preg_replace( '/selector/', '.' . $unique_class, $css );

		// vk_custom_cssをUniqueクラスに変換
		if ( strpos( $block_content, ' vk_custom_css ' ) !== false ) {
			// vk_custom_cssが途中に付いている e.g.class="hoge vk_custom_css huga"
			$block_content = preg_replace( '/ vk_custom_css /', ' ' . $unique_class . ' ', $block_content, 1 );
		} elseif ( strpos( $block_content, '="vk_custom_css ' ) !== false ) {
			// vk_custom_cssから始まる 複数クラス
			$block_content = preg_replace( '/="vk_custom_css /', '="' . $unique_class . ' ', $block_content, 1 );
		} elseif ( strpos( $block_content, ' vk_custom_css"' ) !== false ) {
			// vk_custom_cssで終わる 複数クラス
			$block_content = preg_replace( '/ vk_custom_css"/', ' ' . $unique_class . '"', $block_content, 1 );
		} else {
			// vk_custom_cssのみ
			$block_content = preg_replace( '/vk_custom_css/', $unique_class, $block_content, 1 );
		}
	}
	$css = vk_blocks_minify_css( $css );
	if ( function_exists( 'wp_enqueue_block_support_styles' ) ) {
		wp_enqueue_block_support_styles( $css );
		// 5.8のサポートを切るならelse内は削除する
	} else {
		$block_content = '<style>' . $css . '</style>' . $block_content;
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_render_custom_css', 10, 2 );
