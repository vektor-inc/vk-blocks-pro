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
	if ( empty( $block_name ) ) {
		return false;
	}

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
}

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
 * CSSを蓄積するためのグローバル変数
 */
global $vk_blocks_custom_css_collection;
$vk_blocks_custom_css_collection = '';

/**
 * Render Custom Css Extension css
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_render_custom_css( $block_content, $block ) {
	global $vk_blocks_custom_css_collection;

	if ( ! vk_blocks_has_custom_css_support( $block['blockName'] ) ) {
		return $block_content;
	}

	if ( empty( $block['attrs']['vkbCustomCss'] ) ) {
		return $block_content;
	}

	$css = $block['attrs']['vkbCustomCss'];
	$unique_class = '';

	// selector文字列があるとき
	if ( strpos( $css, 'selector' ) !== false ) {
		// Uniqueクラスを生成
		$unique_class = wp_unique_id( 'vk_custom_css_' );
		// selectorをUniqueクラスに変換
		$css = preg_replace( '/selector/', '.' . $unique_class, $css );

		// vk_custom_cssをUniqueクラスに変換
		$block_content = preg_replace( '/(class="[^"]*)vk_custom_css([^"]*")/', '$1 ' . $unique_class . '$2', $block_content, 1 );
	}

	// CSSを蓄積する
	$vk_blocks_custom_css_collection .= $css;

	// 新しいUniqueクラスがない場合はCSSを出力しない
	if ( ! $unique_class ) {
		return $block_content;
	}

	// フロントエンドに直接スタイルを出力しない
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_render_custom_css', 10, 2 );

/**
 * フッターで蓄積されたカスタムCSSを出力
 */
function vk_blocks_output_custom_css() {
	global $vk_blocks_custom_css_collection;

	if ( ! empty( $vk_blocks_custom_css_collection ) ) {
		// wp_ksesで必要最低限のHTMLタグのみ許可して出力
		echo '<style id="vk-blocks-custom-css">' . wp_kses( $vk_blocks_custom_css_collection, array( 'style' => array() ) ) . '</style>';
	}
}
add_action( 'wp_footer', 'vk_blocks_output_custom_css', 20 );
