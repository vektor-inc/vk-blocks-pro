<?php
/**
 * Load VK Blocks Files
 *
 * このファイルはinc/vk-blocks内にあるフォルダ内を読み込むだけ
 *
 * @package vk_blocks
 */

// オプション値などでスタイルを作る処理を読み込み.
require_once dirname( __FILE__ ) . '/style/balloon.php';
require_once dirname( __FILE__ ) . '/style/hidden-extension.php';

require_once dirname( __FILE__ ) . '/view/responsive-br.php';
require_once dirname( __FILE__ ) . '/view/class-vk-blocks-postlist.php';

require_once dirname( __FILE__ ) . '/class-vk-blocks-print-css-variables.php';

// オプション値を定義
require_once dirname( __FILE__ ) . '/class-vk-blocks-options.php';
VK_Blocks_Options::init();

// utils
require_once dirname( __FILE__ ) . '/utils/array-merge.php';
require_once dirname( __FILE__ ) . '/utils/minify-css.php';

// VK Blocks の管理画面.
require_once dirname( __FILE__ ) . '/admin/admin.php';

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
		load_plugin_textdomain( 'vk-blocks', false, $path );
	}
);

/**
 * VK Blocks 用の CSS クラスを追加
 */
add_filter(
	'body_class',
	function( $class ) {
		$class[] = 'vk-blocks';
		return $class;
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
	// ホーム URL を渡す用.
	wp_localize_script(
		'vk-blocks-build-js',
		'vk_blocks_params',
		array(
			'home_url'                    => home_url( '/' ),
			'show_custom_css_editor_flag' => $vk_blocks_options['show_custom_css_editor_flag'],
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
			--vk_image-mask-wave01: url(' . VK_BLOCKS_URL . 'images/wave01.svg);
			--vk_image-mask-wave02: url(' . VK_BLOCKS_URL . 'images/wave02.svg);
			--vk_image-mask-wave03: url(' . VK_BLOCKS_URL . 'images/wave03.svg);
			--vk_image-mask-wave04: url(' . VK_BLOCKS_URL . 'images/wave04.svg);
		}
	';

	$dynamic_css .= vk_blocks_get_spacer_size_style_all( $vk_blocks_options );

	$dynamic_css = vk_blocks_minify_css( $dynamic_css );
	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
	// --vk_image-mask-waveはコアの画像ブロックに依存するのでwp-edit-blocksを追加
	wp_add_inline_style( 'wp-edit-blocks', $dynamic_css );
}
add_action( 'init', 'vk_blocks_blocks_assets', 10 );

// Add Block Category.
if ( ! function_exists( 'vk_blocks_blocks_categories' ) ) {
	/**
	 * Add Block Category
	 *
	 * @param array  $categories categories.
	 * @param string $post post.
	 */
	function vk_blocks_blocks_categories( $categories, $post ) {
		global $vk_blocks_prefix;

		foreach ( $categories as $key => $value ) {
			$keys[] = $value['slug'];
		}

		if ( ! in_array( 'vk-blocks-cat', $keys, true ) ) {
			$categories = array_merge(
				$categories,
				array(
					array(
						'slug'  => 'vk-blocks-cat',
						'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-blocks' ),
						'icon'  => '',
					),
				)
			);
		}

		if ( ! in_array( 'vk-blocks-cat-layout', $keys, true ) ) {
			$categories = array_merge(
				$categories,
				array(
					array(
						'slug'  => 'vk-blocks-cat-layout',
						'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-blocks' ),
						'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
					),
				)
			);
		}

		return $categories;
	}

	// ver5.8.0 block_categories_all.
	if ( function_exists( 'get_default_block_categories' ) && function_exists( 'get_block_editor_settings' ) ) {
		add_filter( 'block_categories_all', 'vk_blocks_blocks_categories', 10, 2 );
	} else {
		add_filter( 'block_categories', 'vk_blocks_blocks_categories', 10, 2 );
	}
}

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

if ( function_exists( 'vk_blocks_get_version' ) ) {
	/**
	 * VK Blocks Set VKBPro Version
	 */
	function vk_blocks_set_vkbpro_version() {
		$vkbpro_version = vk_blocks_get_version();
		if ( $vkbpro_version ) {
			echo '<script>',
			'var vkbproVersion = "' . esc_attr( $vkbpro_version ) . '";',
			'</script>';
		}
	}
	add_action( 'admin_head', 'vk_blocks_set_vkbpro_version', 10, 0 );
}

/**
 * VK BLocks Set VKB Saved Block Version
 */
function vk_blocks_set_vkb_saved_block_version() {
	$post_id                  = get_the_ID();
	$_vkb_saved_block_version = get_post_meta( $post_id, '_vkb_saved_block_version', true );
	if ( $_vkb_saved_block_version ) {
		echo '<script>',
		'var vkbSavedBlockVersion = "' . esc_attr( $_vkb_saved_block_version ) . '";',
		'</script>';
	}
}
add_action( 'admin_head', 'vk_blocks_set_vkb_saved_block_version' );
