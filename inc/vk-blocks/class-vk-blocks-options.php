<?php
/**
 * VK Blocks Options class.
 *
 * @package vk-blocks
 */

/**
 * VK_Blocks_Options
 */
class VK_Blocks_Options {

	/**
	 * Initialize
	 *
	 * @return VK_Blocks_Options
	 */
	public static function init() {
		// static 宣言しているので既に定義されている場合は $instance に null は入らずに既存のインスタンスのまま.
		static $instance                         = null;
		return $instance ? $instance : $instance = new static();
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_setting' ) );
	}

	/**
	 * Remove Manage Options.
	 *
	 * @param array $options VK Blocks options array.
	 * @return array
	 */
	public static function remove_manage_option_keys( $options ) {

		// REST APIで非表示にするoption値をunsetしてください。
		unset( $options['vk_blocks_pro_license_key'] );
		unset( $options['load_separate_option'] );

		return $options;
	}

	/**
	 * Get vk_blocks_options properties 生成
	 *
	 * @return $properties
	 */
	public static function get_vk_blocks_options_properties() {
		$properties = array(
			'balloon_border_width'        => array(
				'type' => 'number',
			),
			'margin_unit'                 => array(
				'type' => 'string',
			),
			'margin_size'                 => array(
				'type'       => 'object',
				'properties' => array(
					'xl' => array(
						'type'       => 'object',
						'properties' => array(
							'mobile' => array(
								'type' => 'number',
							),
							'tablet' => array(
								'type' => 'number',
							),
							'pc'     => array(
								'type' => 'number',
							),
						),
					),
					'lg' => array(
						'type'       => 'object',
						'properties' => array(
							'mobile' => array(
								'type' => 'number',
							),
							'tablet' => array(
								'type' => 'number',
							),
							'pc'     => array(
								'type' => 'number',
							),
						),
					),
					'md' => array(
						'type'       => 'object',
						'properties' => array(
							'mobile' => array(
								'type' => 'number',
							),
							'tablet' => array(
								'type' => 'number',
							),
							'pc'     => array(
								'type' => 'number',
							),
						),
					),
					'sm' => array(
						'type'       => 'object',
						'properties' => array(
							'mobile' => array(
								'type' => 'number',
							),
							'tablet' => array(
								'type' => 'number',
							),
							'pc'     => array(
								'type' => 'number',
							),
						),
					),
					'xs' => array(
						'type'       => 'object',
						'properties' => array(
							'mobile' => array(
								'type' => 'number',
							),
							'tablet' => array(
								'type' => 'number',
							),
							'pc'     => array(
								'type' => 'number',
							),
						),
					),
				),
			),
			'load_separate_option'        => array(
				'type' => 'boolean',
			),
			'vk_blocks_pro_license_key'   => array(
				'type' => 'string',
			),
			'display_vk_block_template'   => array(
				'type' => 'string',
			),
			'new_faq_accordion'           => array(
				'type' => 'string',
			),
			'show_custom_css_editor_flag' => array(
				'type' => 'string',
			),
		);
		return $properties;
	}

	/**
	 * Get vk_blocks_options default 生成
	 *
	 * @return $default
	 */
	public static function get_vk_blocks_options_defaults() {
		$default = array(
			'balloon_border_width'        => 1,
			'margin_unit'                 => 'rem',
			'margin_size'                 => array(
				'xl' => array(
					'mobile' => null,
					'tablet' => null,
					'pc'     => null,
				),
				'lg' => array(
					'mobile' => null,
					'tablet' => null,
					'pc'     => null,
				),
				'md' => array(
					'mobile' => null,
					'tablet' => null,
					'pc'     => null,
				),
				'sm' => array(
					'mobile' => null,
					'tablet' => null,
					'pc'     => null,
				),
				'xs' => array(
					'mobile' => null,
					'tablet' => null,
					'pc'     => null,
				),
			),
			'load_separate_option'        => false,
			'vk_blocks_pro_license_key'   => null,
			'display_vk_block_template'   => 'display',
			'new_faq_accordion'           => 'disable',
			'show_custom_css_editor_flag' => 'show',
		);
		return $default;
	}

	/**
	 * 吹き出し数
	 *
	 * @return number
	 */
	public static function balloon_image_number() {
		return apply_filters( 'vk_blocks_image_number', 15 );
	}

	/**
	 * Get vk_blocks_balloon_meta properties 生成
	 *
	 * @return $properties
	 */
	public static function get_vk_blocks_balloon_meta_properties() {
		$number                      = self::balloon_image_number();
		$properties                  = array();
		$properties['default_icons'] = array(
			'type' => 'object',
		);
		for ( $i = 1; $i <= $number; $i++ ) {
			$properties['default_icons']['properties'][ $i ] = array(
				'type'       => 'object',
				'properties' => array(
					'name' => array(
						'type' => 'string',
					),
					'src'  => array(
						'type' => 'string',
					),
				),
			);
		};
		return $properties;
	}

	/**
	 * Get vk_blocks_balloon_meta default 生成
	 *
	 * @return $default
	 */
	public static function get_vk_blocks_balloon_meta_defaults() {
		$number  = self::balloon_image_number();
		$default = array();
		for ( $i = 1; $i <= $number; $i++ ) {
			$default['default_icons'][ $i ] = array(
				'name' => null,
				'src'  => null,
			);
		};
		return $default;
	}

	/**
	 * Get vk_blocks_options
	 *
	 * @return array
	 */
	public static function get_options() {
		$options  = get_option( 'vk_blocks_options' );
		$defaults = self::get_vk_blocks_options_defaults();
		$options  = vk_blocks_array_merge( $options, $defaults );
		return $options;
	}

	/**
	 * Get exclude manage option
	 *
	 * @return array
	 */
	public static function get_exclude_manage_options() {
		return self::remove_manage_option_keys( self::get_options() );
	}

	/**
	 * Get Balloon Meta Options
	 *
	 * @return options
	 */
	public static function get_balloon_meta_options() {
		$options  = get_option( 'vk_blocks_balloon_meta' );
		$defaults = self::get_vk_blocks_balloon_meta_defaults();
		$options  = wp_parse_args( $options, $defaults );
		return $options;
	}

	/**
	 * Register Setting
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_setting/#comment-5289
	 */
	public function register_setting() {
		register_setting(
			'vk_blocks_setting',
			'vk_blocks_options',
			array(
				'type'         => 'object',
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => self::get_vk_blocks_options_properties(),
					),
				),
				'default'      => self::get_vk_blocks_options_defaults(),
			)
		);

		register_setting(
			'vk_blocks_setting',
			'vk_blocks_balloon_meta',
			array(
				'type'         => 'object',
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => self::get_vk_blocks_balloon_meta_properties(),
					),
				),
				'default'      => self::get_vk_blocks_balloon_meta_defaults(),
			)
		);
	}
}
