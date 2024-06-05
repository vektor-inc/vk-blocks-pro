<?php
/**
 * Vk Blocks Pro Admin
 *
 * @package VK Blocks Pro
 */

/**
 * Vk Blocks Pro Menu
 *
 * @param string $pro_menu_html pro menu html.
 */
function vk_blocks_pro_menu( $pro_menu_html ) {
	$pro_menu_html  = '<li><a href="#faq-setting">' . __( 'FAQ Setting', 'vk-blocks-pro' ) . '</a></li>';
	$pro_menu_html .= '<li><a href="#breadcrumb-setting">' . __( 'Breadcrumb Setting', 'vk-blocks-pro' ) . '</a></li>';
	$pro_menu_html .= '<li><a href="#custom-css-setting">' . __( 'Custom CSS Setting', 'vk-blocks-pro' ) . '</a></li>';
	return $pro_menu_html;
}
add_action( 'vk_blocks_pro_menu', 'vk_blocks_pro_menu' );
