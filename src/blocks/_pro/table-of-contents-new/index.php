<?php
/**
 * Registers the `vk-blocks/table-of-contents-new` block.
 *
 * @package vk-blocks
 */

/**
 * Register table of contents new block.
 *
 * @return void
 */
function vk_blocks_register_block_table_of_contents_new() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/table-of-contents-new',
			VK_BLOCKS_DIR_URL . 'build/_pro/table-of-contents-new/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/table-of-contents-new-script',
			VK_BLOCKS_DIR_URL . 'build/vk-table-of-contents-new.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);

		// フロントエンド用の設定を渡す
		$options    = get_option( 'vk_blocks_options', array() );
		$toc_levels = isset( $options['toc_heading_levels'] ) ? $options['toc_heading_levels'] : array( 'h2', 'h3', 'h4', 'h5', 'h6' );

		wp_localize_script(
			'vk-blocks/table-of-contents-new-script',
			'vkBlocksTocSettings',
			array(
				'allowedHeadingLevels' => array_map(
					function ( $level ) {
						return intval( str_replace( 'h', '', $level ) );
					},
					$toc_levels
				),
			)
		);
	}

	// クラシックテーマ & 6.5 環境で $assets = array() のように空にしないと重複登録になるため
	// ここで初期化しておく
	$assets = array();
	// Attend to load separate assets.
	// 分割読み込みが有効な場合のみ、分割読み込み用のスクリプトを登録する
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style'         => 'vk-blocks/table-of-contents-new',
			'script'        => 'vk-blocks/table-of-contents-new-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		);
	}

	register_block_type(
		__DIR__,
		$assets
	);

	if ( ! is_admin() ) {
		wp_enqueue_script( 'vk-blocks/table-of-contents-new-script' );
	}
}
add_action( 'init', 'vk_blocks_register_block_table_of_contents_new', 99 );
