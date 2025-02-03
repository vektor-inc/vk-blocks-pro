<?php
/**
 * Class VK_Blocks_Check_Using_VK_Page_Content_Block Test
 *
 * @package VK Blocks
 */

class Test_VK_Blocks_Check_Using_VK_Page_Content_Block extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();

		// テスト用の固定ページを作成
		$this->public_page_id_A = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Public Page A',
				'post_content' => 'This is a public page A.',
			)
		);

		$this->private_page_id_B = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'private',
				'post_title'   => 'Private Page B',
				'post_content' => 'This is a private page B.',
			)
		);

		$this->draft_page_id_C = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'draft',
				'post_title'   => 'Draft Page C',
				'post_content' => 'This is a draft page C.',
			)
		);

		// 参照用の固定ページを作成
		$this->no_using_page_id = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'No Using',
				'post_content' => 'This page does not use any content blocks.',
			)
		);

		$this->using_A_page_id = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Using A',
				'post_content' => '<!-- wp:vk-blocks/page-content {"TargetPost":' . $this->public_page_id_A . '} -->',
			)
		);

		$this->using_B_page_id = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Using B',
				'post_content' => '<!-- wp:vk-blocks/page-content {"TargetPost":' . $this->private_page_id_B . '} -->',
			)
		);

		$this->using_A_and_B_page_id = $this->factory->post->create(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => 'Using A and B',
				'post_content' => '<!-- wp:vk-blocks/page-content {"TargetPost":' . $this->public_page_id_A . '} -->' .
								'<!-- wp:vk-blocks/page-content {"TargetPost":' . $this->private_page_id_B . '} -->',
			)
		);
	}

	public function tearDown(): void {
		// テストで作成した投稿を削除
		wp_delete_post( $this->public_page_id_A, true );
		wp_delete_post( $this->private_page_id_B, true );
		wp_delete_post( $this->draft_page_id_C, true );
		wp_delete_post( $this->no_using_page_id, true );
		wp_delete_post( $this->using_A_page_id, true );
		wp_delete_post( $this->using_B_page_id, true );
		wp_delete_post( $this->using_A_and_B_page_id, true );

		// チェック済みフラグが立っていたら削除
		$check_using_vk_page_content_block = new VK_Blocks_Check_Using_VK_Page_Content_Block();
		$check_using_vk_page_content_block->delete_checked_flag();

		parent::tearDown();
	}

	public function test_get_post_list_using_page_content_block() {

		// print PHP_EOL;
		// print '------------------------------------' . PHP_EOL;
		// print 'get_post_list_using_page_content_block()' . PHP_EOL;
		// print '------------------------------------' . PHP_EOL;
		$check_using_vk_page_content_block = new VK_Blocks_Check_Using_VK_Page_Content_Block();

		$tests = array(
			array(
				'test_name'   => 'unpublicの場合',
				'post_status' => 'unpublic',
				'expected'    => '<ul><li><a href="' . esc_url( get_edit_post_link( $this->using_B_page_id ) ) . '" target="_blank">Using B</a></li><li><a href="' . esc_url( get_edit_post_link( $this->using_A_and_B_page_id ) ) . '" target="_blank">Using A and B</a></li></ul>',
			),
			array(
				'test_name'   => 'allの場合',
				'post_status' => 'all',
				'expected'    => '<ul><li><a href="' . esc_url( get_edit_post_link( $this->using_A_page_id ) ) . '" target="_blank">Using A</a></li>' .
								'<li><a href="' . esc_url( get_edit_post_link( $this->using_B_page_id ) ) . '" target="_blank">Using B</a></li><li><a href="' . esc_url( get_edit_post_link( $this->using_A_and_B_page_id ) ) . '" target="_blank">Using A and B</a></li></ul>',
			),

		);

		foreach ( $tests as $test ) {
			$actual = $check_using_vk_page_content_block->get_post_list_using_page_content_block( $test['post_status'] );
			$this->assertEquals( $test['expected'], $actual, $test['test_name'] );
		}

		// 非公開の投稿を参照している固定ページを使用している投稿を削除
		// Delete posts that use pages that refer to unpublished posts
		wp_delete_post( $this->using_B_page_id, true );
		wp_delete_post( $this->using_A_and_B_page_id, true );

		// 該当投稿がない場合のチェック（チェック済みフラグが立つはず）
		// Check when there is no corresponding post (the checked flag should be set)
		$actual = $check_using_vk_page_content_block->get_post_list_using_page_content_block( 'unpublic' );
		$this->assertEquals( false, $actual, 'no list' );

		// チェック済みフラグが立ってるかどうか
		// Is checked flag
		$actual = $check_using_vk_page_content_block->is_checked_flag();
		$this->assertEquals( true, $actual, 'is_checked_flag' );
	}
}
