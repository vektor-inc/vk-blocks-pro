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
 * wp_parse_args配列のマージに再帰処理を追加した関数
 *
 * @see https://developer.wordpress.org/reference/functions/wp_parse_args/
 *
 * @param array $args Value to merge with $defaults.
 * @param array $defaults Optional. Array that serves as the defaults.
 *
 * @return array Merged user defined values with defaults.
 */
function vk_blocks_array_merge( $args, $defaults = array() ) {
	$parsed_args = $args;
	foreach ( $defaults as $key => $value ) {
		if ( empty( $args[ $key ] ) ) {
			$parsed_args[ $key ] = $value;
		} elseif ( is_array( $value ) && is_array( $args[ $key ] ) ) {
			$parsed_args[ $key ] = vk_blocks_array_merge( $args[ $key ], $value );
		}
	}
	return $parsed_args;
}
