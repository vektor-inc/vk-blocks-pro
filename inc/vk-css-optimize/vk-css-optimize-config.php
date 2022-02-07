<?php
/**
 * VK CSS Tree Shaking Config
 *
 * @package VK Blocks
 */

/**
 * VK CSS Optimize 本体はExUnitなどで読み込むのでここでは読み込まず
 * 追加したいファイルのみフックで投げるはずだったが単体売りするかもしれないので一応本体を同梱
 */
if ( ! class_exists( 'VK_CSS_Optimize' ) ) {
	require_once dirname( __FILE__ ) . '/package/class-vk-css-optimize.php';
}

/**
 * CSS Tree Shaking Array
 *
 * @param array $vk_css_tree_shaking_array CSS Tree Shaking Array Paramator.
 */
function vk_blocks_css_tree_shaking_array( $vk_css_tree_shaking_array ) {
	$vk_css_tree_shaking_array[] = array(
		'id'      => 'vk-blocks-build-css',
		'url'     => VK_BLOCKS_DIR_URL . 'build/block-build.css',
		'path'    => VK_BLOCKS_DIR_PATH . 'build/block-build.css',
		'version' => VK_BLOCKS_VERSION,
	);
	return $vk_css_tree_shaking_array;
}
add_filter( 'vk_css_tree_shaking_array', 'vk_blocks_css_tree_shaking_array' );

/**
 * CSS Tree Shaking Exclude
 *
 * @param array $inidata CSS Tree Shaking Exclude Paramator.
 */
function vk_blocks_css_tree_shaking_exclude_class( $inidata ) {
	$exclude_classes_array = array(
		'swiper-pagination-bullet',
		'swiper-pagination-bullet-active',
		'vk_accordion-target-open',
		'vk_accordion-target-close',
		'vk_accordion-toggle-open',
		'vk_accordion-toggle-close',
		'vk_animation-active',
		'vk_borderBox_title',
		'vk_faq-accordion-open',
		'vk_faq-accordion-close',
		'vk_faq_content-accordion-open',
		'vk_faq_content-accordion-close',
		'vk_post-col-xs-12',
		'vk_post-col-xs-6',
		'vk_post-col-xs-4',
		'vk_post-col-xs-3',
		'vk_post-col-xs-2',
		'vk_post-col-sm-12',
		'vk_post-col-sm-6',
		'vk_post-col-sm-4',
		'vk_post-col-sm-3',
		'vk_post-col-sm-2',
		'vk_post-col-md-12',
		'vk_post-col-md-6',
		'vk_post-col-md-4',
		'vk_post-col-md-3',
		'vk_post-col-md-2',
		'vk_post-col-lg-12',
		'vk_post-col-lg-6',
		'vk_post-col-lg-4',
		'vk_post-col-lg-3',
		'vk_post-col-lg-2',
		'vk_post-col-xl-12',
		'vk_post-col-xl-6',
		'vk_post-col-xl-4',
		'vk_post-col-xl-3',
		'vk_post-col-xl-2',
		'vk_post-col-xxl-12',
		'vk_post-col-xxl-6',
		'vk_post-col-xxl-4',
		'vk_post-col-xxl-3',
		'vk_post-col-xxl-2',
	);

	$inidata['class'] = array_unique( array_merge( $inidata['class'], $exclude_classes_array ) );

	return $inidata;
}
add_filter( 'css_tree_shaking_exclude', 'vk_blocks_css_tree_shaking_exclude_class' );
