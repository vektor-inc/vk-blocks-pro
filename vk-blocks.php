<?php
/**
 * Plugin Name: VK Blocks Pro
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Gutenberg's blocks.
 * Version: 0.25.6
 * Author: Vektor,Inc.
 * Author URI: https://vektor-inc.co.jp
 * Text Domain: vk-blocks
 */

// Do not load directly.
defined( 'ABSPATH' ) || die();

$data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
define( 'VK_BLOCKS_PRO_VERSION', $data['version'] );

if ( is_admin() && ! is_network_admin() ) {
	$options = get_option( 'vkExUnit_common_options' );
	if ( !empty( $options['active_vk-blocks'] ) ) {
		$options['active_vk-blocks'] = false;
		update_option( 'vkExUnit_common_options', $options );

		add_action( 'admin_notices', function(){
			echo '<div class="updated notice"><p>';
			echo __( 'Disabled Blocks module. Because VK-Blocks Plugin running.', 'vk-blocks' );
			echo '</p></div>';
		} );
	}
}

require_once 'inc/vk-blocks-config.php';

add_action(
	'plugins_loaded',
	function () {
		// Load language files.
		load_plugin_textdomain( 'vk-blocks', false, 'vk-blocks/inc/vk-blocks/build/languages' );
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
