<?php
/**
 * @package vk-blocks-pro
 */

/**
 * vk-blocks.php に追加するコード
 */
$vk_exunit_path = plugin_dir_path( __FILE__ ) . 'tests/plugins/vk-all-in-one-expansion-unit/vkExUnit.php';
if ( file_exists( $vk_exunit_path ) ) {
	require_once $vk_exunit_path;
}
