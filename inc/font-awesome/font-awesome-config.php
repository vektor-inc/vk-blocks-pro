<?php
/**
 * VK Blocks Font Awesome
 *
 * @package vk_blocks
 */

use VektorInc\VK_Font_Awesome_Versions\VkFontAwesomeVersions;

/*
 * Font Awesome Load modules
 */
if ( ! class_exists( 'Vk_Font_Awesome_Versions' ) ) {
	if ( ! vk_blocks_is_lightning() ) {
		new VkFontAwesomeVersions();
		global $font_awesome_directory_uri;
		// phpcs:ignore
		$font_awesome_directory_uri = VK_BLOCKS_DIR_URL . 'vendor/vektor-inc/font-awesome-versions/src/';
	}
}

/**
 * Font Awsome のアイコンの URL を渡す
 */
function vk_blocks_font_awesome_version() {
	$options     = VkFontAwesomeVersions::get_option_fa();
	$fa_icon_url = '';
	if ( '4.7' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/v4/icons/';
	} elseif ( '5_WebFonts_CSS' === $options || '5_SVG_JS' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/v5/search?m=free';
	} elseif ( '6_WebFonts_CSS' === $options || '6_SVG_JS' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/search?m=free';
	}

	wp_localize_script( 'vk-blocks-build-js', 'vkFontAwesome', array( 'iconsUrl' => $fa_icon_url ) );
}
add_action( 'init', 'vk_blocks_font_awesome_version', 10 );
