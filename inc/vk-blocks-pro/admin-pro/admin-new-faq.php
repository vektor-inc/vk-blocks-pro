<?php
/**
 * VK Blocks Pro New FAQ Admin
 */
$new_faq_accordion_array = array(
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

$vk_blocks_options  = vkblocks_get_options();
?>
<section>
<h3 id="faq-setting"><?php echo __( 'FAQ Setting', 'vk-blocks' ); ?></h3>
<select name="vk_blocks_options[new_faq_accordion]">
<?php
foreach ( $new_faq_accordion_array as $new_faq_accordion ) : ?>
    <?php
        $selected = '';
        if ( $vk_blocks_options['new_faq_accordion'] === $new_faq_accordion['value'] ){
            $selected = ' selected';
        }
        ?>
    <option value="<?php echo $new_faq_accordion['value']; ?>"<?php echo $selected; ?>>
    <?php echo $new_faq_accordion['label']; ?>
    </option>
<?php endforeach; ?>
</select>
<?php submit_button(); ?>
</section>
