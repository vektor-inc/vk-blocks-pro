<?php
/**
 * Color Palette
 *
 * @package vk-blocks
 */

/**
 * Get Color Palette
 *
 * テーマが設定したカラーパレットまたはtheme.jsonで設定されたカラーパレットを取得
 *
 * @see https://developer.wordpress.org/reference/functions/wp_get_global_settings/
 *
 * @return array
 */
function vk_blocks_get_color_palette() {
	if ( function_exists( 'wp_get_global_settings' ) ) {
		$color_palette = wp_get_global_settings( array( 'color', 'palette' ) );
	}
	return $color_palette;
}

use VektorInc\VK_Color_Palette_Manager\VkColorPaletteManager;
new VkColorPaletteManager();

/**
 * Get Add Color Array
 *
 * カラーパレットマネージャーが追加する色を取得
 *
 * @return array
 */
function vk_blocks_get_add_color_array() {
	return VkColorPaletteManager::add_color_array();
}
