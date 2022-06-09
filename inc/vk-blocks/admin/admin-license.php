<?php
/**
 * VK Blocks License Setting
 *
 * @package VK Blocks
 */

$vk_blocks_options = vk_blocks_get_options();
?>

<section>
	<h3 id="license-setting"><?php esc_html_e( 'License key', 'vk-blocks' ); ?></h3>
	<p><?php esc_html_e( 'Enter a valid Lightning G3 Pro Pack or Lightning Pro license key.', 'vk-blocks' ); ?></p>
	<p><?php esc_html_e( 'Once you enter the license key you will be able to do a one click update from the administration screen.', 'vk-blocks' ); ?></p>
	<label for="vk-blocks-pro-license-key">
			<strong><?php echo esc_html_e( 'License key', 'vk-blocks' ); ?></strong>
	</label>
		<input type="text" id="vk-blocks-pro-license-key" name="vk_blocks_options[vk_blocks_pro_license_key]" size="10" value="<?php echo esc_html( isset( $vk_blocks_options['vk_blocks_pro_license_key'] ) ? $vk_blocks_options['vk_blocks_pro_license_key'] : '' ); ?>">

	<?php submit_button(); ?>
</section>
<script>
	const licenseKeyElem = document.getElementById('vk-blocks-pro-license-key');
	licenseKeyElem.addEventListener('blur', (e) => {
	 	licenseKeyElem.value = licenseKeyElem.value.trim();
	});
</script>
