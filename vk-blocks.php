<?php
/**
 * Plugin Name: VK Blocks Pro
 * Plugin URI: https://github.com/vektor-inc/vk-blocks
 * Description: This is a plugin that extends Block Editor.
 * Version: 1.90.1.0
 * Stable tag: 1.90.0.1
 * Requires at least: 6.3
 * Author: Vektor,Inc.
 * Author URI: https://vektor-inc.co.jp
 * Text Domain: vk-blocks-pro
 *
 * @package vk-blocks
 */

// Do not load directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


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

/**
 * Deactive VK Blocks ( Free )
 *
 * 読み込んでだ時に無料版が有効化されていたら、誤動作しないようになるべく早く無効化するためそのまま実行させている
 * VK Blocks 無料版の 1.36.0 で vk_blocks_is_pro を function_exists を経由せずに定義してしまっているため、
 * 無料版 1.36.0 を停止する前に vk_blocks_is_pro を定義するとエラーになるため、
 * vk_blocks_is_pro の定義前に無料版の無効化処理を行っている
 * 1.36.0無料版有効化時にPRo版を有効化時に一瞬エラーが表示されるが、再読み込みで復帰する
 * 1.36.0無料版をアップデートしてもらわないとこれは避けられないので、当面はこのまま運用する
 *
 * プロ版での読み込みかどうかの判定は strpos を使っているが、
 * strpos は"合致している"にも関わらず返り値は"0"を返してしまうため !== false で処理している.
 */
require_once ABSPATH . 'wp-admin/includes/plugin.php';

if ( strpos( plugin_dir_path( __FILE__ ), 'vk-blocks-pro' ) !== false ) {
	if ( is_plugin_active( 'vk-blocks/vk-blocks.php' ) ) {
		deactivate_plugins( 'vk-blocks/vk-blocks.php' );

		// Deactive ExUnit included VK Blocks.
		$vk_blocks_exunit_common_options = get_option( 'vkExUnit_common_options' );
		if ( ! empty( $vk_blocks_exunit_common_options['active_vk-blocks'] ) ) {
			$vk_blocks_exunit_common_options['active_vk-blocks'] = false;
			update_option( 'vkExUnit_common_options', $vk_blocks_exunit_common_options );
		}
		return;
	}
	if ( is_plugin_active( 'vk-gridcolcard/vk-gridcolcard.php' ) ) {
		deactivate_plugins( 'vk-gridcolcard/vk-gridcolcard.php' );
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		// Deactive ExUnit included VK Blocks.
		$vk_blocks_exunit_common_options = get_option( 'vkExUnit_common_options' );
		if ( ! empty( $vk_blocks_exunit_common_options['active_vk-blocks'] ) ) {
			$vk_blocks_exunit_common_options['active_vk-blocks'] = false;
			update_option( 'vkExUnit_common_options', $vk_blocks_exunit_common_options );
		}
		return;
	}
} elseif ( strpos( plugin_dir_path( __FILE__ ), 'vk-blocks' ) !== false ) {
	if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';
		// Deactive ExUnit included VK Blocks.
		$vk_blocks_exunit_common_options = get_option( 'vkExUnit_common_options' );
		if ( ! empty( $vk_blocks_exunit_common_options['active_vk-blocks'] ) ) {
			$vk_blocks_exunit_common_options['active_vk-blocks'] = false;
			update_option( 'vkExUnit_common_options', $vk_blocks_exunit_common_options );
		}
		return;
	}
}

if ( is_admin() && ! is_network_admin() ) {
	$vk_blocks_options = get_option( 'vkExUnit_common_options' );
	if ( ! empty( $vk_blocks_options['active_vk-blocks'] ) ) {
		$vk_blocks_options['active_vk-blocks'] = false;
		update_option( 'vkExUnit_common_options', $vk_blocks_options );

		add_action(
			'admin_notices',
			function () {
				echo '<div class="updated notice"><p>';
				echo esc_html( __( 'Disabled Blocks module on VK All in One Expansion Unit. Because VK-Blocks Plugin running.', 'vk-blocks-pro' ) );
				echo '</p></div>';
			}
		);
	}
}

/*
無料版の VK Blocks の無効化が正常に動作しなかった場合に無料版の関数が先に定義され
重複 -> Fatal error になるため function_exists は フォールバックとして付与している
*/
if ( ! function_exists( 'vk_blocks_is_pro' ) ) {
	/**
	 * Check Free or Pro
	 *
	 * @return bool
	 */
	function vk_blocks_is_pro() {
		$return = false;
		// 注意 : strpos() は合致した開始位置を返すので、最初に合致すると、
		// "合致している"にも関わらず返り値は"0"を返してしまうため !== false で処理している.
		if ( strpos( plugin_dir_path( __FILE__ ), 'vk-blocks-pro' ) !== false ) {
			$return = true;
		}
		return $return;
	}
}

/****************************************************************************************
 * Start VK Blocks
 * 無料版を無効化した後に書かないと関数の二重宣言などになるので注意
 */

