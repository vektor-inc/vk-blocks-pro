<?php
/**
 * VK Blocks Pro Functions
 *
 * @package VK Blocks
 */

// Pro 用の管理画面を読み込み.
require_once __DIR__ . '/admin-pro/admin-pro.php';
require_once __DIR__ . '/extensions/common/custom-css-extension.php';
require_once __DIR__ . '/extensions/common/custom-format.php';
require_once __DIR__ . '/extensions/common/custom-block-style.php';
require_once __DIR__ . '/blocks/class-vk-blocks-blog-card.php';
VK_Blocks_Blog_Card::init();
require_once __DIR__ . '/App/RestAPI/BlockMeta/class-vk-blocks-pro-entrypoint.php';
new Vk_Blocks_Pro_EntryPoint();

/**
 * Pro 専用のスクリプトの読み込み
 */
function vk_blocks_pro_load_scripts() {

	// has_blockで、ウィジェッ内のブロックが判別できないので、常時読み込みに変更。
	// TODO: 高速化のために、各ウィジェットの有効化を is_active_widget で判定し読み込み切り替える実装の余地あり。
	if ( VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		return;
	}

	// Accordion Block
	wp_enqueue_script( 'vk-blocks-accordion', VK_BLOCKS_DIR_URL . 'build/vk-accordion.min.js', array(), VK_BLOCKS_VERSION, true );

	// Faq Block
	wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_DIR_URL . 'build/vk-faq2.min.js', array(), VK_BLOCKS_VERSION, true );

	// Animation Block
	wp_enqueue_script( 'vk-blocks-animation', VK_BLOCKS_DIR_URL . 'build/vk-animation.min.js', array(), VK_BLOCKS_VERSION, true );

	// Fixed Display Block
	wp_enqueue_script( 'vk-blocks-fixed-display', VK_BLOCKS_DIR_URL . 'build/vk-fixed-display.min.js', array(), VK_BLOCKS_VERSION, true );

	// Tab Block
	wp_enqueue_script( 'vk-blocks-tab', VK_BLOCKS_DIR_URL . 'build/vk-tab.min.js', array(), VK_BLOCKS_VERSION, true );

	// Tab of Contents Block
	wp_enqueue_script( 'vk-blocks-table-of-contents-new', VK_BLOCKS_DIR_URL . 'build/vk-table-of-contents-new.min.js', array(), VK_BLOCKS_VERSION, true );

}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );
