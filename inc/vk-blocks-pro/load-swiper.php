<?php
//ExUnitの高速化設定対策で、Swiper を wp_head で読み込み。
function vkblocks_load_slider_js() {

	if ( has_block( 'vk-blocks/slider' ) ) {
		echo '<link rel="stylesheet" href="'.  VK_BLOCKS_URL . 'build/swiper.min.css" type="text/css" media="all">';
		echo '<script type="text/javascript" src="' .  VK_BLOCKS_URL . 'build/swiper.min.js" id="vkblocks-swiper-js-js"></script>';
	}
}
add_action( 'wp_head', 'vkblocks_load_slider_js' );
