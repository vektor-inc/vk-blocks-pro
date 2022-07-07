<?php
/**
 * VK Blocks Pro Functions
 *
 * @package VK Blocks
 */

// Pro 用の管理画面を読み込み.
require_once dirname( __FILE__ ) . '/admin-pro/admin-pro.php';

require_once dirname( __FILE__ ) . '/class-vk-blocks-pro-options.php';
VK_Blocks_Pro_Options::init();

/**
 * VK Blocks Pro Get Options
 *
 * デフォルトのオプション
 *
 * @param array $defaults defaults.
 */
function vk_blocks_pro_get_options( $defaults ) {
	$defaults = array(
		'display_vk_block_template' => 'display',
		'new_faq_accordion'         => 'disable',
	);
	return $defaults;
}
add_filter( 'vk_blocks_default_options', 'vk_blocks_pro_get_options' );

/**
 * Pro 専用のスクリプトの読み込み
 */
function vk_blocks_pro_load_scripts() {

	// has_blockで、ウィジェッ内のブロックが判別できないので、常時読み込みに変更。
	// TODO: 高速化のために、各ウィジェットの有効化を is_active_widget で判定し読み込み切り替える実装の余地あり。
	if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		return;
	}

	// Accordion Block
	wp_enqueue_script( 'vk-blocks-accordion', VK_BLOCKS_DIR_URL . 'build/vk-accordion.min.js', array(), VK_BLOCKS_VERSION, true );

	// Faq Block
	wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_DIR_URL . 'build/vk-faq2.min.js', array(), VK_BLOCKS_VERSION, true );

	// Animation Block
	wp_enqueue_script( 'vk-blocks-animation', VK_BLOCKS_DIR_URL . 'build/vk-animation.min.js', array(), VK_BLOCKS_VERSION, true );

	// Slider Block
	global $vk_swiper_url;
	wp_enqueue_style( 'vk-swiper-style', $vk_swiper_url . 'assets/css/swiper.min.css', array(), SWIPER_VERSION );

	wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_DIR_URL . 'build/vk-slider.min.js', array( 'vk-swiper-script' ), VK_BLOCKS_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );
