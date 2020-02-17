<?php

/**
 * The admin notice for VK blocks Pro.
 */
function vkblocks_admin_notice_template() {

	global $post_type;

    if ($post_type !== 'wp_block') {
		return;
	}

	$meta = get_user_meta( get_current_user_id(), 'vkblocks_dismissed_notice_template', true );
	if ( $meta ) {
		return;
	}
	?>

	<div id="vkblocks-dismissed-notice-template" class="notice notice-success is-dismissible">
		<p>
			<strong>
				<?php esc_html_e( 'VK Blocks Template Advanced Settings', 'vk-blocks' ); ?>
			</strong>
		</p>
		<p>
			<?php
				printf(
					/* translators: 1: opening a tag, 2: closing a tag */
					esc_html__(
						'If you want to add extra blocks ',
						'vk-blocks'
					),
					'<a href="' . esc_url( __( 'https://www.vektor-inc.co.jp/info/', 'vk-blocks' ) ) . '">',
					'</a>'
				)
			?>
		</p>
		<p>
			<a href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'vkblocks-dismiss-template', 'dismiss_admin_notice' ), 'vkblocks-dismiss-template-' . get_current_user_id() ) ); ?>" target="_parent">
				<?php esc_html_e( 'Dismiss this notice', 'vk-blocks' ); ?></a>
		</p>
	</div>
	<?php
}
add_action( 'admin_notices', 'vkblocks_admin_notice_template' );


function vkblocks_admin_notice_template_dismiss() {
	if ( isset( $_GET['vkblocks-dismiss-template'] ) && check_admin_referer( 'vkblocks-dismiss-template-' . get_current_user_id() ) ) {
		update_user_meta( get_current_user_id(), 'vkblocks_dismissed_notice_template', 1 );
	}
}
add_action( 'admin_head', 'vkblocks_admin_notice_template_dismiss' );