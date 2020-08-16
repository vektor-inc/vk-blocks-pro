<?php
$css_optimize_array = array(
    array(
        'label' => __( 'Nothing to do', 'vk-blocks' ),
        'value' => 'default',
    ),
    array(
        'label' => __( 'Optimize VK Blocks CSS ( Tree Shaking ) ( Beta )', 'vk-blocks' ),
        'value' => 'tree-shaking',
    ),
    array(
        'label' => __( 'Optimize VK Blocks CSS ( Tree Shaking + Preload ) ( Beta )', 'vk-blocks' ),
        'value' => 'optomize-all-css',
    ),
);
?>
<section>
<h3 id="css-optimize-setting"><?php echo __( 'CSS Optimize Setting', 'vk-blocks' ); ?></h3>
<?php $vk_blocks_options = get_option( 'vk_blocks_options' ); ?>
<select name="vk_blocks_options[css_optimize]">
<?php
foreach ( $css_optimize_array as $css_optimize ) : ?>
    <?php
        $selected = '';
        if ( $vk_blocks_options['css_optimize'] === $css_optimize['value'] ){
            $selected = ' selected';
        }
        ?>
    <option value="<?php echo $css_optimize['value']; ?>"<?php echo $selected; ?>>
    <?php echo $css_optimize['label']; ?>
    </option>
<?php endforeach; ?>
</select>
<?php submit_button(); ?>
</section>