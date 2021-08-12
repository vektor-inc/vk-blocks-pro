<?php
/**
 * Admin New FAQ
 *
 * @package vk-blocks
 */

/**
 * VK Blocks Pro New FAQ Admin
 */
$vk_blocks_new_faq_accordion_array = array(
	array(
		'label' => __( 'Disable accordion', 'vk-blocks' ),
		'value' => 'disable',
	),
	array(
		'label' => __( 'Enable accordion and default open ', 'vk-blocks' ),
		'value' => 'open',
	),
	array(
		'label' => __( 'Enable accordion and default close ', 'vk-blocks' ),
		'value' => 'close',
	),
);

$vk_blocks_options = vk_blocks_get_options();
?>
<section>
<h3 id="faq-setting"><?php echo esc_attr( __( 'FAQ Block Setting', 'vk-blocks' ) ); ?></h3>
<select name="vk_blocks_options[new_faq_accordion]">
<?php
foreach ( $vk_blocks_new_faq_accordion_array as $vk_blocks_new_faq_accordion ) :
	?>
	<?php
		$vk_blocks_selected = '';
	if ( $vk_blocks_options['new_faq_accordion'] === $vk_blocks_new_faq_accordion['value'] ) {
		$vk_blocks_selected = ' selected';
	}
	?>
	<option value="<?php echo esc_attr( $vk_blocks_new_faq_accordion['value'] ); ?>"<?php echo esc_attr( $vk_blocks_selected ); ?>>
	<?php echo esc_attr( $vk_blocks_new_faq_accordion['label'] ); ?>
	</option>
<?php endforeach; ?>
</select>
<?php submit_button(); ?>
</section>
