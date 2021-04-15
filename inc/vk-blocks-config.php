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

	// Set src path.
	define( 'VK_BLOCKS_SRC_PATH', plugin_dir_path( dirname( __FILE__ ) ) . 'src/' );

	// Set version number.
	define( 'VK_BLOCKS_VERSION', vkblocks_get_version() );

	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK' );
	if ( $vk_blocks_prefix ) {
		$vk_blocks_prefix .= ' ';
	}

	require_once plugin_dir_path( __FILE__ ) . 'vk-admin/vk-admin-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/helpers.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-components/vk-components-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/load-vk-components.php';
	require_once plugin_dir_path( __FILE__ ) . 'font-awesome/font-awesome-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'term-color/term-color-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'template-tags/package/template-tags.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-css-optimize/vk-css-optimize-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-swiper/config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-customize-helpers/vk-customize-helpers-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'tgm-plugin-activation/tgm-config.php';


	if ( ! vkblocks_is_lightning() ) {
		require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/load-bootstrap.php';
	}

	require_once plugin_dir_path( __FILE__ ) . 'admin-notices.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/vk-blocks-functions.php';


	$path = plugin_dir_path( __FILE__ ) . 'vk-blocks/App/RestAPI/BlockMeta/EntryPoint.php';
	require_once $path;
	//BlockMeta用のAPIルートを設定
	new EntryPoint();

	//プロ版の設定ファイルを読み込み
	if( file_exists( plugin_dir_path( __FILE__ ) . 'vk-blocks-pro-config.php' ) ){
		require_once plugin_dir_path( __FILE__ ) . 'vk-blocks-pro-config.php';
	}

	/*
	 出力するCSSが多すぎるので一旦コメントアウト */
	// require_once( 'vk-blocks/functions-color.php' );

}
