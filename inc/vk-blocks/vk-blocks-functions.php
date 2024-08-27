<?php
/**
 * Load VK Blocks Files
 *
 * このファイルはinc/vk-blocks内にあるフォルダ内を読み込むだけ
 *
 * @package vk_blocks
 */

// Load Files
require_once __DIR__ . '/utils/hex-to-rgba.php';
require_once __DIR__ . '/utils/color-slug-to-color-code.php';
require_once __DIR__ . '/utils/array-merge.php';
require_once __DIR__ . '/utils/minify-css.php';
require_once __DIR__ . '/style/balloon.php';
require_once __DIR__ . '/style/hidden-extension.php';
require_once __DIR__ . '/style/common-margin.php';
require_once __DIR__ . '/extensions/core/list.php';
require_once __DIR__ . '/view/responsive-br.php';
require_once __DIR__ . '/view/class-vk-blocks-postlist.php';

require_once __DIR__ . '/class-vk-blocks-print-css-variables.php';

// グローバル設定を定義
require_once __DIR__ . '/class-vk-blocks-global-settings.php';
VK_Blocks_Global_Settings::init();

require_once __DIR__ . '/class-vk-blocks-block-loader.php';
VK_Blocks_Block_Loader::init();

// オプション値を定義
require_once __DIR__ . '/class-vk-blocks-options.php';
VK_Blocks_Options::init();

// font-awesome
require_once __DIR__ . '/font-awesome/font-awesome-config.php';

// VK Blocks の管理画面.
require_once __DIR__ . '/admin/admin.php';
require_once __DIR__ . '/init.php';
require_once __DIR__ . '/blocks.php';
require_once __DIR__ . '/App/RestAPI/BlockMeta/class-vk-blocks-entrypoint.php';
new Vk_Blocks_EntryPoint();

/**
 * VK Blocks active
 */
function vk_blocks_active() {
	return true;
}

add_action(
	'plugins_loaded',
	function () {
		// Load language files.
		$path = dirname( plugin_basename( __FILE__ ) ) . '/languages';
		load_plugin_textdomain( 'vk-blocks-pro', false, $path );
	}
);

/**
 * VK Blocks 用の CSS クラスを追加
 */
add_filter(
	'body_class',
	function ( $body_class ) {
		$body_class[] = 'vk-blocks';
		return $body_class;
	}
);

/**
 * VK Blocks Assets
 */
function vk_blocks_blocks_assets() {
	$vk_blocks_options = VK_Blocks_Options::get_options();

	// プロ版の値をフロントエンドに出力.
	include_once ABSPATH . 'wp-admin/includes/plugin.php';
	if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => true ) );
	} else {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => false ) );
	}

	wp_localize_script(
		'vk-blocks-build-js',
		'vk_blocks_params',
		array(
			'home_url'                    => home_url( '/' ),
			'show_custom_css_editor_flag' => $vk_blocks_options['show_custom_css_editor_flag'],
			'balloon_meta_lists'          => $vk_blocks_options['balloon_meta_lists'],
			'custom_format_lists'         => $vk_blocks_options['custom_format_lists'],
			'block_variation_lists'       => $vk_blocks_options['block_variation_lists'],
		)
	);

	global $vk_blocks_common_attributes;
	$vk_blocks_common_attributes = array(
		'vkb_hidden'       => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_xxl'   => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_xl_v2' => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_xl'    => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_lg'    => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_md'    => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_sm'    => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'vkb_hidden_xs'    => array(
			'type'    => 'boolean',
			'default' => false,
		),
		'marginTop'        => array(
			'type'    => 'string',
			'default' => '',
		),
		'marginBottom'     => array(
			'type'    => 'string',
			'default' => '',
		),
	);

	$dynamic_css = '
		:root {
			--vk_flow-arrow: url(' . VK_BLOCKS_URL . 'images/arrow_bottom.svg);
			--vk_image-mask-circle: url(' . VK_BLOCKS_URL . 'images/circle.svg);
			--vk_image-mask-wave01: url(' . VK_BLOCKS_URL . 'images/wave01.svg);
			--vk_image-mask-wave02: url(' . VK_BLOCKS_URL . 'images/wave02.svg);
			--vk_image-mask-wave03: url(' . VK_BLOCKS_URL . 'images/wave03.svg);
			--vk_image-mask-wave04: url(' . VK_BLOCKS_URL . 'images/wave04.svg);
		}
	';

	// Pro版のためfunction_existsを挟む
	if ( function_exists( 'vk_blocks_get_custom_format_lists_inline_css' ) ) {
		$dynamic_css .= vk_blocks_get_custom_format_lists_inline_css();
	}

	$dynamic_css = vk_blocks_minify_css( $dynamic_css );

	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
	wp_add_inline_style( 'vk-blocks-utils-common-css', $dynamic_css );
	// --vk_image-mask-waveはコアの画像ブロックに依存するのでwp-edit-blocksを追加
	wp_add_inline_style( 'wp-edit-blocks', $dynamic_css );
}
add_action( 'init', 'vk_blocks_blocks_assets', 10 );

if ( ! function_exists( 'vk_blocks_set_wp_version' ) ) {
	/**
	 * VK Blocks Set WP Version
	 */
	function vk_blocks_set_wp_version() {
		global $wp_version;

		// RC版の場合ハイフンを削除.
		if ( strpos( $wp_version, '-' ) !== false ) {
			$_wp_version = strstr( $wp_version, '-', true );
		} else {
			$_wp_version = $wp_version;
		}

		echo '<script>',
			'var wpVersion = "' . esc_attr( $_wp_version ) . '";',
		'</script>';
	}
	add_action( 'admin_head', 'vk_blocks_set_wp_version', 10, 0 );
}

/**
 * スクリプトの読み込み
 */
function vk_blocks_load_scripts() {
	wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_DIR_URL . 'build/vk-slider.min.js', array( 'vk-swiper-script' ), VK_BLOCKS_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'vk_blocks_load_scripts' );
