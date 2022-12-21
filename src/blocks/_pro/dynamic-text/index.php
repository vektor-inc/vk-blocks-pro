<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */


/**
 * Dynamic text render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_dynamic_text_render_callback( $attributes ) {
	$options = array(
		'displayElement' => $attributes['displayElement'],
	);

	global $post;

	$post_type       = get_post_type();
	$post_type_obj   = get_post_type_object( $post_type );
	$post_type_label = $post_type_obj->labels->name;

	// 親ページのタイトルを取得
	$parent_id    = $post->post_parent;
	$parent_title = get_post( $parent_id )->post_title;

	if ( empty( $post_type ) ) {
		return null;
	}

	$classes = 'vk_dynamicText';

	// block.jsonのSupportsで設定したクラス名やスタイルを取得する
	$wrapper_classes = get_block_wrapper_attributes( array( 'class' => $classes ) );

	$block = __( '表示されるテキストはありません。', 'vk-blocks' );

	if ( 'post-type' === $options['displayElement'] ) {
		$block = sprintf( '<p class="vk_dynamicText">%1$s</p>', $post_type_label );
	} elseif ( 'ancestor-page' === $options['displayElement'] ) {
		$block = sprintf( '<p class="vk_dynamicText">%1$s</p>', $parent_title );
	}

	return sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_classes,
		$block
	);
}

/**
 * Register Dynamic Text block.
 *
 * @return void
 */
function vk_blocks_register_block_dynamic_text() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/dynamic-text',
			VK_BLOCKS_DIR_URL . 'build/_pro/dynamic-text/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/dynamic-text',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_dynamic_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_dynamic_text', 99 );
