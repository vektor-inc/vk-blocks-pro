<?php
/**
 * VK Blocks REST API Init Actions
 *
 * @package vk_blocks
 */

/**
 * Vk_Blocks_EntryPoint
 */
class Vk_Blocks_EntryPoint {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'vk_blocks_rest_api_init' ) );
	}

	/**
	 * Vk Blocks Rest Api Init
	 *
	 * @return void
	 */
	public function vk_blocks_rest_api_init() {
		register_rest_route(
			'vk-blocks/v1',
			'/update_vk_blocks_options',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_vk_blocks_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);

		register_rest_route(
			'vk-blocks/v1',
			'/block-editor-options',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'block_editor_get_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'block_editor_update_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);
	}

	/**
	 * VK Blocks Rest Update Callback
	 *
	 * @param object $request — .
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_vk_blocks_options( $request ) {
		$json_params = $request->get_json_params();
		update_option( 'vk_blocks_options', $json_params['vkBlocksOption'] );
		return rest_ensure_response(
			array(
				'success' => true,
			)
		);
	}

	/**
	 * Storeの読み書きを許可するvk_blocks_optionsのオプションリスト
	 *
	 * @var array
	 */
	public static $allow_block_editor_option_lists = array(
		'show_custom_css_editor_flag',
		'icon_preset_lists',
	);

	/**
	 * Get Option Callback
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function block_editor_get_options() {
		$options                    = array();
		$options['vkBlocksOption'] = VK_Blocks_Options::get_options();
		foreach ( $options['vkBlocksOption'] as $option_name => $value ) {
			if ( ! in_array( $option_name, self::$allow_block_editor_option_lists ) ) {
				unset( $options['vkBlocksOption'][ $option_name ] );
			}
		}

		return rest_ensure_response( $options );
	}

	/**
	 * Update options Callback
	 *
	 * @param object $request — .
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function block_editor_update_options( $request ) {
		$json_params = $request->get_json_params();

		$options       = VK_Blocks_Options::get_options();
		$waiting_lists = array();
		foreach ( $options as $option_name => $value ) {
			if ( ! in_array( $option_name, self::$allow_block_editor_option_lists ) ) {
				$waiting_lists[ $option_name ] = $options[ $option_name ];
			}
		}
		$completed_options = array_merge( $json_params['vkBlocksOption'], $waiting_lists );
		update_option( 'vk_blocks_options', $completed_options );
		return rest_ensure_response(
			array(
				'success' => true,
			)
		);
	}

}
