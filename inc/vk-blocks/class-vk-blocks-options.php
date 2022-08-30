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
	 * Options scheme
	 *
	 * @return number
	 */
	public static function options_scheme() {
		$default_options_schema = array(
			'balloon_border_width' => array(
				'type'    => 'number',
				'default' => 1,
			),
			'margin_unit'          => array(
				'type'    => 'string',
				'default' => 'rem',
			),
			'margin_size'          => array(
				'type'  => 'object',
				'items' => array(
					'lg' => array(
						'type'  => 'object',
						'items' => array(
							'mobile' => array(
								'type'    => 'number',
								'default' => null,
							),
							'tablet' => array(
								'type'    => 'number',
								'default' => null,
							),
							'pc'     => array(
								'type'    => 'number',
								'default' => null,
							),
						),
					),
					'md' => array(
						'type'  => 'object',
						'items' => array(
							'mobile' => array(
								'type'    => 'number',
								'default' => null,
							),
							'tablet' => array(
								'type'    => 'number',
								'default' => null,
							),
							'pc'     => array(
								'type'    => 'number',
								'default' => null,
							),
						),
					),
					'sm' => array(
						'type'  => 'object',
						'items' => array(
							'mobile' => array(
								'type'    => 'number',
								'default' => null,
							),
							'tablet' => array(
								'type'    => 'number',
								'default' => null,
							),
							'pc'     => array(
								'type'    => 'number',
								'default' => null,
							),
						),
					),
				),
			),
			'load_separate_option' => array(
				'type'    => 'boolean',
				'default' => false,
			),
		);
		$array                  = array_merge( $default_options_schema, apply_filters( 'vk_blocks_default_options_scheme', array() ) );
		return $array;
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
	 * 吹き出しschema 生成
	 *
	 * @return $balloon_meta_schema
	 */
	public static function balloon_meta_schema() {
		$number                        = self::balloon_image_number();
		$return_array                  = array();
		$return_array['default_icons'] = array(
			'type' => 'object',
		);
		for ( $i = 1; $i <= $number; $i++ ) {
			$return_array['default_icons']['items'][ $i ] = array(
				'type'  => 'object',
				'items' => array(
					'name' => array(
						'type'    => 'string',
						'default' => null,
					),
					'src'  => array(
						'type'    => 'string',
						'default' => null,
					),
				),
			);
		};
		return $return_array;
	}

	/**
	 * Get Defaults
	 *
	 * @param array $schema option defaults.
	 *
	 * @return options
	 */
	public static function get_defaults( $schema ) {
		$default = array();
		foreach ( $schema as $key => $value ) {
			$default[ $key ] = 'object' === $value['type'] ? self::get_defaults( $value['items'] ) : $value['default'];
		}
		return $default;
	}

	/**
	 * Get properties
	 *
	 * @param array $schema option schema.
	 *
	 * @return options
	 */
	public static function get_properties( $schema ) {
		$properties = array();
		foreach ( $schema as $key => $value ) {
			$properties[ $key ] = array(
				'type' => $value['type'],
			);

			if ( 'object' === $value['type'] ) {
				$properties[ $key ]['properties'] = self::get_properties( $value['items'] );
			}
		}
		return $properties;
	}

	/**
	 * Get vk_blocks_options
	 *
	 * @return array
	 */
	public static function get_options() {
		$options  = get_option( 'vk_blocks_options' );
		$defaults = self::get_defaults( self::options_scheme() );
		$options  = vk_blocks_array_merge( $options, $defaults );
		return $options;
	}

	/**
	 * Get Balloon Meta Options
	 *
	 * @return options
	 */
	public static function get_balloon_meta_options() {
		$options  = get_option( 'vk_blocks_balloon_meta' );
		$defaults = self::get_properties( self::balloon_meta_schema() );
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
						'properties' => self::get_properties( self::options_scheme() ),
					),
				),
				'default'      => self::get_defaults( self::options_scheme() ),
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
						'properties' => self::get_properties( self::balloon_meta_schema() ),
					),
				),
				'default'      => self::get_defaults( $this->balloon_meta_schema() ),
			)
		);
	}
}
