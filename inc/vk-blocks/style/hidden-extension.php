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
	foreach ( $block['attrs'] as $key => $value ) {
		// 分割読み込みをオンかつhidden-extensionが含まれていたら個別cssを読み込む
		if ( VK_Blocks_Block_Loader::should_load_separate_assets() && in_array( $key, array_keys( $vk_blocks_common_attributes ), true ) ) {
			wp_enqueue_style(
				'vk-hidden-extension',
				VK_BLOCKS_DIR_URL . 'build/extensions/common/hidden-extension/style.css',
				array(),
				VK_BLOCKS_VERSION
			);
			break;
		}
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_hidden_extension_filter', 10, 2 );
