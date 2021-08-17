<?php

/**
 * Registers the `vk-blocks/spacer` block.
 */
// if( function_exists('register_block_type_from_metadata')) {

// 	function register_block_vk_spacer() {
// 		register_block_type_from_metadata(
// 			__DIR__,
// 			array(
// 				'editor_style' => 'vk-blocks-build-editor-css',
// 				'editor_script' => 'vk-blocks-build-js',
// 			)
// 		);
// 	}
// 	add_action( 'init', 'register_block_vk_spacer', 99 );
// }

wp_register_style(
	'vk-blocks/spacer',
	plugin_dir_url( __FILE__ ) . 'style.css',
	array(),
	VK_BLOCKS_VERSION
);

function register_block_vk_spacer()
{
	register_block_type(
		__DIR__,
		array(
			'style'        => 'vk-blocks/spacer',
			'editor_style' => 'vk-blocks/spacer',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action('init', 'register_block_vk_spacer', 99);
