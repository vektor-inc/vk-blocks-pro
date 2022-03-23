<?php
/**
 * VK Font Awesome API
 *
 * @package VK Blocks
 */

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
			'/options',
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
				array(
					'methods'             => 'DELETE',
					'callback'            => array( $this, 'delete_options' ),
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
	 * @return WP_REST_Response|WP_Error
	 *
	 * @param string $request JSON.
	 */
	public function update_options( $request ) {
		$params = $request->get_json_params();

		// Sanitize option values.
		foreach ( $params as $key => $value ) {
			if ( ! array_key_exists( $key, Settings::OPTIONS ) ) {
				continue;
			}

			if ( 'boolean' === Settings::OPTIONS[ $key ]['type'] ) {
				$value = $value ? 1 : 0;
			}

			if ( 'array' === Settings::OPTIONS[ $key ]['type'] ) {
				if ( ! is_array( $value ) ) {
					continue;
				}

				$new_value = array();
				foreach ( $value as $array_key => $array_value ) {
					if ( isset( Settings::OPTIONS[ $key ]['default'][ $array_key ] ) ) {
						$new_value[ $array_key ] = $array_value;
					}
				}
			}

			if ( isset( Settings::OPTIONS[ $key ]['range'] ) ) {
				$min   = Settings::OPTIONS[ $key ]['range']['min'];
				$max   = Settings::OPTIONS[ $key ]['range']['max'];
				$value = min( max( $value, $min ), $max );
			}

			if ( is_wp_error( $value ) ) {
				return rest_ensure_response(
					array(
						'status'  => 'error',
						'message' => $value->get_error_message(),
					)
				);
			} else {
				update_option( FTB_OPTION_PREFIX . '_' . $key, $value );
			}
		}

		return rest_ensure_response(
			array(
				'status'    => 'success',
				'message'   => __( 'Setting saved.', 'vk-blocks' ),
				'block_css' => Helper::minify_css( Helper::get_block_css( '.editor-styles-wrapper ' ) ),
			)
		);
	}

	/**
	 * Delete options
	 *
	 * @return WP_REST_Response|WP_Error
	 */
	public function delete_options() {
		foreach ( Settings::OPTIONS as $key => $value ) {
			delete_option( FTB_OPTION_PREFIX . '_' . $key );
		}

		return rest_ensure_response(
			array(
				'options'   => Settings::get_options(),
				'status'    => 'success',
				'message'   => __( 'Settings have been restored.', 'vk-blocks' ),
				'block_css' => Helper::minify_css( Helper::get_block_css( '.editor-styles-wrapper ' ) ),
			)
		);
	}
}

new VK_Font_Awesome_API();
