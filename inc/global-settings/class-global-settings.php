<?php
/**
 * VK Blocks Global Settings class.
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Global_Settings
 */
class VK_Blocks_Global_Settings {

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Global_Settings
	 */
	public static function init() {
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}

	/**
	 * Font_sizes
	 *
	 * @return array
	 */
	public static function font_sizes() {
		$font_sizes = array(
			array(
				'name' => __('Small', 'vk-blocks'),
				'slug' => 'small',
				'size' => '12px',
			),
			array(
				'name' => __('Normal', 'vk-blocks'),
				'slug' => 'normal',
				'size' => '16px',
			),
			array(
				'name' => __('Big', 'vk-blocks'),
				'slug' => 'big',
				'size' => '18px',
			),
			array(
				'name' => __('Extra big', 'vk-blocks'),
				'slug' => 'extra-big',
				'size' => '21px',
			),
		);
		return $font_sizes;
	}

	/**
	 * Highlighter color
	 * 蛍光マーカー デフォルト色
	 *
	 * @return string
	 */
	public static function highlighter_color() {
		return '#fffd6b';
	}
}
