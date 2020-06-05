<?php
function vkblocks_load_slider_scripts() {

	if ( has_block( 'vk-blocks/slider' ) ) {
		wp_enqueue_style('vkblocks-swiper',  VK_BLOCKS_URL . 'build/swiper.min.css', array(),'5.4.1', 'all');
		wp_enqueue_script( 'vkblocks-swiper-js', VK_BLOCKS_URL . 'build/swiper.min.js', array(),'5.4.1',false );
	}
}
add_action( 'wp_enqueue_scripts', 'vkblocks_load_slider_scripts' );

function vkblocks_add_slider_front_scripts( $block_content, $block ) {

	if ( $block['blockName'] === 'vk-blocks/slider'  ) {

		$attributes = $block['attrs'];
		$clientId = $block['attrs']["clientId"];
		//Default値をセット
		$pc = isset($attributes["pc"]) ? $attributes["pc"] : "600";
		$tablet = isset($attributes["tablet"]) ? $attributes["tablet"] : "600";
		$mobile = isset($attributes["mobile"]) ? $attributes["mobile"] : "600";
		$unit = isset($attributes["unit"]) ? $attributes["unit"] : "px";
		$autoPlay = isset($attributes["autoPlay"]) ? $attributes["autoPlay"] : true;
		$autoPlayDelay = isset($attributes["autoPlayDelay"]) ? $attributes["autoPlayDelay"] : '2500';

		$style = "<style type='text/css'>
		@media (max-width: 576px) {
			.vk_slider_" . esc_attr($clientId) . " .vk_slider_item{
				height:". esc_attr($mobile) . esc_attr($unit) . "!important;
			}
		}
		@media (min-width: 577px) and (max-width: 768px) {
			.vk_slider_" . esc_attr($clientId) . " .vk_slider_item{
				height:". esc_attr($tablet) . esc_attr($unit) . "!important;
			}
		}
		@media (min-width: 769px) {
			.vk_slider_" . esc_attr($clientId) . " .vk_slider_item{
				height:". esc_attr($pc) . esc_attr($unit) . "!important;
			}
		}
		</style>";

		if($autoPlay){
			$auto_play_scripts = 'autoplay: {
				delay: '.intval($autoPlayDelay).',
				disableOnInteraction: false,
			},';
		}else{
			$auto_play_scripts = '';
		}

		$script ="<script>
			var swiper".$clientId." = new Swiper ('.vk_slider_".$clientId."', {
				// Optional parameters
				loop: true,

				// If we need pagination
				pagination: {
				  el: '.swiper-pagination',
				},

				// Navigation arrows
				navigation: {
				  nextEl: '.swiper-button-next',
				  prevEl: '.swiper-button-prev',
				},

				// And if we need scrollbar
				scrollbar: {
				  el: '.swiper-scrollbar',
				},
				".$auto_play_scripts."
			  })
		</script>";

		return $block_content .  $script . $style;
	}
	return $block_content;
}

add_filter( 'render_block', 'vkblocks_add_slider_front_scripts', 10, 2 );
