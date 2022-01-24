<?php
/**
 * VK Blocks Font Awesome
 *
 * @package vk_blocks
 */

// Load composer autoload.
require_once dirname( dirname( dirname( __FILE__ ) ) ) . '/vendor/autoload.php';

use VektorInc\VK_Font_Awesome_Versions\VkFontAwesomeVersions;

/*
 * Font Awesome Load modules
 */
if ( ! class_exists( 'Vk_Font_Awesome_Versions' ) ) {
	if ( ! vk_blocks_is_lightning() ) {
		global $font_awesome_directory_uri;
		$font_awesome_directory_uri = plugins_url( '', __FILE__ ) . '/package/'; //phpcs:ignore

		global $set_enqueue_handle_style;
		$set_enqueue_handle_style = 'vkExUnit_common_style'; //phpcs:ignore
	}
}

$vk_blocks_font_awesome_versions = new VkFontAwesomeVersions();
