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


function vk_blocks_pro_load_scripts_faq2(){
	wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_URL . 'build/faq2.min.js', array(), VK_BLOCKS_VERSION, true );
}
function vk_blocks_pro_load_scripts_animation(){
	wp_enqueue_script( 'vk-blocks-animation', VK_BLOCKS_URL . 'build/vk-animation.min.js', array(), VK_BLOCKS_VERSION, true );
}
function vk_blocks_pro_load_scripts_slider(){
	wp_enqueue_style( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.css', array(), VK_BLOCKS_VERSION );
	wp_enqueue_script( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.js', array(), VK_BLOCKS_VERSION, true );
	wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_URL . 'build/vk-slider.min.js', array( 'vk-blocks-swiper' ), VK_BLOCKS_VERSION, true );
}

/**
 * Pro 専用のスクリプトの読み込み
 */
function vk_blocks_pro_load_scripts() {

	// フロントページが投稿一覧の場合はpostIDを取得できないので、強制読み込み。
	// TODO: 速度改善のためにウィジェットの有無で読み込む
	if(is_front_page() && is_home() ){

		vk_blocks_pro_load_scripts_faq2();
		vk_blocks_pro_load_scripts_animation();
		vk_blocks_pro_load_scripts_slider();

	}else{

		$current_post_id = get_the_ID();

		if ( has_block( 'vk-blocks/faq2', $current_post_id ) || has_block( 'vk-blocks/faq', $current_post_id ) ) {
			vk_blocks_pro_load_scripts_faq2();
		}

		if ( has_block( 'vk-blocks/animation', $current_post_id ) ) {
			vk_blocks_pro_load_scripts_animation();
		}

		if ( has_block( 'vk-blocks/slider', $current_post_id ) ) {
			vk_blocks_pro_load_scripts_slider();
		}
	}

}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );
