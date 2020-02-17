<?php

// サーバーサイドレンダリングスクリプトを読み込み。
require_once dirname( __FILE__ ) . '/view/post-list.php';
require_once dirname(dirname(dirname( __FILE__ ))) . '/inc/custom-field-builder/custom-field-builder-config.php';



function vkblocks_active() {
	return true;
}

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
			'wp-edit-post',
			'wp-components',
			'wp-data',
			'wp-plugins',
			'wp-hooks',
			'wp-api-fetch'
		);
	} else {
		$dependency = array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-edit-post',
			'wp-components',
			'wp-data',
			'wp-plugins',
			'wp-hooks',
			'wp-api-fetch'
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

	$theme = wp_get_theme();
	if ( $theme->exists() ) {
		// 親テーマのテンプレートを取得
		// 親テーマが lightning-pro か テーマ名が Lightning Pro の時
		if ( $theme->get( 'Template' ) == 'lightning-pro' || $theme->get( 'Name' ) == 'Lightning Pro' ) {
			wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => true ) );
		} else {
			wp_localize_script( 'vk-blocks-build-js', 'vk_blocks_check', array( 'is_pro' => false ) );
		}
	} // if ( $theme->exists() ) {

	if ( defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, '5.0', '>=' ) ) {

		$arr = array( 'alert', 'balloon', 'button', 'faq', 'flow', 'pr-blocks', 'pr-content', 'outer', 'spacer', 'heading', 'staff', 'table-of-contents', 'highlighter', 'timeline', 'timeline-item', 'step', 'step-item', 'post-list', 'list-style', 'group-style', 'child-page' );// REPLACE-FLAG : このコメントは削除しないで下さい。wp-create-gurten-template.shで削除する基準として左の[//REPLACE-FLAG]を使っています。

		foreach ( $arr as $value ) {

			if ( $value === 'table-of-contents' ) {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						'style'           => 'vk-blocks-build-css',
						'editor_style'    => 'vk-blocks-build-editor-css',
						'editor_script'   => 'vk-blocks-build-js',
						'attributes'      => array(
							'style'      => array(
								'type'    => 'string',
								'default' => '',
							),
							'renderHtml' => array(
								'type'    => 'string',
								'default' => '',
							),
						),
						'render_callback' => function ( $attributes ) {
							return $attributes['renderHtml'];
						},
					)
				);

				if ( ! is_admin() ) {
					wp_enqueue_script( 'vk-blocks-toc-helper-js', VK_BLOCKS_URL . 'build/viewHelper.js', array(), VK_BLOCKS_VERSION, true );
				}
			} elseif ( $value == 'post-list' ) {

					register_block_type(
						'vk-blocks/' . $value,
						array(
							'attributes'      => array(
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
							),
							'style'           => 'vk-blocks-build-css',
							'editor_style'    => 'vk-blocks-build-editor-css',
							'editor_script'   => 'vk-blocks-build-js',
							'render_callback' => 'vk_blocks_render_post_list',
						)
					); // register_block_type(
			} elseif ( $value == 'child-page' ) {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						'attributes'      => array(
							'selectId'                   => array(
								'type' => 'number',
							),
							'name'                       => array(
								'type'    => 'string',
								'default' => '',
							),
							'layout'                     => array(
								'type'    => 'string',
								'default' => 'card-horizontal',
							),
							'col_xs'                     => array(
								'type'    => 'number',
								'default' => 1,
							),
							'col_sm'                     => array(
								'type'    => 'number',
								'default' => 2,
							),
							'col_md'                     => array(
								'type'    => 'number',
								'default' => 2,
							),
							'col_lg'                     => array(
								'type'    => 'number',
								'default' => 2,
							),
							'col_xl'                     => array(
								'type'    => 'number',
								'default' => 2,
							),
							'display_image'              => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'display_image_overlay_term' => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'display_excerpt'            => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'display_date'               => array(
								'type'    => 'boolean',
								'default' => false,
							),
							'display_new'                => array(
								'type'    => 'boolean',
								'default' => false,
							),
							'display_btn'                => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'new_date'                   => array(
								'type'    => 'number',
								'default' => 7,
							),
							'new_text'                   => array(
								'type'    => 'string',
								'default' => 'New!!',
							),
							'btn_text'                   => array(
								'type'    => 'string',
								'default' => 'Read more',
							),
							'btn_align'                  => array(
								'type'    => 'string',
								'default' => 'text-right',
							),
							'numberPosts'                => array(
								'type'    => 'number',
								'default' => 6,
							),
							'isCheckedPostType'          => array(
								'type'    => 'string',
								'default' => '["post"]',
							),
							'coreTerms'                  => array(
								'type'    => 'string',
								'default' => '{}',
							),
							'isCheckedTerms'             => array(
								'type'    => 'string',
								'default' => '[]',
							),
						),
						'style'           => 'vk-blocks-build-css',
						'editor_style'    => 'vk-blocks-build-editor-css',
						'editor_script'   => 'vk-blocks-build-js',
						'render_callback' => 'vk_blocks_render_post_list',
					)
				); // register_block_type(
			} else {

				register_block_type(
					'vk-blocks/' . $value,
					array(
						'style'         => 'vk-blocks-build-css',
						'editor_style'  => 'vk-blocks-build-editor-css',
						'editor_script' => 'vk-blocks-build-js',
					)
				);

			} // if ( $value === 'table-of-contents' ) {
		} // foreach ( $arr as $value ) {
	} // if ( defined( 'GUTENBERG_VERSION' ) || version_compare( $wp_version, '5.0', '>=' ) ) {
} // function vkblocks_blocks_assets() {
add_action( 'init', 'vkblocks_blocks_assets' );

