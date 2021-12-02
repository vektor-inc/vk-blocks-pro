<?php
/**
 * VK Blocks Admin Notices
 *
 * @package vk-blocks
 */

/**
 * The admin notice for VK blocks Pro.
 */
function vk_blocks_admin_notice_pro() {
	$plugin_base_dir = dirname( __FILE__ );
	$lang            = ( get_locale() === 'ja' ) ? 'ja' : 'en';
	if ( strpos( $plugin_base_dir, 'vk-blocks-pro' ) !== false ) {
		return;
	}

	$meta = get_user_meta( get_current_user_id(), 'vkblocks_dismissed_notice_pro', true );
	if ( $meta ) {
		return;
	}

	if ( 'ja' === $lang ) {
		?>
		<div id="notice-vkblocks-pro" class="notice notice-success is-dismissible">
			<p>
				<strong>
					<?php esc_html_e( 'We\'ve released VK Blocks Pro!', 'vk-blocks' ); ?>
				</strong>
			</p>
			<p>
				<?php
					printf(
						/* translators: 1: opening a tag, 2: closing a tag */
						esc_html__(
							'Thank you for using VK Blocks. We\'ve released VK Blocks Pro. It has more custom blocks to build web site more easily. If you are interested in VK Blocks Pro, Please read %1$s this post %2$s for more details.',
							'vk-blocks'
						),
						'<a href="' . esc_url( __( 'https://www.vektor-inc.co.jp/service/wordpress-plugins/vk-blocks/', 'vk-blocks' ) ) . '">',
						'</a>'
					)
				?>
			</p>
			<p>
				<a href="<?php echo esc_url( __( 'https://www.vektor-inc.co.jp/service/wordpress-plugins/vk-blocks/', 'vk-blocks' ) ); ?>">
					<?php esc_html_e( 'See more', 'vk-blocks' ); ?></a>
				<span> | </span>
				<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'vkblocks-dismiss-pro', 'dismiss_admin_notice' ), 'vkblocks-dismiss-pro-' . get_current_user_id() ) ); ?>" target="_parent">
					<?php esc_html_e( 'Dismiss this notice', 'vk-blocks' ); ?></a>
			</p>
		</div>
		<?php
	}
}
add_action( 'admin_notices', 'vk_blocks_admin_notice_pro' );


/**
 * Dismiss admin notice for VK blocks Pro.
 */
function vk_blocks_admin_notice_dismiss() {
	if ( isset( $_GET['vkblocks-dismiss-pro'] ) && check_admin_referer( 'vkblocks-dismiss-pro-' . get_current_user_id() ) ) {
		update_user_meta( get_current_user_id(), 'vkblocks_dismissed_notice_pro', 1 );
	}
}
add_action( 'admin_head', 'vk_blocks_admin_notice_dismiss' );
