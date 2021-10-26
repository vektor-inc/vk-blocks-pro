<?php
/**
 * VK Swiper Config
 *
 * @package Lightning G3
 */
if ( ! class_exists( 'VK_Swiper' ) ) {
	global $vk_swiper_url;
	global $vk_swiper_path;
	$vk_swiper_url  = plugin_dir_url( __FILE__ ) . 'package/';
	$vk_swiper_path = plugin_dir_path( __FILE__ ) . 'package/';
	require_once dirname( __FILE__ ) . '/package/class-vk-swiper.php';
}

