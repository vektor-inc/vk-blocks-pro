<?php
/**
 * VK Blocks should load separate
 *
 * @package vk-blocks
 */

// from WordPress 5.8 ※ BlockのCSSとJS分離作業のために、一時的に記載。最終的にはVK Blocks ではユーザーにオプションを持たせる
add_filter( 'vk_blocks_should_load_separate_assets', '__return_true' );

/**
 * Vk_blocks_should_load_separate_assets
 * 分割読み込みを有効化するかどうか
 *
 * @return bool
 */
function vk_blocks_should_load_separate_assets() {
	return apply_filters( 'vk_blocks_should_load_separate_assets', false );
}

if ( vk_blocks_should_load_separate_assets() ) {
	add_filter( 'should_load_separate_core_block_assets', '__return_true' );
}
