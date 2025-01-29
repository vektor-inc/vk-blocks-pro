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
		add_action( 'admin_init', array( $this, 'check_for_alert' ) );
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
		$posts_per_page = 100;

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
							// 参照先の投稿ステータスに関係なく固定ページ本文ブロックが使われている記事全てをリストに含める場合
							// Include all posts using the page content block regardless of the status of the referenced post.
							if ( 'all' === $post_status ) {
								$include_post = true;
								break;
							} else {
								$target_post = get_post( $target_post_id );
								if ( 'unpublic' === $post_status && 'publish' !== $target_post->post_status ) {
									$include_post = true;
									break; // 一つでも参照先が非公開のものがあればリストに含める
								}
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

		if ( empty( $output ) ) {
			// 該当の投稿がなかったらチェック済みフラグを立てる
			// If there are no posts that meet the criteria, set the checked flag.
			$options                                 = get_option( 'vk_blocks_options' );
			$options['checked-page-content-private'] = true;
			update_option( 'vk_blocks_options', $options );
			return;
		} else {
			return '<ul>' . $output . '</ul>';
		}
	}

	/**
	 * Is run check for alert.
	 */
	public function check_for_alert() {
		// ダッシュボードのトップページ以外は処理しない
		// Don't run on pages other than the dashboard top page.
		if ( ! is_admin() || 'index.php' !== $GLOBALS['pagenow'] ) {
			return;
		}

		// 既にチェック済みフラグが立ってる場合は何もしない
		// If the checked flag is already set, do nothing.

		// * 一度チェック済みになったら後から手動で非公開投稿を参照した固定ページブロックを配置した場合、アラートが表示されない欠点があるが、そもそも新規で配置する際は警告が表示されるので問題ないと判断
		// * Once checked, there is a drawback that an alert will not be displayed if a page block referencing a private post is placed manually later, but it is not a problem because a warning will be displayed when placing a new one.
		if ( $this->is_checked_flag() ) {
			return;
		}

		add_action( 'admin_notices', array( $this, 'display_alert' ) );
	}

	/**
	 * 非公開のコンテンツを参照する固定ページ本文ブロックが使われているページのリストを表示するメソッド.
	 * Displays a list of pages that use the page content block to reference non-public content.
	 */
	public function display_alert() {
		$list = $this->get_post_list_using_page_content_block( 'unpublic' );

		if ( $list ) {
			$alert  = '<div class="notice notice-warning is-dismissible">';
			$alert .= '<p>' . esc_html__( 'The following posts contain Page Content Blocks referencing non-public pages:', 'vk-blocks-pro' ) . '</p>';
			$alert .= wp_kses_post( $list );
			$alert .= '<p>' . wp_kses_post( vk_blocks_get_page_content_private_alert() ) . '</p>';
			$alert .= '</div>';
			echo wp_kses_post( $alert );
		}
	}

	/**
	 * 'checked-page-content-private' フラグが設定されているか確認するメソッド
	 * Checks if the 'checked-page-content-private' flag is set to true in vk_blocks_options.
	 *
	 * @return bool
	 */
	public function is_checked_flag() {
		$options = get_option( 'vk_blocks_options' );
		return ! empty( $options['checked-page-content-private'] ) && true === $options['checked-page-content-private'];
	}

	/**
	 * 'checked-page-content-private' フラグを削除するメソッド
	 * Deletes the 'checked-page-content-private' flag from vk_blocks_options.
	 */
	public function delete_checked_flag() {
		$options = get_option( 'vk_blocks_options' );
		if ( isset( $options['checked-page-content-private'] ) ) {
			unset( $options['checked-page-content-private'] );
			update_option( 'vk_blocks_options', $options );
		}
	}
}
