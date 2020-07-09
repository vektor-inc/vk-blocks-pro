<?php

/*-------------------------------------------*/
/*  Load modules
/*-------------------------------------------*/
if ( ! class_exists( 'Vk_Admin' ) ) {
	require_once dirname( __FILE__ ) . '/package/class-vk-admin.php';
}

$admin_pages = array( 'settings_page_vk_blocks_options' );
Vk_Admin::admin_scripts( $admin_pages );

global $vk_blocks_prefix;
$vk_blocks_prefix = 'VK Blocks Pro ';

function vk_blocks_setting_menu() {
	$custom_page = add_options_page(
		__( 'VK Blocks setting', 'vk-blocks' ),       // Name of page
		_x( 'VK Blocks', 'label in admin menu', 'vk-blocks' ),                // Label in menu
		'edit_theme_options',               // Capability required　このメニューページを閲覧・使用するために最低限必要なユーザーレベルまたはユーザーの種類と権限。
		'vk_blocks_options',               // ユニークなこのサブメニューページの識別子
		'vk_blocks_setting_page'         // メニューページのコンテンツを出力する関数
	);
	if ( ! $custom_page ) {
		return;
	}
}
add_action( 'admin_menu', 'vk_blocks_setting_menu' );


function vk_blocks_setting() {
	$options = get_option( 'vk_blocks_balloon_meta' );
    $image_number = 15;
    $image_number = apply_filters( 'vk_blocks_image_number', $image_number );
	?>

	<form method="post" action="<?php echo esc_url( $_SERVER['REQUEST_URI'] ) ;?>">
		<?php wp_nonce_field( 'vkb-nonce-key', 'vkb-setting-page' ); ?>
        <div>
            <section>
                <h3 id="baloon-image-setting"><?php _e( 'Balloon Image Setting', 'vk-blocks' ); ?></h3>
                <table class="form-table">
                    <?php for( $i = 1; $i <= $image_number; $i++ ) : ?>
                        <tr>
							<th>
								<?php echo __( 'Ballon Image Name ', 'vk-blocks' ) . '[' . $i . ']'; ?>
							</th>
                            <?php
                            $name = '';
                            if ( ! empty( $options['default_icons'][$i]['name'] ) ) {
                                $name = $options['default_icons'][$i]['name'];
                            }
                            ?>
							<td><input type="text" name="vk_blocks_balloon_meta[default_icons][<?php echo $i; ?>][name]" id="author_box_title" value="<?php echo esc_attr( $name ); ?>" style="width:50%;" /></td>
						</tr>
						<tr>
                            <th>
								<?php echo __( 'Ballon Image ', 'vk-blocks' ) . '[' . $i . ']'; ?>
							</th>
								<td>
								<?php
                                // 現在保存されている画像idを取得して表示
                                $image = '';
                                if ( ! empty( $options['default_icons'][$i]['src'] ) ) {
                                    $image = $options['default_icons'][$i]['src'];
                                }
								?>
								<div class="_display" style="height:auto">
									<?php if ( $image ) : ?>
										<img src="<?php echo $image; ?>" style="width:200px;height:auto;" />
									<?php endif; ?>
								</div>

								<button class="button button-default button-block" style="display:block;width:200px;text-align: center; margin:4px 0;" type="button" onclick="veu_default_image_additional(this);">
									<?php _e( 'Set image', 'vk-blocks' ); ?>
								</button>

								<input type="hidden" class="__id" name="vk_blocks_balloon_meta[default_icons][<?php echo $i; ?>][src]" value="<?php echo esc_attr( $image ); ?>" />


                            </td>
                        </tr>
                    <?php endfor; ?>
					<script type="text/javascript">
									if(veu_default_image_additional == undefined){
										var veu_default_image_additional = function(e){
											var d=jQuery(e).parent().children("._display");
											var w=jQuery(e).parent().children('.__id')[0];
											console.log(wp)
											console.log(wp.media)
											var u=wp.media({library:{type:'image'},multiple:false}).on('select', function(e){
												u.state().get('selection').each(function(f){
													// もともと表示されてた img タグを削除
													d.children().remove();
													// 新しく画像タグを挿入
													d.append(jQuery('<img style="width:200px;mheight:auto">').attr('src',f.toJSON().url));
													jQuery(w).val(f.toJSON().url).change(); });
											});
											u.open();
										};
									}
								</script>
                </table>
				<?php submit_button(); ?>
            </section>
        </div>
    </form>

	<?php
}


/*-------------------------------------------*/
/*	Setting Page
/*-------------------------------------------*/
function vk_blocks_setting_page() {
    global $vk_blocks_prefix;
	$get_page_title = $vk_blocks_prefix . __( 'Main Setting', 'vk-post-author-display' );

	$get_logo_html = '';

	$get_menu_html  = '<li><a href="#baloon-image-setting">' . __( 'Baloon Image Setting', 'vk-blocks' ) . '</a></li>';

	Vk_Admin::admin_page_frame( $get_page_title, 'vk_blocks_setting', $get_logo_html, $get_menu_html );
}

function vk_blocks_setting_option_save() {
	if ( isset( $_POST['vk_blocks_balloon_meta'] ) && $_POST['vk_blocks_balloon_meta'] ) {

		if ( check_admin_referer( 'vkb-nonce-key', 'vkb-setting-page' ) ) {
			// 保存処理
			if ( isset( $_POST['vk_blocks_balloon_meta'] ) && $_POST['vk_blocks_balloon_meta'] ) {
				update_option( 'vk_blocks_balloon_meta', $_POST['vk_blocks_balloon_meta'] );
			} else {
				update_option( 'vk_blocks_balloon_meta', '' );
			}

			wp_safe_redirect( menu_page_url( 'vk_blocks_options', false ) );
		}
	}
}
add_action( 'admin_init', 'vk_blocks_setting_option_save', 10, 2 );
