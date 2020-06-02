<?php
function vkblocks_load_slider_scripts() {

	if ( has_block( 'vk-blocks/slider' ) ) {
		wp_enqueue_style('vkblocks-swiper',  VK_BLOCKS_URL . 'build/swiper.min.css', array(),'5.4.1', 'all');
		wp_enqueue_script( 'vkblocks-swiper-js', VK_BLOCKS_URL . 'build/swiper.min.js', array(),'5.4.1',true );
	}
}
add_action( 'wp_enqueue_scripts', 'vkblocks_load_slider_scripts' );

function vkblocks_add_slider_front_scripts( $block_content, $block ) {

	if ( $block['blockName'] === 'vk-blocks/slider' ) {

		//Default値をセット
		$pc = isset($block['attrs']["pc"]) ? $block['attrs']["pc"] : "600";
		$tablet = isset($block['attrs']["tablet"]) ? $block['attrs']["tablet"] : "600";
		$mobile = isset($block['attrs']["mobile"]) ? $block['attrs']["mobile"] : "600";
		$unit = isset($block['attrs']["unit"]) ? $block['attrs']["unit"] : "px";

		$style = "<style>
		@media (max-width: 576px) {
			.vk_slider_item{height:". esc_attr($mobile) . esc_attr($unit) . "}
		}
		@media (min-width: 577px) and (max-width: 768px) {
			.vk_slider_item{height:". esc_attr($tablet) . esc_attr($unit) . "}
		}
		@media (min-width: 769px) {
			.vk_slider_item{height:". esc_attr($pc) . esc_attr($unit) . "}
		}
		</style>";
		$script = "<script>window.onload = function () { var swiper = new Swiper('.swiper-container', {navigation: { nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},});};</script>";
		return $style . $script . $block_content;
	}
    return $block_content;
}

add_filter( 'render_block', 'vkblocks_add_slider_front_scripts', 10, 2 );
