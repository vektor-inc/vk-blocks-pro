<?php

// サーバーサイドレンダリングスクリプトを読み込み。
require_once dirname( __FILE__ ) . '/view/post-list.php';
require_once dirname( __FILE__ ) . '/view/responsive-br.php';
require_once dirname( __FILE__ ) . '/style/balloon.php';
// require_once dirname( __FILE__ ) . '/customize/vk-blocks-customize-config.php';

// VK Blocks の管理画面
require_once dirname( __FILE__ ) . '/admin/admin.php';

function vkblocks_active() {
	return true;
}

add_action(
	'plugins_loaded',
	function () {
		// Load language files.
		$path = dirname( plugin_basename( __FILE__ ) ) . '/build/languages';
		load_plugin_textdomain( 'vk-blocks', false, $path );
	}
);

/*
-------------------------------------------*/
/*
  Get Option
/*-------------------------------------------*/
function vkblocks_get_options() {
	$options  = get_option( 'vk_blocks_options' );
	$defaults = array(
		'display_wp_block_template' => 'hide',
		'balloon_border_width'      => 1,
	);
	$defaults = array_merge( $defaults, apply_filters( 'vk_blocks_default_options', array() ) );
	$options  = wp_parse_args( $options, $defaults );
	return $options;
}
function vkblocks_get_selected( $current, $value ) {
	$selected = '';
	if ( $current == $value ) {
		$selected = ' selected';
	}
	return $selected;
}
function vkblocks_the_selected( $current, $value ) {
	echo vkblocks_get_selected( $current, $value );
}

/*
 Load css
---------------------------------------------------------- */
if ( ! function_exists( 'vkblocks_add_styles' ) ) {
	function vkblocks_add_styles() {
		wp_enqueue_style( 'vk-blocks-build-css' );
	};
}
// Load css at footer
if ( ! function_exists( 'vkblocks_enqueue_point' ) ) {
	function vkblocks_enqueue_point() {
		$hook_point = apply_filters( 'vkblocks_enqueue_point', 'wp_enqueue_scripts' );
		// Front css
		add_action( $hook_point, 'vkblocks_add_styles' );

		// Admin css
		if ( is_admin() ) {
			add_action( 'enqueue_block_assets', 'vkblocks_add_styles' );
		}
	};
}

/**
 * Reason of Using through the after_setup_theme is
 * to be able to change the action hook point of css load from theme..
 */
add_action( 'after_setup_theme', 'vkblocks_enqueue_point' );

function is_lager_than_wp( $target_version, $syntax=">=" ) {
	global $wp_version;
	return defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, $target_version, $syntax );
}

