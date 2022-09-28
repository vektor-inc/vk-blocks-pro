<?php
/**
 * VK Blocks Pro Options class.
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Pro_Options
 */
class VK_Blocks_Pro_Options {

	/**
	 * VK Blocks Pro Options schema
	 *
	 * @var array
	 */
	private $vk_blocks_pro_option_schema = array(
		'display_vk_block_template' => array(
			'type'    => 'string',
			'default' => 'display',
		),
		'new_faq_accordion'         => array(
			'type'    => 'string',
			'default' => 'disable',
		),
	);

	/**
	 * VK Blocks License Option schema
	 *
	 * @var array
	 */
	private $license_key_option_scheme = array(
		'vk_blocks_pro_license_key' => array(
			'type'    => 'string',
			'default' => null,
		),
	);

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_filter( 'vk_blocks_default_options_scheme', array( $this, 'vk_blocks_pro_default_options_scheme' ) );
	}

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Pro_Options
	 */
	public static function init() {
		// static 宣言しているので既に定義されている場合は $instance に null は入らずに既存のインスタンスのまま.
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}

	/**
	 * Pro Option
	 */
	public function vk_blocks_pro_default_options_scheme() {
		$array = $this->vk_blocks_pro_option_schema;
		if ( vk_blocks_is_license_setting() ) {
			$array = array_merge( $this->license_key_option_scheme, $this->vk_blocks_pro_option_schema );
		}
		return $array;
	}
}
