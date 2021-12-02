<?php
/**
 * Load modules
 *
 * @package vk_blocks
 */

/**
 * Term color taxonomies custom
 *
 * 色選択機能をつける対象のタームの指定
 * ★★★★★★ 関数のprefixは固有のものに変更する事 ★★★★★★
 *
 * @param  array $taxonomies List of taxonomies.
 * @return array
 */
function vk_blocks_term_color_taxonomies_custom( $taxonomies ) {
	// 存在するtaxonomiesを取得
	$args           = array( 'show_ui' => true );
	$get_taxonomies = get_taxonomies( $args );
	// term color を有効化する taxonomy の配列に追加
	foreach ( $get_taxonomies as $key => $value ) {
			$taxonomies[] = $value;
	}
	return $taxonomies;
}
add_filter( 'term_color_taxonomies_custom', 'vk_blocks_term_color_taxonomies_custom' );

/**
 * Load term color class
 *
 * 読み込みタイミングを init にしておかないと
 * init で作成されたカスタム分類に対応できない
 * ★★★★★★ 関数のprefixは固有のものに変更する事 ★★★★★★
 *
 * @return void
 */
function vk_blocks_load_term_color() {
	require_once dirname( __FILE__ ) . '/package/class.term-color.php';
}
add_action( 'init', 'vk_blocks_load_term_color' );
