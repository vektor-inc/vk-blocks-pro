<?php
/**
 * VK CSS Tree Shaking Config
 *
 * @package VK Blocks
 */

 /*
 VK CSS Optimize 本体はExUnitなどで読み込むのでここでは読み込まない
 追加したいファイルのみフックで投げる
 */

function vkblocks_css_tree_shaking_array( $vk_css_tree_shaking_array ){
	$vk_css_tree_shaking_array[] = array(
		'id'      => 'vk-blocks-build-css',
		'url'     => VK_BLOCKS_URL . 'build/block-build.css',
		'path'    => VK_BLOCKS_PATH . 'build/block-build.css',
		'version' => VK_BLOCKS_VERSION,
	);
	return $vk_css_tree_shaking_array;
}
add_filter( 'vk_css_tree_shaking_array', 'vkblocks_css_tree_shaking_array' );

/**
 * CSS Tree Shaking Exclude
 *
 * @param array $inidata CSS Tree Shaking Exclude Paramator.
 */
function vkblocks_css_tree_shaking_exclude_class( $inidata ) {
	$exclude_classes_array = array(
		'vk_animation-active',
		'vk_borderBox_title',
		'vk_faq-accordion-open',
		'vk_faq-accordion-close',
		'vk_faq_content-accordion-open',
		'vk_faq_content-accordion-close',
	);
	$inidata['class']      = array_merge( $inidata['class'], $exclude_classes_array );

	return $inidata;
}
add_filter( 'css_tree_shaking_exclude', 'vkblocks_css_tree_shaking_exclude_class' );
