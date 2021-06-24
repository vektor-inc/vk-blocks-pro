<?php
/**
 * VK Blocks Pro New FAQ Admin
 */
$spacer_unit_array = array(
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

$vk_spacer_size_array = vkblocks_spacer_size_array();


$vk_blocks_options = vkblocks_get_options();
?>
<section>
	<h3 id="spacer-setting"><?php echo __( 'Common Space Setting', 'vk-blocks' ); ?></h3>
	<p><?php _e( 'Please specify the size of the common margin used for responsive spacers, etc.', 'vk-blocks' ); ?></p>
	<?php foreach ( $vk_spacer_size_array as $spacer_size ) : ?>
		<div class="spacer-setting">
			<span><?php echo $spacer_size['label']; ?></span>
			<input
				type="number"
				name="vk_blocks_options[spacer_size][<?php echo $spacer_size['value']; ?>]"
				value="<?php echo $vk_blocks_options['spacer_size'][ $spacer_size['value'] ]; ?>"
			>
			<span><?php _e( 'Unit' ); ?></span>
			<select name="vk_blocks_options[spacer_unit][<?php echo $spacer_size['value']; ?>]">
			<?php
			foreach ( $spacer_unit_array as $spacer_unit ) :
					$selected = '';
				if ( $vk_blocks_options['spacer_unit'][ $spacer_size['value'] ] === $spacer_unit['value'] ) {
					$selected = ' selected';
				}
				?>
				<option value="<?php echo $spacer_unit['value']; ?>"<?php echo $selected; ?>>
					<?php echo $spacer_unit['label']; ?>
				</option>
			<?php endforeach; ?>
			</select>
		</div>
	<?php endforeach; ?>
	<?php submit_button(); ?>
</section>
