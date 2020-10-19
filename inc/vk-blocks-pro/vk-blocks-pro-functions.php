<?php
/**
 * VK Blocks Pro Functions
 *
 * @package VK Blocks
 */

// Pro 用の管理画面を読み込み.
require_once dirname( __FILE__ ) . '/admin-pro/admin-pro.php';

/**
 * デフォルトオプション
 */
function vk_blocks_pro_get_options( $defaults ) {
	$defaults = array(
		'display_vk_block_template' => 'display',
		'new_faq_accordion'         => 'disable'
	);
	return $defaults;
}
add_filter( 'vk_blocks_default_options', 'vk_blocks_pro_get_options' );

/**
 * Pro 専用のスクリプトの読み込み
 */
function vk_blocks_pro_load_scripts() {

	if ( has_block( 'vk-blocks/faq2' ) || has_block( 'vk-blocks/faq' ) ) {
		wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_URL . 'build/faq2.min.js', array(), VK_BLOCKS_VERSION, true );
	}
	if ( has_block( 'vk-blocks/animation' ) ) {
		wp_enqueue_script( 'vk-blocks-animation', VK_BLOCKS_URL . 'build/vk-animation.min.js', array(), VK_BLOCKS_VERSION, true );
	}
	if ( has_block( 'vk-blocks/slider' ) ) {
		wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_URL . 'build/vk-slider.min.js', array(), VK_BLOCKS_VERSION, true );
	}

}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );


/**
 * New FAQ 用の開閉制御
 *
 * @param string $block_content The block content about to be appended.
 * @param array  $block         The full block, including name and attributes.
 */
function vk_blocks_pro_new_faq_accordion_control( $block_content, $block ) {
	$vk_blocks_options  = vkblocks_get_options();
	if ( has_block( 'vk-blocks/faq2' ) && 'vk-blocks/faq2' === $block['blockName'] || has_block( 'vk-blocks/faq' ) && 'vk-blocks/faq' === $block['blockName'] ) {
		if ( 'open' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $block_content );
		} elseif ( 'close' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $block_content );
		} else {
			$block_content = str_replace( '[accordion_trigger_switch]', '', $block_content );
		}
	}
	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_pro_new_faq_accordion_control', 10, 2 );
