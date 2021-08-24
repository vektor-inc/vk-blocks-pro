<?php

/**
 * Registers the `vk-blocks/faq2-a` block.
 */
if ( function_exists( 'register_block_type_from_metadata' ) ) {

	function register_block_vk_faq2_a() {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'editor_style'  => 'vk-blocks-build-editor-css',
				'editor_script' => 'vk-blocks-build-js',
			)
		);
	}
	add_action( 'init', 'register_block_vk_faq2_a', 99 );
}

