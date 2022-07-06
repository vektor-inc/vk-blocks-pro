<?php
/**
 * Layout Column Style Setting
 *
 * @package VK Blocks
 */

 /**
  * Load Scripts
  */
function vk_blocks_layout_column_block_style() {
    
	$vk_blocks_options = vk_blocks_get_options();

	// サイトレイアウト余白
	$layout_column_gap = '20px';

	// メインカラムの最小保持幅
	$main_column_min_width = '700px';

	// サイドバーカラムの最小保持幅
	$sub_column_min_width = '280px';

	$dynamic_css = <<<__CSS__
	:root {
		--vk-layout-column-gap: ${layout_column_gap};
		--vk-layout-column-main-column-min-width: ${main_column_min_width};
		--vk-layout-column-sub-column-min-width: ${sub_column_min_width};
	}
__CSS__;

		wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
		wp_add_inline_style( 'wp-edit-blocks', $dynamic_css );
}
add_action( 'init', 'vk_blocks_layout_column_block_style' );

