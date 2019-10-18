<?php
/**
 * Plugin Name: VK Blocks
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Gutenberg's blocks.
 * Version: 0.10.1
 * Author: Vektor,Inc.
 * Author URI:
 * Text Domain: vk-blocks
 */

// Do not load directly.
defined( 'ABSPATH' ) || die();

require_once( 'inc/vk-blocks-config.php' );

add_action(
	'plugins_loaded', function () {
		// Load language files.
		// load_plugin_textdomain( 'vk-blocks', false, basename( dirname( __FILE__ ) ) . '/inc/vk-blocks/build/languages' );
		load_plugin_textdomain( 'vk-blocks', false, 'vk-blocks/inc/vk-blocks/build/languages' );
	}
);
