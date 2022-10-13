<?php
/**
 * Hidden_extension style
 *
 * @package vk-blocks
 */

/**
 * Render hidden_extension
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_hidden_extension_filter( $block_content, $block ) {
	global $vk_blocks_common_attributes;
	if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
		foreach ( $block['attrs'] as $key => $value ) {
			$hidden_class     = array(
				'vk_hidden',
				'vk_hidden-xxl',
				'vk_hidden-xl-v2',
				'vk_hidden-xl',
				'vk_hidden-lg',
				'vk_hidden-md',
				'vk_hidden-sm',
				'vk_hidden-xs',
			);
			$class_name       = isset( $block['attrs']['className'] ) ? $block['attrs']['className'] : '';
			$class_name_array = preg_split( '/ /', $class_name );
			// 分割読み込みがオンの場合
			if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
				// hidden-extensionがtrueもしくはclassNameにhiddenクラスが含まれていたら
				if ( in_array( $key, array_keys( $vk_blocks_common_attributes ), true ) || array_intersect( $hidden_class, $class_name_array ) ) {
					wp_enqueue_style(
						'vk-hidden-extension',
						VK_BLOCKS_DIR_URL . 'build/extensions/common/hidden-extension/style.css',
						array(),
						VK_BLOCKS_VERSION
					);
					break;
				}
			}
		}
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_hidden_extension_filter', 10, 2 );
