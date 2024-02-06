<?php
/**
 * VK Blocks REST API Init Actions
 *
 * @package vk_blocks
 */

use VektorInc\VK_Term_Color\VkTermColor;

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
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_vk_blocks_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_theme_options' );
					},
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_vk_blocks_options' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_theme_options' );
					},
				),
			)
		);
		register_rest_route(
			'vk-blocks/v1',
			'/get_post_single_term_info',
			array(
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'get_post_single_term_info' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_theme_options' );
					},
				),
			)
		);
	}

	/**
	 * VK Blocks Rest Get Callback
	 *
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function get_vk_blocks_options() {
		$options                   = array();
		$options['vkBlocksOption'] = VK_Blocks_Options::get_options();
		return rest_ensure_response( $options );
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
	 * VK Term Color Callback
	 *
	 * @param object $request — .
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function get_post_single_term_info( $request ) {

		$args = array();
		if ( $request->get_param( 'taxonomy' ) ) {
			$args['taxonomy'] = $request->get_param( 'taxonomy' );
		}

		$result = VkTermColor::get_post_single_term_info( $request->get_param( 'post_id' ), $args );
		if ( is_null( $result ) ) {
			return rest_ensure_response( array( 'error' => 'not found' ) );
		}
		return rest_ensure_response( $result );
	}
}
