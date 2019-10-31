<?php
/*-------------------------------------------*/
/*  Load modules
/*-------------------------------------------*/
// このファイルは基本 /vk-blocks/vk-blocks-functions.phpを読み込むファイルだけ
// vk-blocks
if ( ! function_exists( 'vkblocks_active' ) ) {

	require_once( 'vk-blocks/vk-blocks-functions.php' );
	require_once( 'vk-blocks/vk-blocks-bootstrap.php' );

	// Set asset URL.
	define( 'VK_BLOCKS_URL', plugin_dir_url( __FILE__ ) . 'vk-blocks/' );
	// Set version number.
	define( 'VK_BLOCKS_VERSION', '0.10.1' );


	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK ' );


	// ExUnitなど読み込み先によってはあらかじめ読み込んでいるので不要の場合がある
	require_once( 'font-awesome/font-awesome-config.php' );
	require_once( 'term-color/term-color-config.php' );
	require_once( 'admin-notices.php' );

}
