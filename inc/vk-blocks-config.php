<?php
/*
  Load modules
-------------------------------------------*/
// このファイルは基本 /vk-blocks/vk-blocks-functions.phpを読み込むファイルだけ
// vk-blocks

if ( ! function_exists( 'vkblocks_active' ) ) {

	// Set asset URL.
	define( 'VK_BLOCKS_URL', plugin_dir_url( __FILE__ ) . 'vk-blocks/' );
	// Set version number.
	define( 'VK_BLOCKS_VERSION', '0.22.1' );

	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK ' );

	require_once 'vk-blocks/helpers.php';
	require_once 'vk-components/vk-components-config.php';
	require_once 'vk-blocks/load-vk-components.php';
	require_once 'font-awesome/font-awesome-config.php';
	require_once 'term-color/term-color-config.php';

	if ( ! vkblocks_is_lightning() ) {
		require_once 'vk-blocks/load-bootstrap.php';
	}

	require_once 'admin-notices.php';
	require_once 'vk-blocks/vk-blocks-functions.php';
	/*
	 出力するCSSが多すぎるので一旦コメントアウト */
	// require_once( 'vk-blocks/functions-color.php' );
}
