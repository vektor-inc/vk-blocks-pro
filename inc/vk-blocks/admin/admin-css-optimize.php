<?php
$css_optimize_array = array(
    array(
        'label' => __( 'Nothing to do', 'vk-blocks' ),
        'value' => 'default',
    ),
    array(
        'label' => __( 'Optimize VK Blocks CSS ( Tree Shaking )', 'vk-blocks' ) . ' ( Beta )',
        'value' => 'tree-shaking',
    ),
    array(
        'label' => __( 'Optimize VK Blocks CSS ( Tree Shaking + Preload )', 'vk-blocks' ) . ' ( Beta )',
        'value' => 'optomize-all-css',
    ),
);

$vk_blocks_options  = vk_blocks_get_options();
?>
<section>
<h3 id="css-optimize-setting"><?php echo __( 'CSS Optimize Setting', 'vk-blocks' ); ?></h3>
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
