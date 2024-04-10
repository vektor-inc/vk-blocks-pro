<?php
/**
 * Registers the `vk-blocks/accordion` block.
 *
 * @package vk-blocks
 */

/**
 * Register accordion block.
 *
 * @return void
 */
function vk_blocks_register_block_accordion() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/accordion',
			VK_BLOCKS_DIR_URL . 'build/_pro/accordion/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/accordion-script',
			VK_BLOCKS_DIR_URL . 'build/vk-accordion.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	// クラシックテーマ & 6.5 環境で $assets = array() のように空にしないと重複登録になるため
	// ここで初期化しておく
	$assets = array();
	// Attend to load separate assets.
	// 分割読み込みが有効な場合のみ、分割読み込み用のスクリプトを登録する
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style'         => 'vk-blocks/accordion',
			'script'        => 'vk-blocks/accordion-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		);
	}

	register_block_type(
		__DIR__,
		$assets
	);
}
add_action( 'init', 'vk_blocks_register_block_accordion', 99 );
