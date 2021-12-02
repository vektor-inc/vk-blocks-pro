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
			'/block-meta/(?P<name>.+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'vk_blocks_callback' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Vk Blocks Rest Route Callback
	 *
	 * @param string $request — .
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function vk_blocks_callback( $request ) {
		$block_name = esc_html( $request['name'] );
		$block_meta = get_option( 'vk_blocks_' . $block_name . '_meta' );
		return rest_ensure_response( $block_meta );
	}
}
