<?php
/**
 * Array merge
 *
 * @package vk-blocks
 */

/**
 * 順番を揃える
 *
 * @param array $args Value to merge with $defaults.
 * @param array $defaults Array that serves as the defaults.
 *
 * @return array Array with aligned order.
 */
function vk_blocks_merge_order( $args, $defaults ) {
	$merged = $defaults;
	foreach ( $args as $key => $value ) {
		if ( ! is_array( $value ) && array_key_exists( $key, $defaults ) ) {
			$merged[ $key ] = $value;
		} elseif ( is_array( $value ) && is_array( $defaults[ $key ] ) ) {
			$merged[ $key ] = vk_blocks_merge_order( $value, $defaults[ $key ] );
		}
	}
	return $merged;
}

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
function vk_blocks_merge_value( $args, $defaults ) {
	$merged = $args;
	foreach ( $defaults as $key => $value ) {
		if ( empty( $args[ $key ] ) ) {
			$merged[ $key ] = $value;
		} elseif ( is_array( $value ) && is_array( $args[ $key ] ) ) {
			$merged[ $key ] = vk_blocks_merge_value( $args[ $key ], $value );
		}
	}
	return $merged;
}

/**
 * 順番と値をマージする関数を呼び出す関数
 *
 * @param array $args Value to merge with $defaults.
 * @param array $defaults Optional. Array that serves as the defaults.
 *
 * @return array Merged user defined values with defaults.
 */
function vk_blocks_array_merge( $args, $defaults = array() ) {
	$order       = vk_blocks_merge_order( $args, $defaults );
	$parsed_args = vk_blocks_merge_value( $order, $defaults );
	return $parsed_args;
}
