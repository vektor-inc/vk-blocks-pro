<?php
/**
 * VK Color Palette Manager Setting.
 *
 * @package vektor-inc/vk-blocks-pro
 * @since 1.18.0
 */

// Load composer autoload.
require_once dirname( dirname( dirname( __FILE__ ) ) ) . '/vendor/autoload.php';

// /_g3/vendor/vektor-inc/vk-color-palette-manager/src/
use VektorInc\VK_Color_Palette_Manager\VkColorPaletteManager;

$vk_color_palette_manager = new VkColorPaletteManager();
