<?php
/**
 * Load Scripts
 *
 * @package VK Blocks
 */

function vkblocks_pro_load_scripts() {

	if ( has_block( 'vk-blocks/faq2' ) ) {
		wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_URL . 'build/faq2.min.js', array(), VK_BLOCKS_VERSION, true );
	}
}
add_action( 'wp_enqueue_scripts', 'vkblocks_pro_load_scripts' );
