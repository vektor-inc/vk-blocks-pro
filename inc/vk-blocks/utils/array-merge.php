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
	$merged = $defaults;
	foreach ( $args as $key => $value ) {
		if ( ! is_array( $value ) && array_key_exists( $key, $defaults ) ) {
			$merged[ $key ] = $value;
		} elseif ( is_array( $value ) && is_array( $defaults[ $key ] ) ) {
			$merged[ $key ] = vk_blocks_array_merge( $value, $defaults[ $key ] );
		}
	}
	return $merged;
}
