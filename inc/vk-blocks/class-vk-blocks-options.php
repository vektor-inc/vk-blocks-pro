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
		add_action( 'admin_init', array( $this, 'migrate_balloon_meta' ) );
	}

	/**
	 *  Migrate Balloon Meta
	 *
	 * 以前使用されていたvk_blocks_balloon_metaをvk_blocks_optionsにマイグレーションする
	 */
	public static function migrate_balloon_meta() {
		$old_balloon_options = get_option( 'vk_blocks_balloon_meta' );
		$options             = get_option( 'vk_blocks_options' );
		// Balloon_meta_listsが初期値以外の時に実行
		$options_defaults = self::get_vk_blocks_options_defaults();
		if ( ! empty( $old_balloon_options ) && $options['balloon_meta_lists'] === $options_defaults['balloon_meta_lists'] ) {
			$migrate_balloon_meta_lists = array();
			foreach ( $old_balloon_options['default_icons'] as $option ) {
				$new_array = array(
					'name' => $option['name'],
					'src'  => $option['src'],
				);
				if ( $new_array['name'] || $new_array['src'] ) {
					array_push( $migrate_balloon_meta_lists, $new_array );
				}
			}

			$options['balloon_meta_lists'] = $migrate_balloon_meta_lists;
			update_option( 'vk_blocks_options', $options );
		}
		if ( array_key_exists( 'balloon_meta_lists', $options ) ) {
			delete_option( 'vk_blocks_balloon_meta' );
		}
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
			'custom_format_lists'         => array(
				'type'  => 'array',
				'items' => array(
					'type'       => 'object',
					'properties' => array(
						'title'                 => array(
							'type' => 'string',
						),
						'font_weight_bold'      => array(
							'type' => 'boolean',
						),
						'font_italic'           => array(
							'type' => 'boolean',
						),
						'font_strikethrough'    => array(
							'type' => 'boolean',
						),
						'color'                 => array(
							'type' => 'string',
						),
						'background_color'      => array(
							'type' => 'string',
						),
						'is_active_highlighter' => array(
							'type' => 'boolean',
						),
						'highlighter'           => array(
							'type' => 'string',
						),
						'font_size'             => array(
							'type' => 'string',
						),
						'nowrap'                => array(
							'type' => 'boolean',
						),
						'class_name'            => array(
							'type' => 'string',
						),
						'custom_css'            => array(
							'type' => 'string',
						),
					),
				),
			),
			'balloon_meta_lists'          => array(
				'type'  => 'array',
				'items' => array(
					'type'       => 'object',
					'properties' => array(
						'name' => array(
							'type' => 'string',
						),
						'src'  => array(
							'type' => 'string',
						),
					),
				),
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
			'custom_format_lists'         => array(
				array(
					'title'                 => null,
					'font_weight_bold'      => false,
					'font_italic'           => false,
					'font_strikethrough'    => false,
					'color'                 => null,
					'background_color'      => null,
					'is_active_highlighter' => false,
					'highlighter'           => VK_Blocks_Global_Settings::HIGHLIGHTER_COLOR,
					'font_size'             => null,
					'nowrap'                => false,
					'class_name'            => 'vk-format--1',
					'custom_css'            => null,
				),
			),
			'balloon_meta_lists'          => array(
				array(
					'name' => null,
					'src'  => null,
				),
				array(
					'name' => null,
					'src'  => null,
				),
				array(
					'name' => null,
					'src'  => null,
				),
			),
		);
		return $default;
	}

	/**
	 * 吹き出し数(非推奨フック)
	 *
	 * @return number
	 */
	public static function balloon_image_number() {
		return apply_filters_deprecated(
			'vk_blocks_image_number',
			array( 15 ),
			'VK Blocks 1.48.1',
			'',
			__(
				'吹き出し画像の数はフックを利用しなくても任意の数、登録出来るようになりました。',
				// 'Any number of callout images can be registered without using hooks.',
				'vk-blocks'
			)
		);
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
	}
}
