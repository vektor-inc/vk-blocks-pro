<?php
/**
 * Registers the `vk-blocks/slider` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Swiper\VkSwiper;

/**
 * Register slider block.
 *
 * @return void
 */
function vk_blocks_register_block_slider() {
	// Register Style.
	//if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/slider',
			VK_BLOCKS_DIR_URL . 'build/slider/style.css',
			array( 'vk-swiper-style'),
			VK_BLOCKS_VERSION
		);
	//}

	// Register Script.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/slider-script',
			VK_BLOCKS_DIR_URL . 'build/vk-slider.min.js',
			array( 'vk-swiper-script' ),
			VK_BLOCKS_VERSION,
			true
		);
	}

	VkSwiper::register_swiper();

	wp_register_script(
		'vk-blocks-slider-editor',
		VK_BLOCKS_DIR_URL . 'build/slider/editor-script.js',
		array( 'vk-swiper-script' ),
		VK_BLOCKS_VERSION,
		true
	);

	// クラシックテーマ & 6.5 環境で $assets = array() のように空にしないと重複登録になるため
	// ここで初期化しておく
	$assets = array();
	// Attend to load separate assets.
	// 分割読み込みが有効な場合のみ、分割読み込み用のスクリプトを登録する
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style_handles'         => array( 'vk-blocks/slider' ),
			'script_handles'        => array(),
			'editor_style_handles'  => array( 'vk-swiper-style', 'vk-blocks-build-editor-css' ),
			'editor_script_handles' => array( 'vk-blocks-build-js' ),
		);
	}

	register_block_type(
		__DIR__,
		$assets
	);
}
add_action( 'init', 'vk_blocks_register_block_slider', 99 );