function vkblocks_blocks_assets() {

	// CSSを登録
	wp_register_style( 'vk-blocks-build-css', VK_BLOCKS_URL . 'build/block-build.css', array(), VK_BLOCKS_VERSION );
	wp_register_style( 'vk-blocks-build-editor-css', VK_BLOCKS_URL . 'build/block-build-editor.css', array(), VK_BLOCKS_VERSION );

	//依存関係を定義
	$dependency = array(
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-editor',
		'wp-hooks',
		'wp-compose',
		'wp-edit-post',
		'wp-components',
		'wp-data',
		'wp-plugins',
		'wp-hooks',
		'wp-api-fetch',
		'wp-viewport',
	);
	$dependency_wp53 = array(
		'wp-block-editor',
	);

	//wp5.3以上で使えるAPIを追加。
	if( is_lager_than_wp('5.3') ){
		$dependency = array_merge(
			$dependency,
			$dependency_wp53
		);
	}

	//ブロックのJavascriptを登録
	wp_register_script(
		'vk-blocks-build-js',
		VK_BLOCKS_URL . 'build/block-build.js',
		$dependency,
		VK_BLOCKS_VERSION,
		true
	);

	//翻訳を追加
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks', plugin_dir_path( __FILE__ ) . 'build/languages' );
	}

	// プロ版の値をフロントエンドに出力
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => true ) );
	} else {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => false ) );
	}

	if( is_lager_than_wp('5.0') ){

		//register_blockで読み込むブロック
<<<<<<< HEAD
		$arr = array( 'pr-blocks', 'outer', 'spacer', 'heading', 'staff', 'table-of-contents-new', 'highlighter', 'timeline', 'timeline-item', 'step', 'step-item', 'post-list', 'list-style', 'group-style', 'child-page', 'card', 'card-item', 'grid-column', 'grid-column-item', 'icon-card', 'icon-card-item', 'slider', 'slider-item', 'responsive-br', 'nowrap' );
		//register_block_type_from_metadataで読み込むブロック
		$arr_wp56 = array(
			'alert',
			'button',
			'border-box',
=======
		$arr = array( 'button', 'pr-blocks', 'outer', 'heading', 'staff', 'table-of-contents-new', 'highlighter', 'timeline', 'timeline-item', 'step', 'step-item', 'list-style', 'group-style', 'card', 'card-item', 'grid-column', 'grid-column-item', 'icon-card', 'icon-card-item', 'slider', 'slider-item', 'responsive-br', 'nowrap' );

		//register_block_type_from_metadataで読み込むブロック
		$arr_wp56 = array(
			'alert',
>>>>>>> 82aff43d2d0d85f3e5d458545bd9a015edc32dce
			'pr-content',
			'faq2',
			'faq2-q',
			'faq2-a',
			'balloon',
			'faq',
			'flow',
			'page-content',
			'border-box',
			'spacer',
		);
		$arr_wp56_pro = array(
			'animation',
			'child-page',
			'post-list',
		);

    if( function_exists('register_block_type_from_metadata') ){
			foreach ( $arr_wp56 as $array ) {
				require_once VK_BLOCKS_SRC_PATH . '/blocks/' . $array . '/index.php';
			}
			foreach ( $arr_wp56_pro as $array ) {
				require_once VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $array . '/index.php';
			}
		} else {
			$arr = array_merge(
				$arr,
				$arr_wp56,
				$arr_wp56_pro
			);
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

		foreach ( $arr as $value ) {

			if ( $value === 'table-of-contents' ) {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						// 'style'        => 'vk-blocks-build-css',
						'editor_style'    => 'vk-blocks-build-editor-css',
						'editor_script'   => 'vk-blocks-build-js',
						'attributes'      => array_merge(
							array(
								'style'      => array(
									'type'    => 'string',
									'default' => '',
								),
								'renderHtml' => array(
									'type'    => 'string',
									'default' => '',
								),
								'open'       => array(
									'type'    => 'string',
									'default' => 'open',
								),
								'className'  => array(
									'type'    => 'string',
									'default' => '',
								),
							),
							$vk_blocks_common_attributes
						),
						'render_callback' => function ( $attributes ) {
							if ( $attributes['renderHtml'] ) {
								$custom_class = esc_attr( $attributes['className'] ) . ' ';
								return preg_replace( '/class="/', 'class="' . $custom_class, $attributes['renderHtml'], 1 );
							} else {
								return '<div><div class="vk_tableOfContents_title">' . __( 'Table of Contents', 'vk-blocks' ) . '</div></div>';
							}
						},
						'supports'        => array(),
					)
				);
			} else {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						// 'style'         => 'vk-blocks-build-css',
						'editor_style'  => 'vk-blocks-build-editor-css',
						'editor_script' => 'vk-blocks-build-js',
					)
				);

			} // if ( $value === 'table-of-contents' ) {
		} // foreach ( $arr as $value ) {
	} // if ( defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, '5.0', '>=' ) ) {

	$dynamic_css = '
		:root {
			--vk_flow-arrow: url(' . VK_BLOCKS_URL . 'images/arrow_bottom.svg);
			--vk_image-mask-wave01: url(' . VK_BLOCKS_URL . 'images/wave01.svg);
			--vk_image-mask-wave02: url(' . VK_BLOCKS_URL . 'images/wave02.svg);
			--vk_image-mask-wave03: url(' . VK_BLOCKS_URL . 'images/wave03.svg);
			--vk_image-mask-wave04: url(' . VK_BLOCKS_URL . 'images/wave04.svg);
		}
	';
	// delete before after space
	$dynamic_css = trim( $dynamic_css );
	// convert tab and br to space
	$dynamic_css = preg_replace( '/[\n\r\t]/', '', $dynamic_css );
	// Change multiple spaces to single space
	$dynamic_css = preg_replace( '/\s(?=\s)/', '', $dynamic_css );
	wp_add_inline_style( 'vk-blocks-build-css', $dynamic_css );
} // function vkblocks_blocks_assets() {
add_action( 'init', 'vkblocks_blocks_assets', 10 );

// Add Block Category,
if ( ! function_exists( 'vkblocks_blocks_categories' ) ) {
	// Add Block Category,
	function vkblocks_blocks_categories( $categories, $post ) {
		global $vk_blocks_prefix;

		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat',
					'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-all-in-one-expansion-unit' ),
					'icon'  => '',
				),
			)
		);
		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat-layout',
					'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-all-in-one-expansion-unit' ),
					'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
				),
			)
		);

		return $categories;
	}

	add_filter( 'block_categories', 'vkblocks_blocks_categories', 10, 2 );
}

if ( ! function_exists( 'vkblocks_set_wp_version' ) ) {
	function vkblocks_set_wp_version() {
		global $wp_version;

		// RC版の場合ハイフンを削除
		if(strpos($wp_version,'-') !== false){
			$_wp_version = strstr($wp_version,'-',true);
		} else {
			$_wp_version = $wp_version;
		}

		echo '<script>',
			'var wpVersion = "' . $_wp_version . '";',
		'</script>';
	}
	add_action( 'admin_head', 'vkblocks_set_wp_version', 10, 0 );
}

if ( function_exists( 'vkblocks_get_version' ) ) {

	function vkblocks_set_vkbpro_version() {
		$vkbpro_version = vkblocks_get_version();
		if ( $vkbpro_version ) {
			echo '<script>',
			'var vkbproVersion = "' . $vkbpro_version . '";',
			'</script>';
		}
	}
	add_action( 'admin_head', 'vkblocks_set_vkbpro_version', 10, 0 );
}
