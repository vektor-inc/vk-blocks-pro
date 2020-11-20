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

function vkblocks_blocks_assets() {

	wp_register_style( 'vk-blocks-build-css', VK_BLOCKS_URL . 'build/block-build.css', array(), VK_BLOCKS_VERSION );
	wp_register_style( 'vk-blocks-build-editor-css', VK_BLOCKS_URL . 'build/block-build-editor.css', array(), VK_BLOCKS_VERSION );

	global $wp_version;
	if ( defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, '5.3', '>=' ) ) {
		$dependency = array(
			'wp-block-editor',
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
	} else {
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
	}
	wp_register_script(
		'vk-blocks-build-js',
		VK_BLOCKS_URL . 'build/block-build.js',
		$dependency,
		VK_BLOCKS_VERSION,
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'vk-blocks-build-js', 'vk-blocks', plugin_dir_path( __FILE__ ) . 'build/languages' );
	}

	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
	if ( is_plugin_active( 'vk-blocks-pro/vk-blocks.php' ) ) {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => true ) );
	} else {
		wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => false ) );
	}

	/**
	 * Page List for Page Content Block
	 */
	// 選択可能なフォームを生成.
	$option_posts = array(
		array(
			'label' => __( 'Unspecified', 'vk-all-in-one-expansion-unit' ),
			'value' => -1,
		),
	);

	$the_posts = get_posts(
		array(
			'posts_per_page' => -1,
			'post_type'      => 'page',
		)
	);

	foreach ( $the_posts as $the_post ) {
		$option_posts[] = array(
			'label' => $the_post->post_title,
			'value' => $the_post->ID,
		);
	}
	// 投稿リストをブロック側に渡す.
	wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_page_list', $option_posts );

	if ( defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, '5.0', '>=' ) ) {

		$arr = array( 'alert', 'balloon', 'button', 'faq', 'flow', 'pr-blocks', 'pr-content', 'outer', 'spacer', 'heading', 'staff', 'table-of-contents-new', 'highlighter', 'timeline', 'timeline-item', 'step', 'step-item', 'post-list', 'list-style', 'group-style', 'child-page', 'card', 'card-item', 'grid-column', 'grid-column-item', 'border-box', 'icon-card', 'icon-card-item', 'animation', 'slider', 'slider-item', 'faq2', 'faq2-q', 'faq2-a', 'responsive-br', 'nowrap' );// REPLACE-FLAG : このコメントは削除しないで下さい。wp-create-gurten-template.shで削除する基準として左の[//REPLACE-FLAG]を使っています。
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
			} elseif ( $value == 'post-list' ) {
					register_block_type(
						'vk-blocks/' . $value,
						array(
							'attributes'      => array_merge(
								array(
									'name'              => array(
										'type' => 'string',
									),
									'layout'            => array(
										'type'    => 'string',
										'default' => 'card',
									),
									'col_xs'            => array(
										'type'    => 'number',
										'default' => 1,
									),
									'col_sm'            => array(
										'type'    => 'number',
										'default' => 2,
									),
									'col_md'            => array(
										'type'    => 'number',
										'default' => 3,
									),
									'col_lg'            => array(
										'type'    => 'number',
										'default' => 3,
									),
									'col_xxl'           => array(
										'type'    => 'number',
										'default' => 3,
									),
									'col_xl'            => array(
										'type'    => 'number',
										'default' => 3,
									),
									'display_image'     => array(
										'type'    => 'boolean',
										'default' => true,
									),
									'display_image_overlay_term' => array(
										'type'    => 'boolean',
										'default' => true,
									),
									'display_excerpt'   => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'display_date'      => array(
										'type'    => 'boolean',
										'default' => true,
									),
									'display_new'       => array(
										'type'    => 'boolean',
										'default' => true,
									),
									'display_taxonomies' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'display_btn'       => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'new_date'          => array(
										'type'    => 'number',
										'default' => 7,
									),
									'new_text'          => array(
										'type'    => 'string',
										'default' => 'New!!',
									),
									'btn_text'          => array(
										'type'    => 'string',
										'default' => 'Read more',
									),
									'btn_align'         => array(
										'type'    => 'string',
										'default' => 'text-right',
									),
									'numberPosts'       => array(
										'type'    => 'number',
										'default' => 6,
									),
									'isCheckedPostType' => array(
										'type'    => 'string',
										'default' => '["post"]',
									),
									'coreTerms'         => array(
										'type'    => 'string',
										'default' => '{}',
									),
									'isCheckedTerms'    => array(
										'type'    => 'string',
										'default' => '[]',
									),
									'order'           => array(
										'type'    => 'string',
										'default' => 'DESC',
									),
									'orderby'           => array(
										'type'    => 'string',
										'default' => 'date',
									),
									'offset'            => array(
										'type'    => 'number',
										'default' => 0,
									),
									'selfIgnore'        => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'className'         => array(
										'type'    => 'string',
										'default' => '',
									),
								),
								$vk_blocks_common_attributes
							),
							// 'style'           => 'vk-blocks-build-css',
							'editor_style'    => 'vk-blocks-build-editor-css',
							'editor_script'   => 'vk-blocks-build-js',
							'render_callback' => 'vk_blocks_render_post_list',
							'supports'        => array(),
						)
					); // register_block_type(
			} elseif ( $value == 'child-page' ) {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						'attributes'      => array_merge(
							array(
								'selectId'          => array(
									'type'    => 'number',
									'default' => -1,
								),
								'name'              => array(
									'type'    => 'string',
									'default' => '',
								),
								'layout'            => array(
									'type'    => 'string',
									'default' => 'card-horizontal',
								),
								'col_xs'            => array(
									'type'    => 'number',
									'default' => 1,
								),
								'col_sm'            => array(
									'type'    => 'number',
									'default' => 2,
								),
								'col_md'            => array(
									'type'    => 'number',
									'default' => 2,
								),
								'col_lg'            => array(
									'type'    => 'number',
									'default' => 2,
								),
								'col_xl'            => array(
									'type'    => 'number',
									'default' => 2,
								),
								'col_xxl'           => array(
									'type'    => 'number',
									'default' => 2,
								),
								'display_image'     => array(
									'type'    => 'boolean',
									'default' => true,
								),
								'display_image_overlay_term' => array(
									'type'    => 'boolean',
									'default' => true,
								),
								'display_excerpt'   => array(
									'type'    => 'boolean',
									'default' => true,
								),
								'display_date'      => array(
									'type'    => 'boolean',
									'default' => false,
								),
								'display_new'       => array(
									'type'    => 'boolean',
									'default' => false,
								),
								'display_taxonomies' => array(
									'type'    => 'boolean',
									'default' => false,
								),
								'display_btn'       => array(
									'type'    => 'boolean',
									'default' => true,
								),
								'new_date'          => array(
									'type'    => 'number',
									'default' => 7,
								),
								'new_text'          => array(
									'type'    => 'string',
									'default' => 'New!!',
								),
								'btn_text'          => array(
									'type'    => 'string',
									'default' => 'Read more',
								),
								'btn_align'         => array(
									'type'    => 'string',
									'default' => 'text-right',
								),
								'numberPosts'       => array(
									'type'    => 'number',
									'default' => 6,
								),
								'isCheckedPostType' => array(
									'type'    => 'string',
									'default' => '["post"]',
								),
								'coreTerms'         => array(
									'type'    => 'string',
									'default' => '{}',
								),
								'isCheckedTerms'    => array(
									'type'    => 'string',
									'default' => '[]',
								),
								'className'         => array(
									'type'    => 'string',
									'default' => '',
								),
								'selfIgnore'        => array(
									'type'    => 'boolean',
									'default' => false,
								),
							),
							$vk_blocks_common_attributes
						),
						'editor_style'    => 'vk-blocks-build-editor-css',
						'editor_script'   => 'vk-blocks-build-js',
						'render_callback' => 'vk_blocks_render_post_list',
						'supports'        => array(),
					)
				); // register_block_type(
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
		require_once dirname( __FILE__ ) . '/blocks/page-content/class-vk-page-content-block.php';
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
add_action( 'init', 'vkblocks_blocks_assets' );

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
		echo '<script>',
			'var wpVersion = "' . $wp_version . '";',
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
