<?php
/**
 * VK Blocks main functions
 *
 * Main Functions for VK Blocks
 *
 * @package vk_blocks
 */

// サーバーサイドレンダリングスクリプトを読み込み.
require_once dirname( __FILE__ ) . '/view/class-vk-blocks-postlist.php';
require_once dirname( __FILE__ ) . '/view/responsive-br.php';
require_once dirname( __FILE__ ) . '/style/balloon.php';
require_once dirname( __FILE__ ) . '/class-vk-blocks-print-css-variables.php';

/**
 * スペーサーのサイズの配列
 */
function vk_blocks_margin_size_array() {
	$vk_margin_size_array = array(
		array(
			'label' => __( 'Small', 'vk-blocks' ),
			'value' => 'sm',
		),
		array(
			'label' => __( 'Medium', 'vk-blocks' ),
			'value' => 'md',
		),
		array(
			'label' => __( 'Large', 'vk-blocks' ),
			'value' => 'lg',
		),
	);
	return $vk_margin_size_array;
}

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
 * VK Blocks Get Option
 */
function vk_blocks_get_options() {
	$options  = get_option( 'vk_blocks_options' );
	$defaults = array(
		'balloon_border_width' => 1,
		'margin_unit'          => 'rem',
	);
	$defaults = array_merge( $defaults, apply_filters( 'vk_blocks_default_options', array() ) );
	$options  = wp_parse_args( $options, $defaults );
	return $options;
}
/**
 * VK Blocks Get Selected
 *
 * @param string $current current.
 * @param string $value value.
 */
function vk_blocks_get_selected( $current, $value ) {
	$vk_blocks_selected = '';
	if ( $current === $value ) {
		$vk_blocks_selected = ' selected';
	}
	return $vk_blocks_selected;
}
/**
 * VK Blocks The Selected
 *
 * @param string $current current.
 * @param string $value value.
 */
function vk_blocks_the_selected( $current, $value ) {
	echo esc_attr( vk_blocks_get_selected( $current, $value ) );
}

// Load CSS.
if ( ! function_exists( 'vk_blocks_add_styles' ) ) {
	/**
	 * VK Blocks Add Styles
	 */
	function vk_blocks_add_styles() {
		wp_enqueue_style( 'vk-blocks-build-css' );
	};
}
// Load css at footer.
if ( ! function_exists( 'vk_blocks_enqueue_point' ) ) {
	/**
	 * VK Blocks Enqueue Point
	 */
	function vk_blocks_enqueue_point() {
		$hook_point = apply_filters( 'vk_blocks_enqueue_point', 'wp_enqueue_scripts' );
		// Front css.
		add_action( $hook_point, 'vk_blocks_add_styles' );

		// Admin css.
		if ( is_admin() ) {
			add_action( 'enqueue_block_assets', 'vk_blocks_add_styles' );
		}
	};
}

/**
 * Reason of Using through the after_setup_theme is
 * to be able to change the action hook point of css load from theme..
 */
add_action( 'after_setup_theme', 'vk_blocks_enqueue_point' );

/**
 * VK Blocks is Larger than WP
 *
 * @param string $target_version Target version.
 * @param string $syntax syntax.
 */
function vk_blocks_is_lager_than_wp( $target_version, $syntax = '>=' ) {
	global $wp_version;
	return defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, $target_version, $syntax );
}

/**
 * VK Blocks Assets
 */
function vk_blocks_blocks_assets() {
	$asset_file        = include plugin_dir_path( __FILE__ ) . '/build/block-build.asset.php';
	$vk_blocks_options = vk_blocks_get_options();

	// CSSを登録.
	wp_register_style( 'vk-blocks-build-css', VK_BLOCKS_URL . 'build/block-build.css', array(), VK_BLOCKS_VERSION );
	wp_register_style( 'vk-blocks-build-editor-css', VK_BLOCKS_URL . 'build/block-build-editor.css', array(), VK_BLOCKS_VERSION );

	// ブロックのJavascriptを登録.
	wp_register_script(
		'vk-blocks-build-js',
		VK_BLOCKS_URL . 'build/block-build.js',
		$asset_file['dependencies'],
		VK_BLOCKS_VERSION,
		true
	);

	// 翻訳を追加.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	// プロ版の値をフロントエンドに出力.
	include_once ABSPATH . 'wp-admin/includes/plugin.php';
	if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => true ) );
	} else {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => false ) );
	}
	// ホーム URL を渡す用.
	wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_params', array( 'home_url' => home_url( '/' ) ) );

	if ( vk_blocks_is_lager_than_wp( '5.0' ) ) {

		// register_block_type_from_metadataで読み込むブロック.
		$arr_wp56     = array(
			'alert',
			'balloon',
			'border-box',
			'button',
			'faq',
			'faq2',
			'faq2-a',
			'faq2-q',
			'flow',
			'heading',
			'icon',
			'icon-outer',
			'page-content',
			'pr-blocks',
			'pr-content',
			'spacer',
			'staff',
		);
		$arr_wp56_pro = array(
			'accordion',
			'accordion-target',
			'accordion-trigger',
			'animation',
			'card',
			'card-item',
			'child-page',
			'grid-column',
			'grid-column-item',
			'icon-card',
			'icon-card-item',
			'outer',
			'post-list',
			'select-post-list',
			'select-post-list-item',
			'slider',
			'slider-item',
			'step',
			'step-item',
			'table-of-contents-new',
			'timeline',
			'timeline-item',
		);

		if ( function_exists( 'register_block_type_from_metadata' ) ) {
			foreach ( $arr_wp56 as $array ) {
				require_once VK_BLOCKS_SRC_PATH . '/blocks/' . $array . '/index.php';
			}
			foreach ( $arr_wp56_pro as $array ) {
				if ( file_exists( VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $array . '/index.php' ) ) {
					require_once VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $array . '/index.php';
				}
			}
		}

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
		);
	}

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

	// delete before after space.
	$dynamic_css = trim( $dynamic_css );
	// convert tab and br to space.
	$dynamic_css = preg_replace( '/[\n\r\t]/', '', $dynamic_css );
	// Change multiple spaces to single space.
	$dynamic_css = preg_replace( '/\s(?=\s)/', '', $dynamic_css );
	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
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

