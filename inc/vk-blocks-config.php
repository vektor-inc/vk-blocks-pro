<?php
/*-------------------------------------------*/
/*  Load modules
/*-------------------------------------------*/
// このファイルは基本 /vk-blocks/vk-blocks-functions.phpを読み込むファイルだけ
// vk-blocks
if ( ! function_exists( 'vkblocks_active' ) ) {

	require_once( 'vk-blocks/vk-blocks-functions.php' );

	// Set asset URL.
	define( 'VK_BLOCKS_URL', plugin_dir_url( __FILE__ ) . 'vk-blocks/' );
	// Set version number.
	define( 'VK_BLOCKS_VERSION', '0.10.1' );


	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK ' );


	// ExUnitなど読み込み先によってはあらかじめ読み込んでいるので不要の場合がある
	require_once( 'font-awesome-config.php' );

	// 管理画面へのBoostrapの読み込み
	function vkblocks_load_bootstrap_admin( $hook_suffix ) {

		if ( is_admin() ) {

			if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
				wp_register_style( 'vkblocks-bootstrap', plugin_dir_url( __FILE__ ) . '/bootstrap-4.1.3/css/bootstrap.min.css', false, '4.1.3' );
				wp_enqueue_style( 'vkblocks-bootstrap' );

			}
		} else {
			wp_register_style( 'vkblocks-bootstrap', plugin_dir_url( __FILE__ ) . '/bootstrap-4.1.3/css/bootstrap.min.css', false, '4.1.3' );
			wp_enqueue_style( 'vkblocks-bootstrap' );
		}

	}

	/**
	 * Boostrapの読み込みを取り消し
	 */
	function vkblocks_remove_bootstrap_admin() {
		wp_dequeue_style( 'vkblocks-bootstrap' );
	}

	/**
	 * カスタマイザー用のチェックボックス
	 *
	 * @param $checked
	 *
	 * @return bool
	 */
	function vkblocks_sanitize_checkbox( $checked ) {
		return ( ( isset( $checked ) && true == $checked ) ? true : false );
	}

	/**
	 * Boostrapの読み込み設定をするカスタマイザー
	 *
	 * @param $wp_customize
	 */
	function vkblocks_customize_register( $wp_customize ) {

		$wp_customize->add_setting(
			'vkblocks_load_bootstrap', array(
				'default'           => false,
				'sanitize_callback' => 'vkblocks_sanitize_checkbox',
			)
		);

		$wp_customize->add_section(
			'vkblocks_load_bootstrap_section', array(
				'title'    => __( 'VK Blocks Bootstrap Setting', 'vk-blocks' ),
				'priority' => 30,
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize, 'vkblocks_load_bootstrap', array(
					'label'       => __( 'Loading Bootstrap4', 'vk-blocks' ),
					'description' => __( 'Check here to load Bootstrap4. If your theme or plugins loading Bootstrap4, uncheck here.', 'vk-blocks' ),
					'type'        => 'checkbox',
					'section'     => 'vkblocks_load_bootstrap_section',
					'settings'    => 'vkblocks_load_bootstrap',
				)
			)
		);
	}
	add_action( 'customize_register', 'vkblocks_customize_register' );

	//カスタマイザーでチェックがあればBoostrapを読み込み
	if ( get_theme_mod( 'vkblocks_load_bootstrap', true ) ) {

		add_action( 'admin_enqueue_scripts', 'vkblocks_load_bootstrap_admin' );
		add_action( 'wp_enqueue_scripts', 'vkblocks_load_bootstrap_admin' );

	} else {

		add_action( 'admin_enqueue_scripts', 'vkblocks_remove_bootstrap_admin' );
		add_action( 'wp_enqueue_scripts', 'vkblocks_remove_bootstrap_admin' );
	}

	function vkblocks_add_setting_link( $links ) {
		$settings_link = '<a href="' . esc_url( admin_url( '/customize.php' ) ) . '">' . __( 'Setting', 'vk-video-unit' ) . '</a>';
		array_unshift( $links, $settings_link );
		return $links;
	}
	add_filter( 'plugin_action_links_vk-blocks/vk-blocks.php', 'vkblocks_add_setting_link', 10, 1 );

}
