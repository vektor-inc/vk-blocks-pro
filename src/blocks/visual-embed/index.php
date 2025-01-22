<?php
/**
 * Registers the `vk-blocks/visual-embed` block.
 *
 * @package vk-blocks
 */

/**
 * Register Google map block.
 *
 * @return void
 */
function vk_blocks_register_block_google_map() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/visual-embed',
			VK_BLOCKS_DIR_URL . 'build/visual-embed/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/visual-embed',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_google_map', 99 );


function vk_blocks_visual_embed_set_data() {

	wp_localize_script(
		'vk-blocks-build-js',
		'vk_blocks_pro_allowed_url_patterns',
		apply_filters( 'vk_blocks_visual_embed_allowed_url_patterns', array() )
	);
}
add_action( 'enqueue_block_editor_assets', 'vk_blocks_visual_embed_set_data' );