// Composer のファイルを読み込み ( composer install --no-dev ).
require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
// Set plugin dir path.
if ( ! defined( 'VK_BLOCKS_DIR_PATH' ) ) {
	define( 'VK_BLOCKS_DIR_PATH', plugin_dir_path( __FILE__ ) );
}
// Set Plugin Dir URL.
if ( ! defined( 'VK_BLOCKS_DIR_URL' ) ) {
	define( 'VK_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );
}
// Load VK Blocks
require_once plugin_dir_path( __FILE__ ) . 'inc/vk-blocks-config.php';


/****************************************************************************************
 * Load updater ( Pro version only )
 */

if ( function_exists( 'vk_blocks_is_pro' ) && vk_blocks_is_pro() ) {

	// 翻訳を実行
	add_action(
		'init',
		function () {
			$path = plugin_dir_path( __FILE__ ) . 'languages';
			// PHPファイルの翻訳読み込み
			load_textdomain( 'vk-blocks-pro', $path . '/vk-blocks-pro-ja.mo' );

			// JavaScriptファイルの翻訳設定
			wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks-pro', $path );
			wp_set_script_translations( 'vk-blocks-admin-js', 'vk-blocks-pro', $path );
		}
	);

	add_action(
		'plugins_loaded',
		function () {
			$path = plugin_dir_path( __FILE__ ) . 'languages';
			// PHPファイルの翻訳読み込み
			load_textdomain( 'vk-blocks-pro', $path . '/vk-blocks-pro-ja.mo' );

			// JavaScriptファイルの翻訳設定
			wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks-pro', $path );
			wp_set_script_translations( 'vk-blocks-admin-js', 'vk-blocks-pro', $path );
		}
	);


	// 本来 Pro 版でしか読み込まないが、1.36.0.0 は間違って読み込んでしまっており
	// 無料版 1.36.0 を有効化していると previously declared になるため ! function_exists() を通した上で宣言している.
	if ( ! function_exists( 'vk_blocks_update_checker' ) ) {
		/**
		 * Perform update checks on VK Blocks.
		 *
		 * @return void
		 */
		function vk_blocks_update_checker() {

			// Cope with : WP HTTP Error: cURL error 60: SSL certificate problem: certificate has expired.
			add_filter( 'https_ssl_verify', '__return_false' );

			global $vk_blocks_update_checker;

			$vk_blocks_update_checker = YahnisElsts\PluginUpdateChecker\v5\PucFactory::buildUpdateChecker(
				'https://vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
				__FILE__, // この処理を他の場所に移動するとここを変更しないといけなくなるので注意.
				'vk-blocks-pro'
			);

			$vk_blocks_update_checker->addQueryArgFilter( 'vk_blocks_get_license_check_query_arg' );

			// 管理画面 かつ テーマオプションの編集権限がある場合.
			if ( is_admin() && current_user_can( 'edit_theme_options' ) ) {
				$network_runnning_pro = false;

				// マルチサイトでOriginal Brand Unitが動いていたら.
				if ( is_multisite() ) {
					$network_options = get_site_option( 'active_sitewide_plugins', array() );
					if ( isset( $network_options['lightning-original-brand-unit/lightning-original-brand-unit.php'] ) ) {
						$network_runnning_pro = true;
					}
				}

				// マルチサイトでOriginal Brand Unitが動いていない && Original Brand Unitが有効になっていない.
				$active_plugins = get_option( 'active_plugins', array() );
				if ( ! $network_runnning_pro && ! in_array( 'lightning-original-brand-unit/lightning-original-brand-unit.php', $active_plugins, true ) ) {
					add_action(
						'admin_notices',
						function () {
							vk_blocks_the_update_messsage();
						}
					);
				}
			}
		}
	}

	add_action( 'after_setup_theme', 'vk_blocks_update_checker' );

	if ( ! function_exists( 'vk_blocks_license_check' ) ) {
		/**
		 * Lisence Chcker
		 *
		 * @param array $test_data    テストデータ.
		 * @return string $check_result ライセンス認証の結果.
		 */
		function vk_blocks_license_check( $test_data = array() ) {

			// アップデート周りの変数を取得.
			global $vk_blocks_update_checker;

			// オプション値を取得.
			$options = get_option( 'vk_blocks_options' );

			// 返す値
			$check_result = null;

			// テストデータがある場合はそれを処理し、ない場合はそれぞれ取得
			if ( ! empty( $test_data ) ) {

				// 現在のテーマ
				$template = $test_data['template'];

				// Pro 版か否か
				$is_pro = $test_data['is_pro'];

				// ライセンスキー
				$license_key = ! empty( $test_data['license_key'] ) ? $test_data['license_key'] : '';

				// アップデート API
				$update = ! empty( $test_data['update'] ) ? $test_data['update'] : array();
			} else {

				// 現在のテーマ
				$template = wp_get_theme()->Template;

				// Pro 版か否か
				$is_pro = vk_blocks_is_pro();

				// ライセンスキー
				$license_key = ! empty( $options['vk_blocks_pro_license_key'] ) ? $options['vk_blocks_pro_license_key'] : '';

				// アップデート API の情報（オブジェクトは扱いにくいので配列化）
				$update = (array) $vk_blocks_update_checker->getUpdateState()->getUpdate();
			}

			// 条件に応じて認証結果を返す.
			if ( 'katawara' === $template || false === $is_pro ) {

				// Katawara と無料版はライセンス認証免除対象なので 'exemption' を返す
				$check_result = 'exemption';
			} elseif ( empty( $license_key ) ) {

				// それ以外でライセンスキーが空の場合は 'empty' を返す
				$check_result = 'empty';
			} elseif ( ! empty( $update ) && empty( $update['download_url'] ) ) {

				// それ以外でライセンスキーが違う場合は 'invalid' を返す
				$check_result = 'invalid';
			} else {

				// それ以外の場合はライセンスキーが正しいと言えるので 'valid' を返す
				$check_result = 'valid';
			}

			// 実際の API がどう動いているかのチェック用
			// var_dump( $check_result );

			return $check_result;
		}
	}

	if ( ! function_exists( 'vk_blocks_the_update_messsage' ) ) {
		/**
		 * Update alert message
		 *
		 * @return void
		 */
		function vk_blocks_the_update_messsage() {
			global $vk_blocks_update_checker;
			$license_check = vk_blocks_license_check();
			$notice_title  = '';

			// ライセンスキーが未入力の場合.
			if ( 'empty' === $license_check ) {
				$notice_title = __( 'License Key has no registered.', 'vk-blocks-pro' );
			} elseif ( 'invalid' === $license_check ) {

				// ライセンスが切れている あるいは 無効な場合.
				// アップデートは存在するがURLが帰ってこなかった場合.
				$notice_title = __(
					'The VK Blocks Pro license is invalid.',
					'vk-blocks-pro'
				);
			}

			if ( empty( $notice_title ) ) {
				return;
			}

			$link_url = wp_nonce_url(
				add_query_arg(
					array(
						'puc_check_for_updates' => 1,
						'puc_slug'              => $vk_blocks_update_checker->slug,
					),
					self_admin_url( 'plugins.php' )
				),
				'puc_check_for_updates'
			);

			$alert_html  = '';
			$alert_html .= '<div class="error">';
			$alert_html .= '<h4>VK Blocks Pro : ' . $notice_title . '</h4>';
			$alert_html .= '<p>' . __(
				'Please enter a valid license key for any of the following products on the settings screen.',
				'vk-blocks-pro'
			) . '</p>';
			$alert_html .= '<ul>';
			$alert_html .= '<li><a href="https://vws.vektor-inc.co.jp/product/vektor-passport-1y/?rel=vk-blocks-pro-alert" target="_blank">Vektor Passport</a></li>';
			$alert_html .= '<li><a href="https://vws.vektor-inc.co.jp/product/lightning-g3-pro-pack/?rel=vk-blocks-pro-alert" target="_blank">Lightning G3 Pro Pack</a></li>';
			$alert_html .= '<li><a href="https://vws.vektor-inc.co.jp/product/lightning-pro-update-license?rel=vk-blocks-pro-alert" target="_blank">Lightning Pro</a></li>';
			$alert_html .= '</ul>';

			$alert_html .= '<p><a href="' . admin_url( '/options-general.php?page=vk_blocks_options' ) . '" class="button button-primary">' . __( 'Enter the license key', 'vk-blocks-pro' ) . '</a></p>';

			$alert_html .= '<p style="margin-bottom:15px">';
			$alert_html .= __( 'If this display does not disappear even after entering a valid license key, re-acquire the update.', 'vk-blocks-pro' );
			$alert_html .= ' <span class="nowrap">[ <a href="' . $link_url . '">' . __( 'Re-acquisition of updates', 'vk-blocks-pro' ) . '</a> ]</span>';
			$alert_html .= '</p>';

			$alert_html .= '</div>';
			echo wp_kses_post( $alert_html );
		}
	}

	if ( ! function_exists( 'vk_blocks_get_license_check_query_arg' ) ) {
		/**
		 * Register update license key
		 *
		 * @param array $query_args : updatechacker array.
		 * @return $query_args
		 */
		function vk_blocks_get_license_check_query_arg( $query_args ) {
			$options = get_option( 'vk_blocks_options' );
			$license = '';
			if ( ! empty( $options['vk_blocks_pro_license_key'] ) ) {
				$license = esc_html(
					preg_replace(
						"/\A[\x20\xE3\x80\x80]++|[\x20\xE3\x80\x80]++\z/u",
						'',
						$options['vk_blocks_pro_license_key']
					)
				);
			}

			if ( ! empty( $license ) ) {
				$query_args['vk-blocks-pro-license-key'] = $license;
			}
			$query_args['template'] = wp_get_theme()->Template;

			return $query_args;
		}
	}
}
