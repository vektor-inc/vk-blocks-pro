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
	 * @param bool $activation activation 有効化時かどうか.
	 *
	 * @return array
	 */
	public static function options_scheme( $activation = false ) {
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
					'xl' => array(
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
					'xs' => array(
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
			// プラグイン有効化時はその時のバージョンをそれ以外はこのオプション値を追加したバージョン1.42.1.0を返す
			'activation_version'   => array(
				'type'    => 'string',
				'default' => $activation ? VK_BLOCKS_VERSION : '1.42.1.0',
			),
		);
		$array = array_merge( $default_options_schema, apply_filters( 'vk_blocks_default_options_scheme', array() ) );
		$array = array_merge( $array, self::block_manager_schema() );
		return $array;
	}

	/**
	 * ブロックマネージャー用schema 生成
	 * ブロック(alert)に対して他のオプション値を持たせる可能性が0ではないのでalertもobjectにする
	 *
	 * プラグイン有効化時にオプション値を保存するのでデフォルトはnull
	 * 実行する箇所でnullの時の条件分岐を行う
	 *
	 * @return $array
	 */
	public static function block_manager_schema() {
		$return_array                  = array();
		$return_array['block_manager'] = array(
			'type' => 'object',
		);
		foreach ( VK_Blocks_Global_Settings::blocks() as $key => $value ) {
			$return_array['block_manager']['items'][ $value['name'] ] = array(
				'type'  => 'object',
				'items' => array(
					'inserter' => array(
						'type'    => 'boolean',
						'default' => null,
					),
				),
			);
		}
		return $return_array;
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
