<?php
/**
 * VK Blocks should_load_separate_assets Setting
 *
 * @package VK Blocks
 */

$vk_blocks_options = vk_blocks_get_options();
?>
<section>
	<h3 id="load-separete-setting"><?php esc_html_e( 'Load Separete Setting', 'vk-blocks' ); ?></h3>
	<p><?php esc_html_e( 'Note that the order in which CSS/JS are loaded will change.', 'vk-blocks' ); ?></p>

	<label>
		<input type="checkbox" name="vk_blocks_options[load_separate_option]" id="checkbox_active" value="true"
		<?php
		if ( $vk_blocks_options['load_separate_option'] ) {
			echo 'checked'; }
		?>
		/>
		<span><?php esc_html_e( 'Load Separete Option on', 'vk-blocks' ); ?></span>
	</label>
	<?php submit_button(); ?>
</section>
