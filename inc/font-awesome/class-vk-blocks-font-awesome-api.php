<?php
/**
 * VK Font Awesome API
 *
 * @package VK Blocks
 */

use VektorInc\VK_Font_Awesome_Versions\VkFontAwesomeVersions;

/**
 * VK Font Awesome API
 */
class VK_Blocks_Font_Awesome_API {

	/**
	 * Constructor
	 */
	public function __construct() {
		// Register REST API route.
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		register_rest_route(
			'vk-blocks/v1',
			'/options/vk_font_awesome_version/',
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_options' ),
					'permission_callback' => array( $this, 'permission_callback' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'update_options' ),
					'permission_callback' => array( $this, 'permission_callback' ),
				),
			)
		);
	}

	/**
	 * Permission Callback
	 */
	public function permission_callback() {
		return current_user_can( 'edit_posts' );
	}

	/**
	 * Get options
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_options() {
		$options = VkFontAwesomeVersions::get_option_fa();
		return rest_ensure_response( $options );
	}

	/**
	 * Update options
	 *
	 * @param string $request JSON.
	 */
	public function update_options( $request ) {
		$options = $request->get_json_params();
		update_option( 'vk_font_awesome_version', $options );
		return rest_ensure_response(
			array(
				'status'  => 'success',
				'message' => __( 'Setting saved.', 'vk-blocks' ),
			)
		);
	}
}
