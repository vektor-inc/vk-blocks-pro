<?php
/**
 * Class DynamicTextTest
 *
 * @package Vk_Blocks_Pro
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * DynamicText block test case.
 */
class DynamicText extends WP_UnitTestCase {

	/**
	 * Test Block
	 *
	 * @return void
	 */
	public function test_vk_blocks_dynamic_text_render_callback(){

		// Create test page
		$post = array(
			'post_title'   => 'parent_post',
			'post_type'    => 'post',
			'post_status'  => 'publish',
			'post_parent' => '',
		);
		$data['post_id'] = wp_insert_post( $post );

		$post = array(
			'post_title'   => 'ancestor_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$data['ancestor_page_id'] = wp_insert_post( $post );

		$post = array(
			'post_title'   => 'parent_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_parent'  => $data['ancestor_page_id'],
		);
		$data['parent_page_id'] = wp_insert_post( $post );

		$post = array(
			'post_title'   => 'child_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_parent'  => $data['parent_page_id'],
		);
		$data['child_page_id'] = wp_insert_post( $post );

		$test_data = array(
			// 投稿ページの投稿タイプ名 + divタグ
			array(
				'attributes' => array(
					'displayElement' => 'post-type',
					'tagName'    => 'div',
					'ancestorPageHiddenOption'    => true,
				),
				'target_url' => get_permalink( $data['post_id'] ),
				'correct'    => '<div class="vk_dynamicText wp-block-vk-blocks-dynamic-text">Posts</div>',
			),
			// 固定ページの投稿タイプ名
			array(
				'attributes' => array(
					'displayElement' => 'post-type',
					'tagName'    => 'h1',
					'ancestorPageHiddenOption'    => true,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<h1 class="vk_dynamicText wp-block-vk-blocks-dynamic-text">Pages</h1>',
			),
			// 親ページが無いときは何も返さない
			array(
				'attributes' => array(
					'displayElement' => 'ancestor-page',
					'tagName'    => 'h2',
					'ancestorPageHiddenOption'    => true,
				),
				'target_url' => get_permalink( $data['ancestor_page_id'] ),
				'correct'    => null,
			),
			// 親ページのタイトル
			array(
				'attributes' => array(
					'displayElement' => 'ancestor-page',
					'tagName'    => 'h3',
					'ancestorPageHiddenOption'    => false,
				),
				'target_url' => get_permalink( $data['parent_page_id'] ),
				'correct'    => '<h3 class="vk_dynamicText wp-block-vk-blocks-dynamic-text">ancestor_page</h3>',
			),
			// 親ページのタイトル（先祖ページ）
			array(
				'attributes' => array(
					'displayElement' => 'ancestor-page',
					'tagName'    => 'span',
					'ancestorPageHiddenOption'    => true,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text">ancestor_page</span>',
			),
		);

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_dynamic_text_render_callback()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		WP_Block_Supports::init();

		foreach ( $test_data as $value ) {

			// Move to test page.
			$this->go_to( $value['target_url'] );
			WP_Block_Supports::$block_to_render =  array('blockName'=> 'vk-blocks/dynamic-text', 'attrs' => $value['attributes'] );
			$return  = vk_blocks_dynamic_text_render_callback( $value['attributes'], $content = '' , $block = '' );
			$correct = $value['correct'];

			print 'return  :' . $return;
			print PHP_EOL;
			print 'correct :' . $correct;
			print PHP_EOL;
			$this->assertSame( $correct, $return );

		}
		wp_delete_post( $data['post_id'] );
		wp_delete_post( $data['ancestor_page_id'] );
		wp_delete_post( $data['parent_page_id'] );
		wp_delete_post( $data['child_page_id'] );
	}
};
