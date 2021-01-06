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
		wp_enqueue_style( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.css', array(), VK_BLOCKS_VERSION );
		wp_enqueue_script( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.js', array(), VK_BLOCKS_VERSION, true );
		wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_URL . 'build/vk-slider.min.js', array( 'vk-blocks-swiper' ), VK_BLOCKS_VERSION, true );
	}

}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );
