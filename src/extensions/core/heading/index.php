<?php
/**
 * Registers block style the `vk-blocks/core-heading` .
 *
 * @package vk-blocks
 */

/**
 * Register Registers block style.
 *
 * @return void
 */
function vk_blocks_register_block_style_core_heading() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/core-heading',
			VK_BLOCKS_DIR_URL . 'build/extensions/core/heading/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	/**
	 * Register_block_style
	 *
	 * コアの見出しブロックを使用している場合はvk-blocks/core-headingを読み込むように設定。
	 * style.jsのregisterBlockStyleで複数のスタイルを追加しているがCSSは同じものを使用しているのでvk-heading-defaultのみCSSを登録している
	 */
	if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		register_block_style(
			'core/heading',
			array(
				'name'         => 'vk-heading-default',
				'label'        => 'Default',
				'style_handle' => 'vk-blocks/core-heading',
			)
		);
	}
}
add_action( 'init', 'vk_blocks_register_block_style_core_heading', 99 );

