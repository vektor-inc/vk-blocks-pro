<?php
/**
 * VK Blocks Load Bootstrap
 *
 * Functions loading Bootstrap lib.
 *
 * https://getbootstrap.jp/
 *
 * @package vk_blocks
 */

/**
 * VK Blocks load bootstrap
 */
function vk_blocks_is_load_bootstrap() {
	$option = get_option( 'vk_blocks_load_bootstrap' );
	if ( vk_blocks_is_lightning() ) {
		return false;
	}
	if ( ! empty( $option ) ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Boostrapの読み込み
 *
 * @param string $hook_suffix hook suffix.
 */
function vk_blocks_load_bootstrap( $hook_suffix ) {
	if ( ! vk_blocks_is_load_bootstrap() ) {
		return;
	}

	wp_register_style( 'vkblocks-bootstrap', VK_BLOCKS_DIR_URL . 'build/bootstrap_vk_using.css', false, '4.3.1' );

	// 管理画面.
	if ( is_admin() ) {
		if ( 'post.php' === $hook_suffix || 'post-new.php' === $hook_suffix ) {
			wp_enqueue_style( 'vkblocks-bootstrap' );
		}
	} else {
		wp_enqueue_style( 'vkblocks-bootstrap' );
	}
}
add_action( 'admin_enqueue_scripts', 'vk_blocks_load_bootstrap' );
add_action( 'wp_enqueue_scripts', 'vk_blocks_load_bootstrap' );


/**
 * Boostrapの読み込み設定をするカスタマイザー
 *
 * @param object $wp_customize Customizer Objects.
 */
function vk_blocks_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'vk_blocks_load_bootstrap_section',
		array(
			'title'    => __( 'VK Blocks Bootstrap Setting', 'vk-blocks' ),
			'priority' => 30,
		)
	);

	$wp_customize->add_setting(
		'vk_blocks_load_bootstrap',
		array(
			'default'           => false,
			'type'              => 'option',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'vk_blocks_sanitize_checkbox',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Color_Control(
			$wp_customize,
			'vk_blocks_load_bootstrap',
			array(
				'label'       => __( 'Loading Bootstrap4', 'vk-blocks' ),
				'description' => __( 'Check here to load Bootstrap4. If your theme or plugins loading Bootstrap4, uncheck here.', 'vk-blocks' ),
				'type'        => 'checkbox',
				'section'     => 'vk_blocks_load_bootstrap_section',
				'settings'    => 'vk_blocks_load_bootstrap',
			)
		)
	);
}

// Lightning 系じゃない時にカスタマイズパネルを表示.
if ( ! vk_blocks_is_lightning() ) {
	add_action( 'customize_register', 'vk_blocks_customize_register' );
}

/**
 * VK Blocks add setting link
 *
 * @param array $links VK Blocks action links.
 */
function vk_blocks_add_setting_link( $links ) {
	$settings_link = '<a href="' . esc_url( admin_url( '/customize.php' ) ) . '">' . __( 'Setting', 'vk-blocks' ) . '</a>';
	array_unshift( $links, $settings_link );
	return $links;
}
add_filter( 'plugin_action_links_vk-blocks/vk-blocks.php', 'vk_blocks_add_setting_link', 10, 1 );
