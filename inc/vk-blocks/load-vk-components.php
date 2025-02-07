<?php
/**
 * VK Blocks Load VK Components
 *
 * @package vk-blocks
 */

use VektorInc\VK_Component\VK_Component_Posts;

/**
 * VK Components を読み込むべきか判定
 *
 * @return bool 読み込む場合 true、読み込まない場合 false
 */
function vk_blocks_should_load_vk_components() {
	$template = wp_get_theme()->Template;
	// lightning 系（ベクトル）の場合 vk-components はテーマなどで読み込むので適用しない
	return ! in_array( $template, array( 'lightning', 'lightning-pro', 'katawara' ), true );
}

/**
 * VK Components のスタイルを登録 & 読み込み
 */
function vk_blocks_register_vk_components_style() {
	if ( ! vk_blocks_should_load_vk_components() ) {
		return;
	}

	// VK Components のスタイルを登録
	VK_Component_Posts::register_style( 'vk-components-style' );
}
add_action( 'init', 'vk_blocks_register_vk_components_style' );

/**
 * VK Components のスタイルを管理画面とフロントに適用
 *
 * @param string $hook_suffix hook suffix.
 */
function vk_blocks_enqueue_vk_components_style( $hook_suffix ) {
	if ( ! vk_blocks_should_load_vk_components() ) {
		return;
	}

	// 管理画面
	if ( is_admin() ) {
		if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
			wp_enqueue_style( 'vk-components-style' );
		}
	} else {
		wp_enqueue_style( 'vk-components-style' );
	}
}
add_action( 'admin_enqueue_scripts', 'vk_blocks_enqueue_vk_components_style' );
add_action( 'wp_enqueue_scripts', 'vk_blocks_enqueue_vk_components_style' );

/**
 * エディター用の VK Components スタイルを適用
 */
function vk_blocks_enqueue_vk_components_editor_style() {
	$template = wp_get_theme()->Template;
	// lightning 系（ベクトル）の場合 vk-components はテーマなどで読み込むので必要ない
	if ( 'lightning' === $template || 'lightning-pro' === $template || 'katawara' === $template ) {
		return;
	}

	// スタイルが登録されていない場合は登録
	if ( ! wp_style_is( 'vk-components-style', 'registered' ) ) {
		VK_Component_Posts::register_style( 'vk-components-style' );
	}

	// スタイルを適用
	wp_enqueue_style( 'vk-components-style' );
}
add_action( 'enqueue_block_assets', 'vk_blocks_enqueue_vk_components_editor_style' );
