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

	/**
	 * VK Blocks Rest Update Callback
	 *
	 * @param object $request — .
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function update_vk_blocks_options( $request ) {
		$json_params = $request->get_json_params();

		update_option( 'vk_blocks_options', $json_params['vkBlocksOption'] );
		update_option( 'vk_blocks_balloon_meta', $json_params['vkBlocksBalloonMeta'] );

		return rest_ensure_response(
			array(
				'success' => true,
				'message' => __( 'Settings saved.', 'vk-blocks' ),
			)
		);
	}

}
