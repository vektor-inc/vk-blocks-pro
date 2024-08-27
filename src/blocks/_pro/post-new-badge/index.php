<?php
/**
 * Registers the `vk-blocks/post-new-badge` block.
 *
 * @package vk-blocks
 */

/**
 * New Badge render callback
 *
 * @param array  $attributes Block attributes.
 * @param string $content Block content.
 * @return string
 */
function vk_blocks_post_new_badge_render_callback( $attributes, $content ) {
	$days_as_new_post = $attributes['daysAsNewPost'];

	// 投稿の日時をY-m-d形式で取得
	$post_date     = get_the_date( 'Y-m-d' );
	$post_datetime = new DateTime( $post_date );

	// 現在の日時をY-m-d形式で取得
	$current_date     = current_time( 'Y-m-d' );
	$current_datetime = new DateTime( $current_date );

	// 投稿日時と現在の日時の差を日単位で計算
	$interval        = $post_datetime->diff( $current_datetime );
	$days_since_post = $interval->days;

	// 新着の判定
	if ( $days_since_post >= $days_as_new_post ) {
		return '';
	}

	return $content;
}

/**
 * Register New Badge block.
 *
 * @return void
 */
function vk_blocks_register_block_post_new_badge() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/post-new-badge',
			VK_BLOCKS_DIR_URL . 'build/_pro/post-new-badge/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/post-new-badge',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_post_new_badge_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_post_new_badge', 99 );
