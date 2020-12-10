<?php

/**
 * Registers the `vk-blocks/alert` block.
 */
if( function_exists('register_block_type_from_metadata')) {

	function register_block_vk_alert() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style' => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
}

function register_block_vk_alert_deprecated_wp55() {
	register_block_type(
		'vk-blocks/alert',
		array(
			'editor_style' => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}

add_action( 'init', 'register_block_vk_alert', 99 );


