<?php
/**
 * VK Blocks Load Bootstrap
 *
 * Functions loading Bootstrap lib.
 *
 * https://getbootstrap.jp/
 *
 * @package vk_blocks
 */

/**
 * Boostrapの読み込み
 *
 * @param string $hook_suffix hook suffix.
 */
function vk_blocks_load_bootstrap( $hook_suffix ) {
	wp_register_style( 'vkblocks-bootstrap', VK_BLOCKS_DIR_URL . 'build/bootstrap_vk_using.css', false, '4.3.1' );

	// 管理画面.
	if ( is_admin() ) {
		if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
			wp_enqueue_style( 'vkblocks-bootstrap' );
		}
	} else {
		wp_enqueue_style( 'vkblocks-bootstrap' );
	}
}
add_action( 'admin_enqueue_scripts', 'vk_blocks_load_bootstrap' );
add_action( 'wp_enqueue_scripts', 'vk_blocks_load_bootstrap' );
