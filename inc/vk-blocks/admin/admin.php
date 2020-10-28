<?php
if ( ! function_exists('vk_blocks_setting') ) {
	function vk_blocks_setting() {
		$options = get_option( 'vk_blocks_balloon_meta' );
		$image_number = 15;
		$image_number = apply_filters( 'vk_blocks_image_number', $image_number );
		$vk_blocks_options = vkblocks_get_options();
		?>

		<form method="post" action="<?php echo esc_url( $_SERVER['REQUEST_URI'] ) ;?>">
			<?php wp_nonce_field( 'vkb-nonce-key', 'vkb-setting-page' ); ?>
			<?php
			require_once dirname( __FILE__ ) . '/admin-block-patterns.php';
			require_once dirname( __FILE__ ) . '/admin-balloon.php';
			do_action( 'vk_blocks_pro_admin' );
			?>
		</form>
	<?php
	}
}
// require_once dirname( __FILE__ ) . '/admin-css-optimize.php';

$admin_pages = array( 'settings_page_vk_blocks_options' );
Vk_Admin::admin_scripts( $admin_pages );

global $vk_blocks_prefix;
$vk_blocks_prefix = 'VK';

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

/*-------------------------------------------*/
/*	Setting Page
/*-------------------------------------------*/
function vk_blocks_setting_page() {
    global $vk_blocks_prefix;
	$get_page_title = $vk_blocks_prefix . ' ' . __( 'Blocks Setting', 'vk-blocks' );

	$get_logo_html = '<img src="'.plugin_dir_url( __FILE__ ).'/images/vk-blocks-logo_ol.svg'.'" alt="VK Blocks" />';
	$get_logo_html = apply_filters( 'vk_blocks_logo_html', $get_logo_html );

	$get_menu_html  = '';
	$get_menu_html .= '<li><a href="#block-template-setting">' . __( 'Block Template Setting', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= '<li><a href="#balloon-image-setting">' . __( 'Balloon Image Setting', 'vk-blocks' ) . '</a></li>';
	$get_menu_html .= apply_filters( 'vk_blocks_pro_menu', '' );

	Vk_Admin::admin_page_frame( $get_page_title, 'vk_blocks_setting', $get_logo_html, $get_menu_html );
}

/*-------------------------------------------*/
/*	save option
/*-------------------------------------------*/
function vk_blocks_setting_option_save() {
	if ( isset( $_POST['vk_blocks_balloon_meta'] ) && $_POST['vk_blocks_balloon_meta'] ) {
		if ( check_admin_referer( 'vkb-nonce-key', 'vkb-setting-page' ) ) {
			// 保存処理
			if ( isset( $_POST['vk_blocks_balloon_meta'] ) && $_POST['vk_blocks_balloon_meta'] ) {
				update_option( 'vk_blocks_balloon_meta', $_POST['vk_blocks_balloon_meta'] );
			} else {
				update_option( 'vk_blocks_balloon_meta', '' );
			}
		}
	}
	if ( isset( $_POST['vk_blocks_options'] ) && $_POST['vk_blocks_options'] ) {
		if ( check_admin_referer( 'vkb-nonce-key', 'vkb-setting-page' ) ) {
			if ( isset( $_POST['vk_blocks_options'] ) && $_POST['vk_blocks_options'] ) {
				update_option( 'vk_blocks_options', $_POST['vk_blocks_options'] );
			} else {
				update_option( 'vk_blocks_options', '' );
			}
		}
	}
	// wp_safe_redirect( menu_page_url( 'vk_blocks_options', false ) );
}
add_action( 'admin_init', 'vk_blocks_setting_option_save', 10, 2 );
