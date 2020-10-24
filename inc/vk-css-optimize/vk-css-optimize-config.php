<?php
/**
 * VK CSS Tree Shaking Config
 *
 * @package Lightning
 */

 /**
  * Optimize CSS.
  */
function vk_blocks_optimize_css() {
	$options = vkblocks_get_options();

	if ( ! isset( $options['css_optimize'] ) ) {
		$options['css_optimize'] = 'default';
	}

	if ( ! empty( $options['css_optimize'] ) && ( 'optomize-all-css' === $options['css_optimize'] || 'tree-shaking' === $options['css_optimize'] ) ) {

		// 表示位置の配列.
		global $vk_css_tree_shaking_array;
		if ( empty( $vk_css_tree_shaking_array ) ) {
			$vk_css_tree_shaking_array = array(
				array(
					'id'      => 'vk-blocks-build-css',
					'url'     => VK_BLOCKS_URL . 'build/block-build.css',
					'path'    => VK_BLOCKS_PATH . 'build/block-build.css',
					'version' => VK_BLOCKS_VERSION,
				),
			);
		} else {
			$add_array = array(
				'id'      => 'vk-blocks-build-css',
				'url'     => VK_BLOCKS_URL . 'build/block-build.css',
				'path'    => VK_BLOCKS_PATH . 'build/block-build.css',
				'version' => VK_BLOCKS_VERSION,
			);
			array_push( $vk_css_tree_shaking_array, $add_array );
		}

		$vk_css_tree_shaking_array = apply_filters( 'vk_css_tree_shaking_array', $vk_css_tree_shaking_array );
		if ( ! class_exists( 'VK_CSS_Optimize' ) ) {
			require_once dirname( __FILE__ ) . '/package/class-vk-css-optimize.php';
		}
	}
}
add_action( 'after_setup_theme', 'vk_blocks_optimize_css' );

/**
 * CSS Tree Shaking Exclude
 *
 * @param array $inidata CSS Tree Shaking Exclude Paramator.
 */
function vk_blocks_css_tree_shaking_exclude_class( $inidata ) {
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
add_filter( 'css_tree_shaking_exclude', 'vk_blocks_css_tree_shaking_exclude_class' );
