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
