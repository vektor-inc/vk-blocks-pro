<?php
/**
 * VK Blocks Pro New FAQ Admin
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
$vk_blocks_options    = vk_blocks_get_options();

?>
<section>
	<h3 id="margin-setting"><?php echo __( 'Common Margin Setting', 'vk-blocks' ); ?></h3>
	<p><?php _e( 'Please specify the size of the common margin used for responsive spacers, etc.', 'vk-blocks' ); ?></p>

	<p>
	<span><?php _e( 'Unit', 'vk-blocks' ); ?></span>
			<select name="vk_blocks_options[margin_unit]">
			<?php
			foreach ( $margin_unit_array as $margin_unit ) :
					$vk_blocks_selected = '';
				if ( $vk_blocks_options['margin_unit'] === $margin_unit['value'] ) {
					$vk_blocks_selected = ' selected';
				}
				?>
				<option value="<?php echo $margin_unit['value']; ?>"<?php echo $vk_blocks_selected; ?>>
					<?php echo $margin_unit['label']; ?>
				</option>
			<?php endforeach; ?>
			</select>
			</p>

			<ul class="no-style">
			<?php foreach ( $vk_margin_size_array as $margin_size ) : ?>
				<li>
					<span>
					<?php _e( 'Margin', 'vk-blocks' ); ?> [ <?php echo $margin_size['label']; ?> ] </span>
					<input
						type="number"
						name="vk_blocks_options[margin_size][<?php echo $margin_size['value']; ?>]"
						step="0.05"
						value="<?php echo $vk_blocks_options['margin_size'][ $margin_size['value'] ]; ?>"
					>
				</li>
			<?php endforeach; ?>
	<?php submit_button(); ?>
</section>
