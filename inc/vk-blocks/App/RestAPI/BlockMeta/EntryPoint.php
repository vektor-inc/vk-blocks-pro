<?php

class EntryPoint {
	public function __construct() {
		add_action( 'rest_api_init', array( $this, '_rest_api_init' ) );
	}

	public function _rest_api_init() {
		register_rest_route(
			'vk-blocks/v1',
			'/block-meta/(?P<name>.+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, '_callback' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	public function _callback( $request ) {
		$block_name = esc_html( $request['name'] );
		$block_meta = get_option( 'vk_blocks_' . $block_name . '_meta' );
		return rest_ensure_response( $block_meta );
	}
}
