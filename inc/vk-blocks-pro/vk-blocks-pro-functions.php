<?php
/**
 * VK Blocks Pro Functions
 *
 * @package VK Blocks
 */

// Pro 用の管理画面を読み込み.
require_once dirname( __FILE__ ) . '/admin-pro/admin-pro.php';

/**
 * VK Blocks Pro Get Options
 *
 * デフォルトのオプション
 *
 * @param array $defaults defaults.
 */
function vk_blocks_pro_get_options( $defaults ) {
	$defaults = array(
		'display_vk_block_template' => 'display',
		'new_faq_accordion'         => 'disable',
	);
	return $defaults;
}
add_filter( 'vk_blocks_default_options', 'vk_blocks_pro_get_options' );

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

	// Slider Block
	global $vk_swiper_url;
	wp_enqueue_style( 'vk-swiper-style', $vk_swiper_url . 'assets/css/swiper.min.css', array(), SWIPER_VERSION );

	wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_DIR_URL . 'build/vk-slider.min.js', array( 'vk-swiper-script' ), VK_BLOCKS_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'vk_blocks_pro_load_scripts' );

/**
 * Queryブロックで作ったqueryからWP_Query形式に整形する.
 *
 * @param mixed $block Block context.
 * @param mixed $page Page Number.
 * @return mixed
 */
function vk_blocks_build_query_vars_from_query_block( $block, $page ) {
	$query = array(
		'post_type'    => 'post',
		'order'        => 'DESC',
		'orderby'      => 'date',
		'post__not_in' => array(),
	);

	if ( isset( $block->context['query'] ) ) {
		if ( ! empty( $block->context['query']['postType'] ) ) {
			$post_type_param = $block->context['query']['postType'];
			if ( is_post_type_viewable( $post_type_param ) ) {
				$query['post_type'] = $post_type_param;
			}
		}
		if ( isset( $block->context['query']['sticky'] ) && ! empty( $block->context['query']['sticky'] ) ) {
			$sticky = get_option( 'sticky_posts' );
			if ( 'only' === $block->context['query']['sticky'] ) {
				$query['post__in'] = $sticky;
			} else {
				$query['post__not_in'] = array_merge( $query['post__not_in'], $sticky );
			}
		}
		if ( ! empty( $block->context['query']['exclude'] ) ) {
			$excluded_post_ids     = array_map( 'intval', $block->context['query']['exclude'] );
			$excluded_post_ids     = array_filter( $excluded_post_ids );
			$query['post__not_in'] = array_merge( $query['post__not_in'], $excluded_post_ids );
		}
		if (
			isset( $block->context['query']['perPage'] ) &&
			is_numeric( $block->context['query']['perPage'] )
		) {
			$per_page = absint( $block->context['query']['perPage'] );
			$offset   = 0;

			if (
				isset( $block->context['query']['offset'] ) &&
				is_numeric( $block->context['query']['offset'] )
			) {
				$offset = absint( $block->context['query']['offset'] );
			}

			$query['offset']         = ( $per_page * ( $page - 1 ) ) + $offset;
			$query['posts_per_page'] = $per_page;
		}
		if ( ! empty( $block->context['query']['categoryIds'] ) ) {
			$term_ids              = array_map( 'intval', $block->context['query']['categoryIds'] );
			$term_ids              = array_filter( $term_ids );
			$query['category__in'] = $term_ids;
		}
		if ( ! empty( $block->context['query']['tagIds'] ) ) {
			$term_ids         = array_map( 'intval', $block->context['query']['tagIds'] );
			$term_ids         = array_filter( $term_ids );
			$query['tag__in'] = $term_ids;
		}
		if (
			isset( $block->context['query']['order'] ) &&
			in_array( strtoupper( $block->context['query']['order'] ), array( 'ASC', 'DESC' ), true )
		) {
			$query['order'] = strtoupper( $block->context['query']['order'] );
		}
		if ( isset( $block->context['query']['orderBy'] ) ) {
			$query['orderby'] = $block->context['query']['orderBy'];
		}
		if (
			isset( $block->context['query']['author'] ) &&
			(int) $block->context['query']['author'] > 0
		) {
			$query['author'] = (int) $block->context['query']['author'];
		}
		if ( ! empty( $block->context['query']['search'] ) ) {
			$query['s'] = $block->context['query']['search'];
		}
		if ( ! empty( $block->context['query']['postParent'] ) ) {
			$query['post_parent'] = $block->context['query']['postParent'];
		}
	}

	/**
	 * Filters the WP_Query args array from the `Query` block properties.
	 * https://github.com/WordPress/gutenberg/issues/36504
	 *
	 * @since 6.0.0
	 *
	 * @param string[] $query WP_Query args array.
	 * @param WP_Block $block Block instance.
	 * @param int      $page  Current query's page.
	 */
	return apply_filters( 'vk_blocks_query_vars_from_query_block', $query, $block, $page );
}
