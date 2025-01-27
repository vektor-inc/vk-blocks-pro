<?php

class checkUsingVKPageContentBlock {

    public function __construct() {
        // ダッシュボードでアラートを表示
        add_action( 'admin_init', array( $this, 'display_alert' ) );
    }

    /**
     * 固定ページ本文ブロックが使われている記事リストを返す
     *
     * @param string $post_status : all / unpublic
     * @return string
     */
    public function get_post_list_using_page_content_block( $post_status ) {
        $args = array(
            'post_type'   => 'any',
            'post_status' => 'any',
            's'           => '<!-- wp:vk-blocks/page-content',
        );

        $query = new WP_Query( $args );
        $output = '';

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                $content = get_the_content();
                preg_match_all( '/<!-- wp:vk-blocks\/page-content {"TargetPost":(\d+)} \/-->/', $content, $matches );

                if ( ! empty( $matches[1] ) ) {
                    foreach ( $matches[1] as $target_post_id ) {
                        $target_post = get_post( $target_post_id );

                        if ( 'unpublic' === $post_status && 'publish' === $target_post->post_status ) {
                            continue;
                        }

                        $output .= '<li><a href="' . get_edit_post_link() . '" target="_blank">' . get_the_title() . '</a></li>';
                    }
                }
            }
            wp_reset_postdata();
        }

        return $output ? '<ul>' . $output . '</ul>' : '';
    }

    /**
     * 非公開のコンテンツを参照する固定ページ本文ブロックが使われているページのリストを表示するメソッド
     */
    public function display_alert() {
        $list = $this->get_post_list_using_page_content_block( 'unpublic' );

        if ( $list ) {
            add_action( 'admin_notices', function() use ( $list ) {
                echo '<div class="notice notice-warning is-dismissible"><p>' . __( 'The following posts contain Page Content Blocks referencing non-public pages:', 'vk-blocks-pro' ) . '</p>' . $list . '</div>';
            });
        }
    }
}