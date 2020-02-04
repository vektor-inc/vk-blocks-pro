<?php
/**
 * Plugin Name: VK Blocks Pro
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Gutenberg's blocks.
 * Version: 0.22.0
 * Author: Vektor,Inc.
 * Author URI: https://vektor-inc.co.jp
 * Text Domain: vk-blocks
 */

// Do not load directly.
defined( 'ABSPATH' ) || die();

require_once 'inc/vk-blocks-config.php';

add_action(
	'plugins_loaded',
	function () {
		// Load language files.
		load_plugin_textdomain( 'vk-blocks', false, 'vk-blocks/inc/vk-blocks/build/languages' );
	}
);

/*
  Helpers ( Plugin only )
/*-------------------------------------------*/
if ( ! function_exists( 'vkblocks_deactivate_plugin' ) ) {
	/**
	 * Plugin deactive function
	 *
	 * @param  [type] $plugin_path [description]
	 * @return [type]              [description]
	 */
	function vkblocks_deactivate_plugin( $plugin_path ) {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		if ( is_plugin_active( $plugin_path ) ) {
			$active_plugins = get_option( 'active_plugins' );
			// delete item
			$active_plugins = array_diff( $active_plugins, array( $plugin_path ) );
			// re index
			$active_plugins = array_values( $active_plugins );
			update_option( 'active_plugins', $active_plugins );
		}
	}
}

/*
  Deactive VK Blocks ( Free )
/*
-------------------------------------------*/
/* 関数名入れると無料版の宣言と被ってエラーになるので一時的な回避処理で無名関数を利用 */
add_action(
	'init',
	function() {
		$plugin_base_dir = dirname( __FILE__ );
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
			// Deactive Plugin VK Blocks ( free )
			if ( function_exists( 'vkblocks_deactivate_plugin' ) ) {
				vkblocks_deactivate_plugin( 'vk-blocks/vk-blocks.php' );
			}
			// Deactive ExUnit included VK Blocks
			$options = get_option( 'vkExUnit_common_options' );
			if ( ! empty( $options['active_vk-blocks'] ) ) {
				$options['active_vk-blocks'] = false;
				update_option( 'vkExUnit_common_options', $options );
			}
		}
	}
);

/*
  Load updater
/*-------------------------------------------*/
$plugin_base_dir = dirname( __FILE__ );
if ( strpos( $plugin_base_dir, 'vk-blocks-pro' ) !== false ) {

	$updater_url = dirname( __FILE__ ) . '/inc/plugin-update-checker/plugin-update-checker.php';
	if ( file_exists( $updater_url ) ) {
		require dirname( __FILE__ ) . '/inc/plugin-update-checker/plugin-update-checker.php';
		$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
			'https://vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
			__FILE__,
			'vk-blocks-pro'
		);
	}
}
