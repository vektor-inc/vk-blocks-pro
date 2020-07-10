<?php

class EntryPoint {

	const NAMESPACE = 'vk-blocks/v1';
	const ROUTE = '/block-meta';
	const BLOCK_NAME = '/(?P<name>.+)';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, '_rest_api_init' ] );
	}

	public function _rest_api_init() {
		register_rest_route(
			self::NAMESPACE,
			self::ROUTE . self::BLOCK_NAME,
			[
				'methods'  => 'GET',
				'callback' => [ $this, '_callback' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}

	public function _callback($request) {

		$block_name = esc_html($request["name"]);
		$block_meta = get_option("vk_blocks_" . $block_name . "_meta");

		return rest_ensure_response($block_meta);
	}
}
