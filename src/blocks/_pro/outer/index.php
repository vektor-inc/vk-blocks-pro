<?php
/**
 * Registers the `vk-blocks/outer` block.
 *
 * @package vk-blocks
 */

/**
 * Register Outer block.
 *
 * @return void
 */
function vk_blocks_register_block_outer() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/outer',
			VK_BLOCKS_DIR_URL . 'build/_pro/outer/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'         => 'vk-blocks/outer',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_outer', 99 );

/**
 * Render Outer block deprecated method.
 *
 * 1.26.0 〜 1.33.2.0までの間,枠線の種類をなし(none)を選んだとしてもborderのclassがついてしまったため #1187
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_outer_deprecated_render_callback( $block_content, $block ) {
	$border_style = isset( $block['attrs']['borderStyle'] ) ? $block['attrs']['borderStyle'] : '';
	if ( '' === $border_style ) {
		$block_content = str_replace( ' has-border-color', '', $block_content );
		$regex         = '/ has-.*-border-color/';
		$block_content = preg_replace( $regex, '', $block_content );
	}
	return $block_content;
}
add_filter( 'render_block_vk-blocks/outer', 'vk_blocks_outer_deprecated_render_callback', 10, 2 );
