<?php
/**
 * VK Blocks Responsive Spacer Setting
 *
 * @package VK Blocks
 */

$margin_unit_array = array(
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

$vk_margin_size_array = vk_blocks_margin_size_array();
$options              = vk_blocks_get_options();
?>
<section>
	<h3 id="margin-setting"><?php echo __( 'Common Margin Setting', 'vk-blocks' ); ?></h3>
	<p><?php _e( 'Please specify the size of the common margin used for responsive spacers, etc.', 'vk-blocks' ); ?></p>

	<p>
	<span><?php _e( 'Unit', 'vk-blocks' ); ?></span>
			<select name="vk_blocks_options[margin_unit]" style="width:7em;">
			<?php
			foreach ( $margin_unit_array as $margin_unit ) :
					$vk_blocks_selected = '';
				if ( $options['margin_unit'] === $margin_unit['value'] ) {
					$vk_blocks_selected = ' selected';
				}
				?>
				<option value="<?php echo $margin_unit['value']; ?>"<?php echo $vk_blocks_selected; ?>>
					<?php echo $margin_unit['label']; ?>
				</option>
			<?php endforeach; ?>
			</select>
			</p>

			<style type="text/css">
			.spacer-input input[type="number"]{ 
				width:5em;
				text-align:right;
				letter-spacing:10px;
			}
			</style>
			<ul class="no-style spacer-input">
			<?php foreach ( $vk_margin_size_array as $margin_size ) : ?>
				<li>
					<span>
					<?php _e( 'Margin', 'vk-blocks' ); ?> [ <?php echo $margin_size['label']; ?> ] : </span>
					<?php
					$device_array = array(
						'pc'     => __( 'PC', 'vk-blocks' ),
						'tablet' => __( 'Tablet', 'vk-blocks' ),
						'mobile' => __( 'Mobile', 'vk-blocks' ),
					);
					foreach ( $device_array as $device_key => $device_label ) {
						?>
						<?php echo esc_html( $device_label ); ?>
						<input
						type="number"
						name="vk_blocks_options[margin_size][<?php echo esc_attr( $margin_size['value'] ); ?>][<?php echo esc_attr( $device_key ); ?>]" 
						step="0.05"
						value="<?php echo esc_attr( vk_blocks_get_spacer_size( $options, $margin_size['value'], $device_key ) ); ?>"
					>
						<?php
					}
					?>
				</li>
			<?php endforeach; ?>
	<?php submit_button(); ?>
</section>
