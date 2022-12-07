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
		if ( is_array( $value ) && vk_blocks_array_kind( $value ) === 'multidimensional' && $defaults[ $key ] !== $value && vk_blocks_multidimensional_min_number( $value ) !== 0 && vk_blocks_multidimensional_min_number( $value ) === vk_blocks_multidimensional_min_number( $defaults[ $key ] ) ) {
			$merged[ $key ] = $value;
		} else if ( is_array( $value ) && isset( $defaults[ $key ] ) && is_array( $defaults[ $key ] ) && ! empty( $value ) ) {
			$merged[ $key ] = vk_blocks_array_merge( $value, $defaults[ $key ] );
		} else {
			$merged[ $key ] = $value;
		}
	}
	return $merged;
}

/**
 * Vk_blocks_array_kind
 * 配列の種類
 *
 * @param array $array array.
 *
 * @return string
 */
function vk_blocks_array_kind( array $array ) {
	if ( array_values( $array ) !== $array ) {
		return 'associative';
	}
	return count( $array ) !== count( $array, COUNT_RECURSIVE ) ? 'multidimensional' : 'array';
}

/**
 * Vk_blocks_multidimensional_min_number
 * 多次元配列の中の配列の数の最小を調べる関数
 *
 * @param array $array array.
 *
 * @return number
 */
function vk_blocks_multidimensional_min_number( array $array ) {
	if ( vk_blocks_array_kind( $array ) !== 'multidimensional' ) {
		return $array;
	}

	$count = 0;
	foreach ( $array as $value ) {
		if ( 0 === $count || $count > count( $value ) ) {
			$count = count( $value );
		}
	}
	return $count;
}
