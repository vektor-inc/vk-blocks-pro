<?php
/**
 * Registers block style the `vk-blocks/core-image` .
 *
 * @package vk-blocks
 */

/**
 * Register Registers block style.
 *
 * @return void
 */
function vk_blocks_register_block_style_core_image() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/core-image',
			VK_BLOCKS_DIR_URL . 'build/extensions/core/image/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	/**
	 * Register_block_style
	 *
	 * コアの画像ブロックを使用している場合はvk-blocks/core-imageを読み込むように設定。
	 * style.jsのregisterBlockStyleで複数のスタイルを追加しているがCSSは同じものを使用しているのでvk-image-roundedのみCSSを登録している
	 */
	if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		register_block_style(
			'core/image',
			array(
				'name'         => 'vk-image-rounded',
				'label'        => 'Rounded02',
				'style_handle' => 'vk-blocks/core-image',
			)
		);
	}
}
add_action( 'init', 'vk_blocks_register_block_style_core_image', 99 );
