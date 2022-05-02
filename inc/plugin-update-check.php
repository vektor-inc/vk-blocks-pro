<?php
/**
 * VK Blocks Pro Update Checker
 *
 * @package vektor-inc/vk-blocks-pro
 */

/**
 * Perform update checks on VK Blocks.
 *
 * @return void
 */
function vk_blocks_update_checker() {

	// Cope with : WP HTTP Error: cURL error 60: SSL certificate problem: certificate has expired.
	add_filter( 'https_ssl_verify', '__return_false' );

	$update_checker = Puc_v4_Factory::buildUpdateChecker(
		'https://vws.vektor-inc.co.jp/updates/?action=get_metadata&slug=vk-blocks-pro',
		__FILE__,
		'vk-blocks-pro'
	);

	$update_checker->addQueryArgFilter( 'vk_blocks_get_license_check_query_arg' );

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
				function () use ( $update_checker ) {
					vk_blocks_the_update_messsage( $update_checker );
				}
			);
		}
	}
}
add_action( 'after_setup_theme', 'vk_blocks_update_checker' );


/**
 * Update alert message
 *
 * @param object $update_checker .
 * @return void
 */
function vk_blocks_the_update_messsage( $update_checker ) {
	$state  = $update_checker->getUpdateState();
	$update = $state->getUpdate();

	$options = get_option( 'vk_blocks_options' );
	if ( ! empty( $options['vk_blocks_pro_license_key'] ) ) {
		$license = esc_html( $options['vk_blocks_pro_license_key'] );
	} else {
		$license = '';
	}

	$notice_title = '';

	// ライセンスキーが未入力の場合.
	if ( empty( $license ) && wp_get_theme()->Template !== 'katawara' ) {
		$notice_title = __( 'License Key has no registered.', 'vk-blocks' );
	} elseif ( ! empty( $update ) && empty( $update->download_url ) ) {

		// ライセンスが切れている あるいは 無効な場合.
		// アップデートは存在するがURLが帰ってこなかった場合.
		$notice_title = __(
			'The VK Blocks Pro license is invalid.',
			'vk-blocks'
		);
	}

	if ( empty( $notice_title ) ) {
		return;
	}

	$link_url = wp_nonce_url(
		add_query_arg(
			array(
				'puc_check_for_updates' => 1,
				'puc_slug'              => $update_checker->slug,
			),
			self_admin_url( 'plugins.php' )
		),
		'puc_check_for_updates'
	);

	$alert_html  = '';
	$alert_html .= '<div class="error">';
	$alert_html .= '<h4>' . $notice_title . '</h4>';
	$alert_html .= '<p>' . __(
		'Enter a valid license key for any of the following products on the settings screen.',
		'vk-blocks'
	) . '</p>';
	$alert_html .= '<ul>';
	$alert_html .= '<li><a href="https://vws.vektor-inc.co.jp/product/lightning-g3-pro-pack/?rel=vk-blocks-pro-alert" target="_blank">Lightning G3 Pro Pack</a></li>';
	$alert_html .= '<li><a href="https://vws.vektor-inc.co.jp/product/lightning-pro-update-license?rel=vk-blocks-pro-alert" target="_blank">Lightning Pro</a></li>';
	$alert_html .= '</ul>';

	$alert_html .= '<p><a href="' . admin_url( '/options-general.php?page=vk_blocks_options' ) . '" class="button button-primary">' . __( 'Click here to enter the license key', 'vk-blocks' ) . '</a></p>';

	$alert_html .= '<p>' . sprintf(
		/* translators: %s: 再読み込みURL */
		__(
			'Even after valid license key registration you still seeing this message, <a href="%s">please click here to reload</a>.',
			'vk-blocks'
		),
		$link_url
	) . '</p>';
	$alert_html .= '</div>';
	echo wp_kses_post( $alert_html );
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
