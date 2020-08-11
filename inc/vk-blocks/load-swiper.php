<?php
function vkblocks_load_slider_css() {

	if ( has_block( 'vk-blocks/slider' ) ) {
		wp_enqueue_style('vkblocks-swiper',  VK_BLOCKS_URL . 'build/swiper.min.css', array(),'5.4.1', 'all');
	}

}
add_action( 'wp_enqueue_scripts', 'vkblocks_load_slider_css' );

//ExUnitの高速化設定対策で、Swiper を wp_head で読み込み。
function vkblocks_load_slider_js() {

	if ( has_block( 'vk-blocks/slider' ) ) {
		echo '<script type="text/javascript" src="' .  VK_BLOCKS_URL . 'build/swiper.min.js" id="vkblocks-swiper-js-js"></script>';
	}
}
add_action( 'wp_head', 'vkblocks_load_slider_js' );
