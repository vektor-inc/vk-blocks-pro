<?php
/**
 * Load VK Blocks Files
 *
 * @package vk-blocks
 */

// Load composer autoload.
require_once dirname( dirname( __FILE__ ) ) . '/vendor/autoload.php';

use VektorInc\VK_Color_Palette_Manager\VkColorPaletteManager;

$vk_blocks_color_palette_manager = new VkColorPaletteManager();

if ( ! function_exists( 'vk_blocks_active' ) ) {

	// Set asset URL.
	define( 'VK_BLOCKS_URL', plugin_dir_url( __FILE__ ) . 'vk-blocks/' );

	// Set asset Path.
	define( 'VK_BLOCKS_PATH', plugin_dir_path( __FILE__ ) . 'vk-blocks/' );

	// Set version number.
	define( 'VK_BLOCKS_VERSION', vk_blocks_get_version() );

	global $vk_blocks_prefix;
	$vk_blocks_prefix = apply_filters( 'vk_blocks_prefix', 'VK' );
	if ( $vk_blocks_prefix ) {
		$vk_blocks_prefix .= ' ';
	}
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/class-vk-blocks-block-loader.php';
	VK_Blocks_Block_Loader::init();

	require_once plugin_dir_path( __FILE__ ) . 'global-settings/class-global-settings.php';
	VK_Blocks_Global_Settings::init();

	require_once plugin_dir_path( __FILE__ ) . 'vk-helpers/config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-admin/vk-admin-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/helpers.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-components/vk-components-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/load-vk-components.php';
	require_once plugin_dir_path( __FILE__ ) . 'font-awesome/font-awesome-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'term-color/term-color-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-css-optimize/vk-css-optimize-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-swiper/config.php';
	require_once plugin_dir_path( __FILE__ ) . 'vk-customize-helpers/vk-customize-helpers-config.php';
	require_once plugin_dir_path( __FILE__ ) . 'tgm-plugin-activation/tgm-config.php';


	if ( ! vk_blocks_is_lightning() ) {
		require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/load-bootstrap.php';
	}

	require_once plugin_dir_path( __FILE__ ) . 'admin-notices.php';

	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/vk-blocks-functions.php';

	require_once plugin_dir_path( __FILE__ ) . 'vk-blocks/App/RestAPI/BlockMeta/class-vk-blocks-entrypoint.php';
	// BlockMeta用のAPIルートを設定.
	new Vk_Blocks_EntryPoint();

	// プロ版の設定ファイルを読み込み.
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'vk-blocks-pro-config.php' ) ) {
		require_once plugin_dir_path( __FILE__ ) . 'vk-blocks-pro-config.php';
	}
}
