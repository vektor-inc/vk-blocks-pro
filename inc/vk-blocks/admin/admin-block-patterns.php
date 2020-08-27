<?php
global $vk_blocks_default_options;
$vk_blocks_options  = get_option( 'vk_blocks_options' );
$vk_blocks_options  = wp_parse_args( $vk_blocks_options, $vk_blocks_default_options );
$vk_blocks_template = file_exists( VK_BLOCKS_PATH . 'vk-blocks-pro-template.php' ) ? VK_BLOCKS_PATH . 'vk-blocks-pro-template.php' : '';
?>
<section>
<h3 id="block-template-setting"><?php esc_html_e( 'Block Template Setting', 'vk-blocks' ); ?></h3>
<ul>
	<li>
		<label>
			<input name="vk_blocks_options[hide_wp_block_template]" type="checkbox" <?php checked( isset( $vk_blocks_options['hide_wp_block_template'] ) ); ?> ></input>
			<?php esc_html_e( 'Hide WordPress Block Template', 'vk-blocks' ); ?>
		</label>
	</li>
	<?php if ( ! empty( $vk_blocks_template ) ) : ?>
		<li>
			<label>
				<input name="vk_blocks_options[hide_vk_block_template]" type="checkbox" <?php checked( isset( $vk_blocks_options['hide_vk_block_template'] ) ); ?> ></input>
				<?php esc_html_e( 'Hide VK Block Template', 'vk-blocks' ); ?>
			</label>
		</li>
	<?php endif; ?>
</ul>
<?php submit_button(); ?>
</section>
