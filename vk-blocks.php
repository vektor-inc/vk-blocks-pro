<?php
/**
 * Plugin Name: VK Blocks Pro
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Gutenberg's blocks.
 * Version: 1.18.3
 * Requires at least: 5.7
 * Author: Vektor,Inc.
 * Author URI: https://vektor-inc.co.jp
 * Text Domain: vk-blocks
 *
 * @package vk-blocks
 */

// Do not load directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* function_exists は VK Blocks 無料版の無効化が正常に動作しなかった場合のフォールバック */
if ( ! function_exists( 'vk_blocks_get_version' ) ) {
	/**
	 * Get Plugin Version
	 *
	 * @return string
	 */
	function vk_blocks_get_version() {
		$data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
		return $data['version'];
	}
}

/* function_exists は VK Blocks 無料版の無効化が正常に動作しなかった場合のフォールバック */
if ( ! function_exists( 'vk_blocks_deactivate_plugin' ) ) {
	/**
	 * Plugin deactive function
	 *
	 * @param  string $plugin_path Plugin path to disable.
	 * @return void
	 */
	function vk_blocks_deactivate_plugin( $plugin_path ) {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		if ( is_plugin_active( $plugin_path ) ) {
			$active_plugins = get_option( 'active_plugins' );
			// delete active plugin.
			$active_plugins = array_diff( $active_plugins, array( $plugin_path ) );
			// re index active plugin.
			$active_plugins = array_values( $active_plugins );
			update_option( 'active_plugins', $active_plugins );
		}
	}
}

/**
 * Deactive VK Blocks ( Free )
 *
 * 関数名入れると無料版 VK Blocks の宣言と被ってエラーになるので一時的な回避処理で無名関数を利用している
 */
add_action(
	'admin_init',
	function() {
		$plugin_base_dir = dirname( __FILE__ );
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
			// Deactive Plugin VK Blocks ( free ).
			if ( function_exists( 'vk_blocks_deactivate_plugin' ) ) {
				vk_blocks_deactivate_plugin( 'vk-blocks/vk-blocks.php' );
			}
		}
		// Deactive ExUnit included VK Blocks.
		$options = get_option( 'vkExUnit_common_options' );
		if ( ! empty( $options['active_vk-blocks'] ) ) {
			$options['active_vk-blocks'] = false;
			update_option( 'vkExUnit_common_options', $options );
		}
	},
	9999
);

if ( is_admin() && ! is_network_admin() ) {
	$vk_blocks_options = get_option( 'vkExUnit_common_options' );
	if ( ! empty( $vk_blocks_options['active_vk-blocks'] ) ) {
		$vk_blocks_options['active_vk-blocks'] = false;
		update_option( 'vkExUnit_common_options', $vk_blocks_options );

		add_action(
			'admin_notices',
			function() {
				echo '<div class="updated notice"><p>';
				echo esc_html( __( 'Disabled Blocks module on VK All in One Expansion Unit. Because VK-Blocks Plugin running.', 'vk-blocks' ) );
				echo '</p></div>';
			}
		);
	}
}

/**
 * Load VK Blocks
 */
require_once plugin_dir_path( __FILE__ ) . 'inc/vk-blocks-config.php';

/**
 * Load updater ( Pro version only )
 */
$vk_blocks_plugin_base_dir = plugin_dir_path( __FILE__ );
if ( strpos( $vk_blocks_plugin_base_dir, 'vk-blocks-pro' ) !== false ) {

	// Cope with : WP HTTP Error: cURL error 60: SSL certificate problem: certificate has expired.
	add_filter( 'https_ssl_verify', '__return_false' );

	$vk_blocks_updater_url = plugin_dir_path( __FILE__ ) . 'inc/vk-blocks-pro/plugin-update-checker/plugin-update-checker.php';
	if ( file_exists( $vk_blocks_updater_url ) ) {
		require plugin_dir_path( __FILE__ ) . 'inc/vk-blocks-pro/plugin-update-checker/plugin-update-checker.php';
		$vk_blocks_update_checker = Puc_v4_Factory::buildUpdateChecker(
			'https://vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
			__FILE__,
			'vk-blocks-pro'
		);
	}
}
