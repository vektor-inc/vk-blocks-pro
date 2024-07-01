<?php
/**
 * Class BlockStyleTest
 *
 * @package vk-blocks
 */

class BlockStyleTest extends VK_UnitTestCase {

	/**
	 * register_block_styleでスタイルが登録されているかテスト
	 * 登録なのでenqueuedではない
	 */
	public function test_register_block_style() {
		$test_data = array(
			array(
				'post' => array(
					'post_title'   => 'Post Title',
					'post_content' => '
					<!-- wp:heading {"className":"is-style-vk-heading-both_ends"} -->
					<h2 class="wp-block-heading is-style-vk-heading-both_ends">見出し</h2>
					<!-- /wp:heading -->
					<!-- wp:image {"sizeSlug":"large","className":"is-style-vk-image-photoFrame-tilt-right"} -->
					<figure class="wp-block-image size-large is-style-vk-image-photoFrame-tilt-right"><img src="https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png" alt=""/></figure>
					<!-- /wp:image -->
					',
					'post_status'  => 'publish',
				),
				'option'  => array(
					'load_separate_option'      => false,
					'disable_block_style_lists' => array(),
				),
				'correct' => array(
					'vk-blocks/core/heading' => false,
					'vk-blocks/core/list'    => false,
					'vk-blocks/core/table'   => false,
					'vk-blocks/core/image'   => false,
					'vk-blocks/core/group'   => false,
					'vk-blocks/core/columns' => false,
					'vk-blocks-build-css'    => true,
				),
			),
			// 分割読み込みのオン
			array(
				'post' => array(
					'post_title'   => 'Post Title',
					'post_content' => '
					<!-- wp:heading {"className":"is-style-vk-heading-both_ends"} -->
					<h2 class="wp-block-heading is-style-vk-heading-both_ends">見出し</h2>
					<!-- /wp:heading -->
					<!-- wp:image {"sizeSlug":"large","className":"is-style-vk-image-photoFrame-tilt-right"} -->
					<figure class="wp-block-image size-large is-style-vk-image-photoFrame-tilt-right"><img src="https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png" alt=""/></figure>
					<!-- /wp:image -->
					',
					'post_status'  => 'publish',
				),
				'option'  => array(
					'load_separate_option'      => true,
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/heading',
							'property_name'=> array(
								'vk-heading-plain',
								'vk-heading-background_fill_lightgray',
								'vk-heading-double_black',
								'vk-heading-double_bottomborder_black',
								'vk-heading-solid_black',
								'vk-heading-solid_bottomborder_black',
								'vk-heading-dotted_bottomborder_black',
								'vk-heading-both_ends',
								// 'vk-heading-brackets_black',
							),
						),
					),
				),
				'correct' => array(
					'vk-blocks/core/heading' => true,
					'vk-blocks/core/list'    => false,
					'vk-blocks/core/table'   => true,
					'vk-blocks/core/image'   => true,
					'vk-blocks/core/columns' => false,
					'vk-blocks/core/group'   => false,
				),
			),
			// 見出しのオプション値を全てオフにした時
			array(
				'post' => array(
					'post_title'   => 'Post Title',
					'post_content' => '
					<!-- wp:heading {"className":"is-style-vk-heading-both_ends"} -->
					<h2 class="wp-block-heading is-style-vk-heading-both_ends">見出し</h2>
					<!-- /wp:heading -->
					<!-- wp:image {"sizeSlug":"large","className":"is-style-vk-image-photoFrame-tilt-right"} -->
					<figure class="wp-block-image size-large is-style-vk-image-photoFrame-tilt-right"><img src="https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vws_logo_2020_og.png" alt=""/></figure>
					<!-- /wp:image -->
					',
					'post_status'  => 'publish',
				),
				'option'  => array(
					'load_separate_option'      => true,
					'disable_block_style_lists' => array(
						array(
							'block_name'=> 'core/heading',
							'property_name'=> array(
								'vk-heading-plain',
								'vk-heading-background_fill_lightgray',
								'vk-heading-double_black',
								'vk-heading-double_bottomborder_black',
								'vk-heading-solid_black',
								'vk-heading-solid_bottomborder_black',
								'vk-heading-dotted_bottomborder_black',
								'vk-heading-both_ends',
								'vk-heading-brackets_black',
							),
						),
					),
				),
				'correct' => array(
					'vk-blocks/core/heading' => true,
					'vk-blocks/core/list'    => false,
					'vk-blocks/core/table'   => true,
					'vk-blocks/core/image'   => true,
					'vk-blocks/core/group'   => false,
					'vk-blocks/core/columns' => false,
				),
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_register_block_style()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $test_value ) {
			$post_id = wp_insert_post( $test_value['post'] );
			if ( ! empty( $test_value['option'] ) ){
				update_option( 'vk_blocks_options', $test_value['option'] );
			}
			$this->go_to( get_permalink( $post_id ) );
			vk_blocks_register_block_style();

			// print 'wp_styles  :';
			// print PHP_EOL;
			// var_dump( wp_styles() );
			// print PHP_EOL;
			foreach ( $test_value['correct'] as $handle => $value ) {
				$this->assertSame( wp_style_is( $handle, 'registered' ), $value );
			}

            delete_option( 'vk_blocks_options' );
            wp_delete_post( $post_id, true );
        }
    }
}
