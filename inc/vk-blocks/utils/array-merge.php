<?php
/**
 * Array merge
 *
 * @package vk-blocks
 */

/**
 * Merges user defined arguments into defaults array.
 *
 * $argsにキーが存在したらそのまま存在しない時に$defaultsの配列をマージする
 *
 * 順番はdefaultsに合わせる
 *
 * wp_parse_args配列のマージに再帰処理を追加した関数
 *
 * @see https://developer.wordpress.org/reference/functions/wp_parse_args/
 *
 * @param array $args Value to merge with $defaults.
 * @param array $defaults Optional. Array that serves as the defaults.
 *
 * @return array Merged user defined values with defaults.
 */
function vk_blocks_array_merge( $args, $defaults ) {
	if ( ! $args ) {
		return $defaults;
	}
	$merged = $defaults;
	foreach ( $args as $key => $value ) {
		if ( is_array( $value ) && isset( $defaults[ $key ] ) && is_array( $defaults[ $key ] ) && ! empty( $value ) ) {
			$merged[ $key ] = vk_blocks_array_merge( $value, $defaults[ $key ] );
		} else {
			$merged[ $key ] = $value;
		}
	}
	return $merged;
}
