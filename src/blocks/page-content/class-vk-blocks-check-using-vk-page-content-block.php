<?php
/**
 * VK_Blocks_Check_Using_VK_Page_Content_Block Class
 *
 * This class checks for the use of Page Content Blocks that reference non-public pages
 * and displays an alert in the WordPress admin dashboard if any are found.
 *
 * @package VK Blocks
 */

/**
 * VK_Blocks_Check_Using_VK_Page_Content_Block class.
 */
class VK_Blocks_Check_Using_VK_Page_Content_Block {

	/**
	 * Constructor.
	 * Initializes the class and sets up the admin notice action.
	 */
	public function __construct() {
		// ダッシュボードでアラートを表示
		add_action( 'admin_notices', array( $this, 'display_alert' ) );
	}

	/**
	 * 固定ページ本文ブロックが使われている記事リストを返す.
	 *
	 * @param string $post_status The post status to filter by: 'all' or 'unpublic'.
	 * @return string The list of posts using the page content block.
	 */
	public function get_post_list_using_page_content_block( $post_status ) {
		$output         = '';
		$paged          = 1;
		$posts_per_page = 100; // 一度に処理する投稿数

		do {
			$args = array(
				'post_type'      => 'any',
				'post_status'    => 'any',
				's'              => '<!-- wp:vk-blocks/page-content',
				'posts_per_page' => $posts_per_page,
				'paged'          => $paged,
			);

			$query = new WP_Query( $args );

			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$content = get_the_content();
					preg_match_all( '/<!-- wp:vk-blocks\/page-content {"TargetPost":(\d+)} \/-->/', $content, $matches );

					$include_post = false; // この投稿をリストに含めるかどうか

					if ( ! empty( $matches[1] ) ) {
						foreach ( $matches[1] as $target_post_id ) {
							$target_post = get_post( $target_post_id );

							if ( 'unpublic' === $post_status && 'publish' !== $target_post->post_status ) {
								$include_post = true;
								break; // 一つでも非公開のものがあればリストに含める
							}
						}
					}

					if ( $include_post ) {
						$output .= '<li><a href="' . esc_url( get_edit_post_link() ) . '" target="_blank">' . esc_html( get_the_title() ) . '</a></li>';
					}
				}
				wp_reset_postdata();
			}

			++$paged;
		} while ( $query->have_posts() );

		return $output ? '<ul>' . $output . '</ul>' : '';
	}

	/**
	 * 非公開のコンテンツを参照する固定ページ本文ブロックが使われているページのリストを表示するメソッド.
	 */
	public function display_alert() {
		$list = $this->get_post_list_using_page_content_block( 'unpublic' );

		if ( $list ) {
			$alert = '<div class="notice notice-warning is-dismissible">';
			$alert .= '<p>' . __( 'The following posts contain Page Content Blocks referencing non-public pages:', 'vk-blocks-pro' ) . '</p>';
			$alert .=  $list;
			$alert .= '<p>' . vk_blocks_get_page_content_private_alert() . '</p>';
			$alert .= '</div>';
			echo wp_kses_post( $alert );
		}
	}
}
