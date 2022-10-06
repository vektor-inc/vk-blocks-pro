<?php
/**
 * VK Blocks initial option
 *
 * @package vk-blocks
 */

/**
 * プラグインを有効化した時のバージョンを保存したいのでoption値を保存する
 *
 * @return void
 */
function vk_blocks_activation_function() {
	$options = get_option( 'vk_blocks_options' );
	if ( ! $options ) {
		$activation = true;
		add_option( 'vk_blocks_options', VK_Blocks_Options::get_defaults( VK_Blocks_Options::options_scheme( $activation ) ) );
	}
}
register_activation_hook( VK_BLOCKS_DIR_PATH . 'vk-blocks.php', 'vk_blocks_activation_function' );
