<?php
/**
 * VK Blocks initial option
 *
 * @package vk-blocks
 */

/**
 * プラグインを有効化した時にoption値を保存する
 *
 * @return void
 */
function vk_blocks_activation_function() {
	$options = get_option( 'vk_blocks_options' );
	if ( ! $options ) {
		$activation = true;
		add_option( 'vk_blocks_options', VK_Blocks_Options::get_vk_blocks_options_defaults( $activation ) );
	}
}
register_activation_hook( VK_BLOCKS_DIR_PATH . 'vk-blocks.php', 'vk_blocks_activation_function' );
