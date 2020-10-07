<?php
/**
 * Vk Blocks Pro Admin
 *
 * @package VK Blocks Pro
 */

/**
 * Vk Blocks Pro Admin
 */
function vk_blocks_pro_admin() {
	require_once dirname( __FILE__ ) . '/admin-new-faq.php';
}
add_action( 'vk_blocks_pro_admin', 'vk_blocks_pro_admin' );

/**
 * Vk Blocks Pro Admin
 */
function vk_blocks_pro_template_setting() {
	require_once dirname( __FILE__ ) . '/admin-block-patterns.php';
}
add_action( 'vk_blocks_pro_template_setting', 'vk_blocks_pro_template_setting' );

/**
 * Vk Blocks Pro Menu
 */
function vk_blocks_pro_menu( $pro_menu_html ) {
	$pro_menu_html = '<li><a href="#faq-setting">' . __( 'FAQ Setting', 'vk-blocks' ) . '</a></li>';
	return $pro_menu_html;
}
add_action( 'vk_blocks_pro_menu', 'vk_blocks_pro_menu' );
