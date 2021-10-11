<?php
/**
 * Load block files functions
 *
 * @package vektor-inc/vk-blocks
 */

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
 * VK Blocks Assets
 */
function vk_blocks_registor_blocks_assets() {
	$asset_file = include plugin_dir_path( __FILE__ ) . '/build/block-build.asset.php';

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
}
add_action( 'init', 'vk_blocks_registor_blocks_assets', 10 );


/**
 * VK Blocks register_block_type filter
 * cssを分割しない場合はregister_block_typeで登録したscriptやstyleを読み込ませない
 * add_filter('vk_blocks_should_load_separate_assets', '__return_true'); にするとブロックごとのcssを読み込む
 *
 *  @param array $args Array of arguments for registering a block type.
 *  @return array Return filter style, script, editor_style and editor_script added.
 */
function vk_blocks_register_block_type( $args ) {
	if ( apply_filters( 'vk_blocks_should_load_separate_assets', false ) ) {
		return $args;
	}

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

	foreach ( $arr_wp56 as $array ) {
		if ( ! empty( $args['style'] ) && 'vk-blocks/' . $array === $args['style'] ) {
			$args['style']  = null;
			$args['script'] = null;
		}
	}
	if ( file_exists( VK_BLOCKS_SRC_PATH . '/blocks/_pro/' . $array . '/index.php' ) ) {
		foreach ( $arr_wp56_pro as $array ) {
			if ( ! empty( $args['style'] ) && 'vk-blocks/' . $array === $args['style'] ) {
				$args['style']  = null;
				$args['script'] = null;
			}
		}
	}
	return $args;
}
add_filter( 'register_block_type_args', 'vk_blocks_register_block_type' );
