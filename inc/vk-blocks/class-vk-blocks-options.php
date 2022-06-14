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
	 * Default Options schema
	 *
	 * @var array
	 */
	private $default_options_schema = array(
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
		add_action( 'admin_init', array( $this, 'register_setting' ) );
		add_action( 'rest_api_init', array( $this, 'register_setting' ) );
	}

	/**
	 * Options scheme
	 *
	 * @return number
	 */
	public function options_scheme() {
		$array = array_merge( $this->default_options_schema, apply_filters( 'vk_blocks_default_options_scheme', array() ) );
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
	public function balloon_meta_schema() {
		$number = $this->balloon_image_number();
		for ( $i = 1; $i <= $number; $i++ ) {
			$balloon_meta_schema = array(
				'default_icons' => array(
					'type'  => 'object',
					'items' => array(
						$i => array(
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
						),
					),
				),
			);
		};
		return $balloon_meta_schema;
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
			$properties[ $key ] = 'object' === $value['type'] ? self::get_properties( $value['items'] ) : $value['type'];
		}
		return $properties;
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
