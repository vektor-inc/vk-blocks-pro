<?php
/**
 * Plugin Name: VK Blocks Pro
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Gutenberg's blocks.
 * Version: 1.28.0.0
 * Stable tag: 1.27.9.0
 * Requires at least: 5.8
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

// Composer のファイルを読み込み ( composer install --no-dev ).
require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
// Set plugin dir path.
define( 'VK_BLOCKS_DIR_PATH', plugin_dir_path( __FILE__ ) );
// Set Plugin Dir URL.
define( 'VK_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

/*
無料版の VK Blocks の無効化が正常に動作しなかった場合に無料版の関数が先に定義され
重複 -> Fatal error になるため function_exists は フォールバックとして付与している
*/
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
 * Perform update checks on VK Blocks.
 *
 * @return void
 */
function vk_blocks_update_checker() {

	// Cope with : WP HTTP Error: cURL error 60: SSL certificate problem: certificate has expired.
	add_filter( 'https_ssl_verify', '__return_false' );

	$vk_blocks_update_checker = Puc_v4_Factory::buildUpdateChecker(
		'https://vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
		__FILE__,
		'vk-blocks-pro'
	);

	$vk_blocks_update_checker->addQueryArgFilter( 'vk_blocks_get_license_check_query_arg' );
	$options = get_option( 'vk_blocks_options' );
	$license = esc_html( $options['vk_blocks_pro_license_key'] );

	// 管理画面 かつ  テーマオプションの編集権限がある場合
	if ( is_admin() && current_user_can( 'edit_theme_options' ) ) {
		$network_runnning_pro = false;

		// マルチサイトでOriginal Brand Unitが動いていたら
		if ( is_multisite() ) {
			$network_options = get_site_option( 'active_sitewide_plugins', array() );
			if ( isset( $network_options['lightning-original-brand-unit/lightning-original-brand-unit.php'] ) ) {
				$network_runnning_pro = true;
			}
		}

		// マルチサイトでOriginal Brand Unitが動いていない && Original Brand Unitが有効になっていない
		$active_plugins = get_option( 'active_plugins', array() );
		if ( ! $network_runnning_pro && ! in_array( 'lightning-original-brand-unit/lightning-original-brand-unit.php', $active_plugins, true ) ) {
			$state  = $vk_blocks_update_checker->getUpdateState();
			$update = $state->getUpdate();

			// ライセンスキーが未入力の場合.
			if ( empty( $license ) && wp_get_theme()->Template !== 'katawara' ) {
				add_action(
					'admin_notices',
					function() {
						echo '<div class="error"><p>';
						echo wp_kses_post( __( 'License Key has no registered.', 'vk-blocks' ) );
						echo wp_kses_post( __( 'You need register License Key at Settings > VK Blocks > License Key.', 'vk-blocks' ) );
						echo '</p><p>';
						/* translators: %s: 再読み込みURL */
						echo wp_kses_post( sprintf( __( 'Even after license key registration you still seeing this message, <a href="%s">please click here</a>.', 'vk-blocks' ), admin_url() . '/update-core.php?force-check=1' ) );
						echo '</p></div>';
					}
				);
			}

			if (
				! empty( $update )
				&& version_compare( $update->version, vk_blocks_get_version(), '>' )
				&& empty( $update->download_url )
				) {
				add_action(
					'admin_notices',
					function() use ( $vk_blocks_update_checker ) {
						$link_url = wp_nonce_url(
							add_query_arg(
								array(
									'puc_check_for_updates' => 1,
									'puc_slug' => $vk_blocks_update_checker->slug,
								),
								self_admin_url( 'plugins.php' )
							),
							'puc_check_for_updates'
						);

						echo '<div class="error"><p>';
						echo wp_kses_post(
							sprintf(
							/* translators: %s: 再読み込みURL */
								__(
									'Your license is not valid are expired.
						Even after license key registration you still seeing this message, <a href="%s">please click here</a>.',
									'vk-blocks'
								),
								$link_url
							)
						);
						if ( get_locale() === 'ja' ) {
							/* translators: %s: アップデートURL */
							echo wp_kses_post( sprintf( __( 'If you need update. get <a href="%s" target="_blank">Update License</a>.', 'vk-blocks' ), 'https://vws.vektor-inc.co.jp/product/lightning-g3-pro-pack' ) );
						}
						echo '</p></div>';
					}
				);
			}
		}
	}
}



/**
 * Load updater ( Pro version only )
 */
$vk_blocks_plugin_base_dir = plugin_dir_path( __FILE__ );
if ( strpos( $vk_blocks_plugin_base_dir, 'vk-blocks-pro' ) !== false ) {
	add_action( 'after_setup_theme', 'vk_blocks_update_checker' );
}


/**
 * Register update license key
 *
 * @param array $query_args : updatechacker array.
 * @return $query_args
 */
function vk_blocks_get_license_check_query_arg( $query_args ) {
	$options = get_option( 'vk_blocks_options' );
	$license = esc_html( $options['vk_blocks_pro_license_key'] );

	if ( ! empty( $license ) ) {
		$query_args['vk-blocks-pro-license-key'] = $license;
	}
	$query_args['template'] = wp_get_theme()->Template;

	return $query_args;
}






