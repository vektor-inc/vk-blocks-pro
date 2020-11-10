<?php
$vk_blocks_options  = vkblocks_get_options();
?>
<section>
	<h3 id="block-template-setting"><?php esc_html_e( 'Display Block Template Setting', 'vk-blocks' ); ?></h3>
	<table class="form-table">
		<tr>
			<th><?php esc_html_e( 'WordPress Block Template', 'vk-blocks' ); ?></th>
			<td>
				<select  name="vk_blocks_options[display_wp_block_template]">
					<option value="hide"<?php vkblocks_the_selected( "hide", $vk_blocks_options['display_wp_block_template'] ) ?>><?php _e( 'Hide' , 'vk-blocks' );?></option>
					<option value="display"<?php vkblocks_the_selected( "display", $vk_blocks_options['display_wp_block_template'] ) ?>><?php _e( 'Display' , 'vk-blocks' );?></option>
				</select>
			</td>
		</tr>
		<?php do_action( 'vk_blocks_pro_template_setting' ) ?>
	</table>
	<?php submit_button(); ?>
</section>
