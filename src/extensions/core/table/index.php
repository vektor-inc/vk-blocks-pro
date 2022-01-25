<?php
/**
 * Registers block style the `vk-blocks/core-table` .
 *
 * @package vk-blocks
 */

/**
 * Register Registers block style.
 *
 * @return void
 */
function vk_blocks_register_block_style_core_table() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/core-table',
			VK_BLOCKS_DIR_URL . 'build/extensions/core/table/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	/**
	 * Register_block_style
	 *
	 * コアのテーブルブロックを使用している場合はvk-blocks/core-tableを読み込むように設定。
	 * style.jsのregisterBlockStyleで複数のスタイルを追加しているがCSSは同じものを使用しているのでvk-table-border-top-bottomのみCSSを登録している
	 */
	if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		register_block_style(
			'core/table',
			array(
				'name'         => 'vk-table-border-top-bottom',
				'label'        => 'Border Top Bottom',
				'style_handle' => 'vk-blocks/core-table',
			)
		);
	}
}
add_action( 'init', 'vk_blocks_register_block_style_core_table', 99 );
