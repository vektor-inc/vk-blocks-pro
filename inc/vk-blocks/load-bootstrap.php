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

/**
 * Load Bootstrap on iframe(Site editor)
 * for Block theme
 *
 * @return void
 */
function vk_blocks_load_bootstrap_for_site_editor() {
	if ( function_exists( 'wp_is_block_theme' ) ) { // Cope with bofore WP5.8.
		if ( wp_is_block_theme() && is_admin() ) {
			$style_path = wp_normalize_path( VK_BLOCKS_DIR_PATH . '/build/bootstrap_vk_using.css' );
			if ( file_exists( $style_path ) ) {
				$dynamic_css = file_get_contents( $style_path );
				wp_add_inline_style( 'wp-edit-blocks', $dynamic_css );
			}
		}
	}
}
add_action( 'init', 'vk_blocks_load_bootstrap_for_site_editor' );

/**
 * Delete old load bootstrap options
 *
 * 以前はBootstrapを読み組むかどうかの設定値 vk_blocks_load_bootstrap があったが、
 * 環境に応じて自動読み込みに変更したので、vk_blocks_load_bootstrap を削除処理追加
 *
 * @since 1.25.0
 * @param string $hook_suffix : display screen.
 * @return void
 */
function vk_blocks_delete_load_bootstrap_options( $hook_suffix ) {
	if ( 'settings_page_vk_blocks_options' === $hook_suffix ) {
		$options = get_option( 'vk_blocks_options' );
		if ( ! empty( $options['load_bootstrap'] ) ) {
			$options['load_bootstrap'] = true;
			update_option( 'vk_blocks_options', $options );
			// Delite abolished option.
			delete_option( 'vk_blocks_load_bootstrap' );
		}
	}
}
add_action( 'admin_enqueue_scripts', 'vk_blocks_delete_load_bootstrap_options' );
