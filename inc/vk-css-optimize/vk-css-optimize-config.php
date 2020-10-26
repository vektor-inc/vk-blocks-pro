<?php
/**
 * VK CSS Tree Shaking Config
 *
 * @package VK Blocks
 */


	
function vkblocks_load_css_optimize(){
	$theme_textdomain = wp_get_theme()->get( 'TextDomain' );
	// VK Blocks は翻訳作るのが面倒なのでテーマ側が翻訳してある場合はそちらを使う
	if ( 
		'lightning' != $theme_textdomain && 
		'lightning-pro' != $theme_textdomain && 
		'katawara' != $theme_textdomain
		){
			if ( ! class_exists( 'VK_CSS_Optimize' ) ) {
				require_once dirname( __FILE__ ) . '/package/class-vk-css-optimize.php';
			}
		}
}
add_action( 'after_setup_theme', 'vkblocks_load_css_optimize',11 );

function vkblocks_css_tree_shaking_array( $vk_css_tree_shaking_array ){
	$Katawara_style_array = array(
		'id'      => 'vk-blocks-build-css',
		'url'     => VK_BLOCKS_URL . 'build/block-build.css',
		'path'    => VK_BLOCKS_PATH . 'build/block-build.css',
		'version' => VK_BLOCKS_VERSION,
	);
	array_push( $vk_css_tree_shaking_array, $Katawara_style_array );
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
