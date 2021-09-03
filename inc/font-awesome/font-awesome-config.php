<?php
/**
 * VK Blocks Font Awesome
 *
 * @package vk_blocks
 */

/*
 * Font Awesome Load modules
 */
if ( ! class_exists( 'Vk_Font_Awesome_Versions' ) ) {
	if ( ! vk_blocks_is_lightning() ) {
		global $vk_blocks_font_awesome_directory_uri;
		$vk_blocks_font_awesome_directory_uri = plugins_url( '', __FILE__ ) . '/package/';

		global $vk_blocks_set_enqueue_handle_style;
		$vk_blocks_set_enqueue_handle_style = 'vkExUnit_common_style';

		require_once dirname( __FILE__ ) . '/package/class-vk-font-awesome-versions.php';
	}
}
