<?php
/**
 * VK Blocks Responsive Spacer Setting
 *
 * @package VK Blocks
 */

$vk_blocks_margin_unit_array = array(
	array(
		'label' => __( 'px', 'vk-blocks' ),
		'value' => 'px',
	),
	array(
		'label' => __( 'em', 'vk-blocks' ),
		'value' => 'em',
	),
	array(
		'label' => __( 'rem', 'vk-blocks' ),
		'value' => 'rem',
	),
);

$vk_blocks_margin_size_array = vk_blocks_margin_size_array();
$vk_blocks_options           = vk_blocks_get_options();
?>
<section>
	<h3 id="margin-setting"><?php esc_html_e( 'Common Margin Setting', 'vk-blocks' ); ?></h3>
	<p><?php esc_html_e( 'Please specify the size of the common margin used for responsive spacers, etc.', 'vk-blocks' ); ?></p>

	<p>
	<span><?php esc_html_e( 'Unit', 'vk-blocks' ); ?></span>
			<select name="vk_blocks_options[margin_unit]" style="width:7em;">
			<?php
			foreach ( $vk_blocks_margin_unit_array as $vk_blocks_margin_unit ) :
					$vk_blocks_selected = '';
				if ( $vk_blocks_options['margin_unit'] === $vk_blocks_margin_unit['value'] ) {
					$vk_blocks_selected = ' selected';
				}
				?>
				<option value="<?php echo esc_attr( $vk_blocks_margin_unit['value'] ); ?>"<?php echo esc_attr( $vk_blocks_selected ); ?>>
					<?php echo esc_html( $vk_blocks_margin_unit['label'] ); ?>
				</option>
			<?php endforeach; ?>
			</select>
			</p>
			<ul class="no-style spacer-input">
			<?php foreach ( $vk_blocks_margin_size_array as $vk_blocks_margin_size ) : ?>
				<li>
					<span>
					<?php esc_html_e( 'Margin', 'vk-blocks' ); ?> [ <?php echo esc_html( $vk_blocks_margin_size['label'] ); ?> ] : </span>
					<?php
					$vk_blocks_device_array = array(
						'pc'     => __( 'PC', 'vk-blocks' ),
						'tablet' => __( 'Tablet', 'vk-blocks' ),
						'mobile' => __( 'Mobile', 'vk-blocks' ),
					);
					foreach ( $vk_blocks_device_array as $vk_blocks_device_key => $vk_blocks_device_label ) {
						?>
						<?php echo esc_html( $vk_blocks_device_label ); ?>
						<input
						type="number"
						name="vk_blocks_options[margin_size][<?php echo esc_attr( $vk_blocks_margin_size['value'] ); ?>][<?php echo esc_attr( $vk_blocks_device_key ); ?>]"
						step="0.05"
						value="<?php echo esc_attr( vk_blocks_get_spacer_size( $vk_blocks_options, $vk_blocks_margin_size['value'], $vk_blocks_device_key ) ); ?>"
					>
						<?php
					}
					?>
				</li>
			<?php endforeach; ?>
	<?php submit_button(); ?>
</section>
