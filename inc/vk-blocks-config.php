<?php
/*
  Load modules
-------------------------------------------*/
// このファイルは基本 /vk-blocks/vk-blocks-functions.phpを読み込むファイルだけ
// vk-blocks

if ( ! function_exists( 'vkblocks_active' ) ) {

	// Set asset URL.
    define( 'VK_BLOCKS_URL', plugin_dir_url( __FILE__ ) . 'vk-blocks/' );

    // Set asset Path.
	define( 'VK_BLOCKS_PATH', plugin_dir_path( __FILE__ ) . 'vk-blocks/' );

	// Set version number.
	define( 'VK_BLOCKS_VERSION', vkblocks_get_version() );

	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK' );
	if ( $vk_blocks_prefix ) {
		$vk_blocks_prefix .= ' ';
	}

	require_once plugin_dir_path( __DIR__ ) . 'inc/vk-admin/vk-admin-config.php';
	require_once 'vk-blocks/helpers.php';
	require_once 'vk-components/vk-components-config.php';
	require_once 'vk-blocks/load-vk-components.php';
	require_once 'font-awesome/font-awesome-config.php';
	require_once 'term-color/term-color-config.php';
	require_once 'template-tags/package/template-tags.php';
	require_once 'vk-css-optimize/vk-css-optimize-config.php';
	require_once 'saved-block-version.php';
	require_once  plugin_dir_path( __DIR__ ) . 'inc/vk-customize-helpers/vk-customize-helpers-config.php';


	if ( ! vkblocks_is_lightning() ) {
		require_once 'vk-blocks/load-bootstrap.php';
	}

	require_once 'admin-notices.php';
	require_once 'vk-blocks/vk-blocks-functions.php';


	$path = dirname(dirname(__FILE__)) .'/inc/vk-blocks/App/RestAPI/BlockMeta/EntryPoint.php';
	require_once $path;
	//BlockMeta用のAPIルートを設定
	new EntryPoint();

	// Stop Core Block Template.
	$vk_blocks_options  = vkblocks_get_options();
	if ( "hide" === $vk_blocks_options['display_wp_block_template'] ) {
		remove_theme_support( 'core-block-patterns' );
	}

	//プロ版の設定ファイルを読み込み
	if(file_exists(dirname(__FILE__) . '/vk-blocks-pro-config.php')){
		require_once 'vk-blocks-pro-config.php';
	}

	/*
	 出力するCSSが多すぎるので一旦コメントアウト */
	// require_once( 'vk-blocks/functions-color.php' );

}