// Add Block Category,
if ( ! function_exists( 'vkblocks_blocks_categories' ) ) {
	// Add Block Category,
	function vkblocks_blocks_categories( $categories, $post ) {
		global $vk_blocks_prefix;
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat',
					'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-blocks' ),
					'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
				),
				array(
					'slug'  => 'vk-blocks-cat-layout',
					'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-blocks' ),
					'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
				),
			)
		);
	}
	add_filter( 'block_categories', 'vkblocks_blocks_categories', 10, 2 );
}


function add_posts_columns( $columns ) {
	$columns['vkb_template'] =  __( 'VK Blocks Templates', 'vk-blocks' );
	return $columns;
}
function custom_posts_column( $column_name, $post_id ) {
	if ( $column_name == 'vkb_template' ) {
		$ajax_nonce = wp_create_nonce( "my-special-string" );
		$cf_vkb_template = get_post_meta( $post_id, 'is_registerd_vkb_template', true );
		$cf_vkb_template ? $checked = "checked" : $checked = "";

		echo '<form name="register_vkb_template_form' . $post_id .'">';
		echo '<input type="checkbox" name="is_registerd_vkb_template" id="is_registerd_vkb_template' . $post_id .'"' . ' ' . $checked . '>';
		echo '<script type="text/javascript">saveCheckBox("' . $post_id . '", "' . $ajax_nonce . '");</script>';	
	};
  };
  add_filter( 'manage_wp_block_posts_columns', 'add_posts_columns' );	
  add_action( 'manage_wp_block_posts_custom_column', 'custom_posts_column', 10, 2 );

  add_action( 'wp_ajax_my_action', 'my_action_function' );
  function my_action_function() {
	  check_ajax_referer( 'my-special-string', 'security' );
	  $raw = sanitize_text_field( $_POST['my_string'] );
	  $raw = str_replace("\\", "", $raw);
	  $ajaxData = json_decode( $raw ,true);
	  $save = $ajaxData["checked"] ? array("1") : '';
	  echo update_post_meta($ajaxData["postId"], 'is_registerd_vkb_template', $save);
	  wp_die();
  }
  
function enqueue_ajax_script_checkbox(){

	global $post_type;
	if ($post_type == 'wp_block') {
		wp_enqueue_script( 'fetch-polyfill', plugins_url().'/vk-blocks-pro/plugin/menu/fetch.umd.js' );
		wp_enqueue_script( 'ajax_script_checkbox', plugins_url().'/vk-blocks-pro/plugin/menu/helper_checkbox.js',array('fetch-polyfill') );
	}
}
add_action( 'admin_print_scripts-edit.php', 'enqueue_ajax_script_checkbox' );

