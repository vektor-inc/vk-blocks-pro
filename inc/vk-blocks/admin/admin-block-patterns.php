<?php
$vk_blocks_options  = vkblocks_get_options();
$vk_blocks_template = file_exists( VK_BLOCKS_PATH . 'vk-blocks-pro-template.php' ) ? VK_BLOCKS_PATH . 'vk-blocks-pro-template.php' : '';
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
<?php if ( ! empty( $vk_blocks_template ) ) : ?>
<tr>
<th><?php esc_html_e( 'VK Blocks Template', 'vk-blocks' ); ?></th>
<td>
<select  name="vk_blocks_options[display_vk_block_template]">
			<option value="hide"<?php vkblocks_the_selected( "hide", $vk_blocks_options['display_vk_block_template'] ) ?>><?php _e( 'Hide' , 'vk-blocks' );?></option>
			<option value="display"<?php vkblocks_the_selected( "display", $vk_blocks_options['display_vk_block_template'] ) ?>><?php _e( 'Display' , 'vk-blocks' );?></option>
		</select>
</td>
</tr>
<?php endif; ?>
</table>
<?php submit_button(); ?>
</section>
