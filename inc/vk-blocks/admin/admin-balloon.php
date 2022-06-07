<?php
/**
 * VK Blocks Admin Balloon
 *
 * @package vk_blocks
 */

?>
<div>
<section>
	<h3 id="balloon-setting"><?php esc_html_e( 'Balloon Setting', 'vk-blocks' ); ?></h3>
	<h4 id="balloon-border-width-setting"><?php esc_html_e( 'Balloon Border Width Setting', 'vk-blocks' ); ?></h4>
	<?php
	$vk_blocks_options = vk_blocks_get_options();
	?>
	<select class="balloon-border-width-selector" id="balloon-border-width-selector" name="vk_blocks_options[balloon_border_width]">
		<?php for ( $vk_blocks_i = 1; $vk_blocks_i <= 4; $vk_blocks_i++ ) : ?>
			<option value="<?php echo esc_attr( $vk_blocks_i ); ?>" <?php selected( intval( $vk_blocks_options['balloon_border_width'] ), $vk_blocks_i, true ); ?>><?php echo esc_html( $vk_blocks_i ); ?>px</option>
		<?php endfor; ?>
	</select>
	<?php submit_button(); ?>
	<h4 id="balloon-image-setting"><?php esc_html_e( 'Balloon Image Setting', 'vk-blocks' ); ?></h4>
	<p>
		<?php esc_html_e( 'You can register frequently used icon images for speech bubble blocks.', 'vk-blocks' ); ?>
		<?php esc_html_e( 'If you change image or name that please click Save Changes button.', 'vk-blocks' ); ?>
	</p>
	<?php $vk_blocks_image_default = VK_BLOCKS_URL . '/admin/images/no-image.png'; ?>
	<ul class="balloonIconList">
		<?php for ( $vk_blocks_i = 1; $vk_blocks_i <= $image_number; $vk_blocks_i++ ) : ?>
			<li>
				<?php
				// 現在保存されている画像idを取得して表示
				$vk_blocks_image = '';
				if ( ! empty( $options['default_icons'][ $vk_blocks_i ]['src'] ) ) {
					$vk_blocks_image = $options['default_icons'][ $vk_blocks_i ]['src'];
					// } else {
					// $vk_blocks_image = $vk_blocks_image_default;
				}
				?>
				<div class="balloonIconList_iconFrame">
					<div style="width:100px;height:100px;object-fit:cover;">
					<?php if ( $vk_blocks_image ) : ?>
						<img src="<?php echo esc_url( $vk_blocks_image ); ?>" class="balloonIconList_iconFrame_src" />
					<?php else : ?>
						<img src="<?php echo esc_url( $vk_blocks_image_default ); ?>" class="balloonIconList_iconFrame_src" />
					<?php endif; ?>
					</div>
				</div>

				<button class="button button-block button-set" type="button" onclick="veu_default_image_additional(this);">
					<?php esc_html_e( 'Select', 'vk-blocks' ); ?>
				</button>
				<button class="button button-block button-delete" type="button" onclick="veu_default_image_delete(this);">
					<?php esc_html_e( 'Delete', 'vk-blocks' ); ?>
				</button>

				<input type="hidden" class="__id" name="vk_blocks_balloon_meta[default_icons][<?php echo esc_attr( $vk_blocks_i ); ?>][src]" value="<?php echo esc_attr( $vk_blocks_image ); ?>" />

				<label for="icon_title['<?php echo esc_attr( $vk_blocks_i ); ?>]" class="balloonIconList_nameLabel"><?php esc_html_e( 'Balloon Image Name', 'vk-blocks' ); ?></label>
				<?php
				$vk_blocks_name = '';
				if ( ! empty( $options['default_icons'][ $vk_blocks_i ]['name'] ) ) {
					$vk_blocks_name = $options['default_icons'][ $vk_blocks_i ]['name'];
				}
				?>
				<input class="balloonIconList_name_input" type="text" name="vk_blocks_balloon_meta[default_icons][<?php echo esc_attr( $vk_blocks_i ); ?>][name]" id="icon_title['<?php echo esc_attr( $vk_blocks_i ); ?>]" value="<?php echo esc_attr( $vk_blocks_name ); ?>" />
			</li>
		<?php endfor; ?>
	</ul>

	<script type="text/javascript">
		if(veu_default_image_additional == undefined){
			var veu_default_image_additional = function(e){
				var d=jQuery(e).parent().children(".balloonIconList_iconFrame");
				var w=jQuery(e).parent().children('.__id')[0];
				var addImgBtn=jQuery(e);
				var delImgBtn=jQuery(e).next();
				var u=wp.media({library:{type:'image'},multiple:false}).on('select', function(e){
					u.state().get('selection').each(function(f){
						// もともと表示されてた img タグを削除
						d.children().remove();
						// 新しく画像タグを挿入
						d.append(jQuery('<img class="balloonIconList_iconFrame_src">').attr('src',f.toJSON().url));
						jQuery(w).val(f.toJSON().url).change();
					});
				});
				u.open();
			};
		}
		if(veu_default_image_delete == undefined){
			var veu_default_image_delete = function(e){
				var d=jQuery(e).parent().children(".balloonIconList_iconFrame");
				var w=jQuery(e).parent().children('.__id')[0];
				var addImgBtn=jQuery(e).prev();
				var delImgBtn=jQuery(e);
				// もともと表示されてた img タグを削除
				d.children().remove();
				// 新しく画像タグを挿入
				d.append(jQuery('<img class="balloonIconList_iconFrame_src">').attr('src','<?php echo esc_url( $vk_blocks_image_default ); ?>'));
				jQuery(w).val('').change();
			};
		}
	</script>

	<?php submit_button(); ?>
</section>
</div>
