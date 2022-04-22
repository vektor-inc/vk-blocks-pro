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

/*
 * Font Awesome API Load modules
 */
if ( ! class_exists( 'VK_Blocks_Font_Awesome_API' ) ) {
	require_once dirname( __FILE__ ) . '/class-vk-blocks-font-awesome-api.php';
	new VK_Blocks_Font_Awesome_API();
}

/**
 * Font Awsome のアイコンの URL を渡す
 */
function vk_blocks_font_awesome_init() {
	$options     = VkFontAwesomeVersions::get_option_fa();
	$fa_icon_url = '';
	if ( '4.7' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/v4/icons/';
		$fa_family   = 'Font Awesome 4';
	} elseif ( '5_WebFonts_CSS' === $options || '5_SVG_JS' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/v5/search?m=free';
		$fa_family   = 'Font Awesome 5 Free';
	} elseif ( '6_WebFonts_CSS' === $options || '6_SVG_JS' === $options ) {
		$fa_icon_url = 'https://fontawesome.com/search?m=free';
		$fa_family   = 'Font Awesome 6 Free';
	}

	$choice_array = VkFontAwesomeVersions::versions();

	$font_awesome_versions = array();

	foreach ( $choice_array as $key => $value ) {
		$font_awesome_versions[] = array(
			'label' => $value['label'],
			'value' => $key,
		);
	}

	wp_localize_script(
		'vk-blocks-build-js',
		'vkFontAwesome',
		array(
			'iconsUrl'       => $fa_icon_url,
			'iconFamily'     => $fa_family,
			'versions'       => $font_awesome_versions,
			'currentVersion' => $options,
		)
	);
}
add_action( 'init', 'vk_blocks_font_awesome_init' );
