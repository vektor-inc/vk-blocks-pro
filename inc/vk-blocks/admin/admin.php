<?php
/**
 * VK Blocks Admin Setting
 *
 * @package VK Blocks
 */

if ( ! function_exists( 'vk_blocks_setting' ) ) {
	/**
	 * VK Blocks Setting
	 *
	 * @return void
	 */
	function vk_blocks_setting() {
		$options           = get_option( 'vk_blocks_balloon_meta' );
		$image_number      = 15;
		$image_number      = apply_filters( 'vk_blocks_image_number', $image_number );
		$vk_blocks_options = vk_blocks_get_options();
		?>

		<form method="post" action="">
			<?php wp_nonce_field( 'vkb-nonce-key', 'vkb-setting-page' ); ?>
			<?php
			require_once dirname( __FILE__ ) . '/admin-license.php';
			require_once dirname( __FILE__ ) . '/admin-balloon.php';
			require_once dirname( __FILE__ ) . '/admin-margin.php';
			require_once dirname( __FILE__ ) . '/admin-load-separate.php';
			do_action( 'vk_blocks_pro_admin' );
			?>
		</form>
		<?php
	}
}

$vk_blocks_admin_pages = array( 'settings_page_vk_blocks_options' );
Vk_Admin::admin_scripts( $vk_blocks_admin_pages );

global $vk_blocks_prefix;
$vk_blocks_prefix = 'VK';

/**
 * VK Blocks Setting Menu
 *
 * @return void
 */
function vk_blocks_setting_menu() {
	global $vk_blocks_prefix;
	$custom_page = add_options_page(
		$vk_blocks_prefix . ' ' . __( 'Blocks setting', 'vk-blocks' ),       // Name of page
		$vk_blocks_prefix . ' ' . _x( 'Blocks', 'label in admin menu', 'vk-blocks' ),                // Label in menu
		'edit_theme_options',               // Capability required　このメニューページを閲覧・使用するために最低限必要なユーザーレベルまたはユーザーの種類と権限。
		'vk_blocks_options',               // ユニークなこのサブメニューページの識別子
		'vk_blocks_setting_page'         // メニューページのコンテンツを出力する関数
	);
	if ( ! $custom_page ) {
		return;
	}
}
add_action( 'admin_menu', 'vk_blocks_setting_menu' );

/**
 * Setting Page
 */
function vk_blocks_setting_page() {
	global $vk_blocks_prefix;
	$get_page_title = $vk_blocks_prefix . ' ' . __( 'Blocks Setting', 'vk-blocks' );

	$get_logo_html = '<img src="' . plugin_dir_url( __FILE__ ) . '/images/vk-blocks-logo_ol.svg" alt="VK Blocks" />';
	$get_logo_html = apply_filters( 'vk_blocks_logo_html', $get_logo_html );

	$get_menu_html  = '';
	$get_menu_html .= '<li><a href="#license-setting">' . __( 'License Key', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= '<li><a href="#balloon-setting">' . __( 'Balloon Block Setting', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= '<li><a href="#margin-setting">' . __( 'Common Margin Setting', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= '<li><a href="#load-separete-setting">' . __( 'Load Separete Setting', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= apply_filters( 'vk_blocks_pro_menu', '' );

	Vk_Admin::admin_page_frame( $get_page_title, 'vk_blocks_setting', $get_logo_html, $get_menu_html );
}

/**
 * VK Blocks Save Option
 */
function vk_blocks_setting_option_save() {
	if (
		isset( $_POST['vk_blocks_balloon_meta'], $_POST['vkb-setting-page'] )
		&& wp_verify_nonce( sanitize_key( $_POST['vkb-setting-page'] ), 'vkb-nonce-key' )
	) {
		if ( check_admin_referer( 'vkb-nonce-key', 'vkb-setting-page' ) ) {
			// 保存処理
			if (
				isset( $_POST['vk_blocks_balloon_meta'], $_POST['vkb-setting-page'] )
				&& wp_verify_nonce( sanitize_key( $_POST['vkb-setting-page'] ), 'vkb-nonce-key' )
			) {
				$vk_blocks_balloon_meta = sanitize_option( 'vk_blocks_balloon_meta', wp_unslash( $_POST['vk_blocks_balloon_meta'] ) );
				update_option( 'vk_blocks_balloon_meta', $vk_blocks_balloon_meta );
			} else {
				update_option( 'vk_blocks_balloon_meta', '' );
			}
		}
	}
	if (
		isset( $_POST['vk_blocks_options'], $_POST['vkb-setting-page'] )
		&& wp_verify_nonce( sanitize_key( $_POST['vkb-setting-page'] ), 'vkb-nonce-key' )
	) {
		if ( check_admin_referer( 'vkb-nonce-key', 'vkb-setting-page' ) ) {
			if (
				isset( $_POST['vk_blocks_options'], $_POST['vkb-setting-page'] )
				&& wp_verify_nonce( sanitize_key( $_POST['vkb-setting-page'] ), 'vkb-nonce-key' )
			) {
				update_option( 'vk_blocks_options', sanitize_option( 'vk_blocks_options', wp_unslash( $_POST['vk_blocks_options'] ) ) );
			} else {
				update_option( 'vk_blocks_options', '' );
			}
		}
	}
	// wp_safe_redirect( menu_page_url( 'vk_blocks_options', false ) );
}
add_action( 'admin_init', 'vk_blocks_setting_option_save', 10, 2 );

/**
 * VK Blocks add setting link
 *
 * @param array  $links VK Blocks action links.
 * @param string $file Path to the plugin file relative to the plugins directory.
 *
 * @return array
 */
function vk_blocks_add_setting_link( $links, $file ) {
	if ( plugin_basename( VK_BLOCKS_DIR_PATH . '/vk-blocks.php' ) === $file ) {
		$settings_link = '<a href="' . esc_url( admin_url( '/options-general.php?page=vk_blocks_options' ) ) . '">' . __( 'Setting', 'vk-blocks' ) . '</a>';
		array_unshift( $links, $settings_link );
	}
	return $links;
}
add_filter( 'plugin_action_links', 'vk_blocks_add_setting_link', 10, 2 );
