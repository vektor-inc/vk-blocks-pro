<?php
/**
 * VK Blocks Load VK Components
 *
 * @package vk-blocks
 */

/**
 * Boostrapの読み込み
 *
 * @param string $hook_suffix hook suffix.
 */
function vk_blocks_load_vk_components( $hook_suffix ) {
	$template = wp_get_theme()->Template;
	// lightning 系（ベクトル）の場合 vk-components はテーマなどで読み込むので必要ない
	if ( 'lightning' === $template || 'lightning-pro' === $template || 'katawara' === $template ) {
		return;
	}

	wp_register_style( 'vk-components-style', VK_BLOCKS_DIR_URL . 'build/vk-components.css', false, filemtime( VK_BLOCKS_DIR_PATH . '/build/vk-components.css' ) );

	// 管理画面
	if ( is_admin() ) {
		if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
			wp_enqueue_style( 'vk-components-style' );
		}
	} else {
		wp_enqueue_style( 'vk-components-style' );
	}
}
add_action( 'admin_enqueue_scripts', 'vk_blocks_load_vk_components' );
add_action( 'wp_enqueue_scripts', 'vk_blocks_load_vk_components' );
