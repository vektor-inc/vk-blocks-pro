<?php
/**
 * Class DynamicTextTest
 *
 * @package Vk_Blocks_Pro
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * テスト用のブロックオブジェクト
 */
class BlockObject {
	public $context = array();
	public function __construct( $post_id ) {
		$this->context['postId'] = $post_id;
	}
}

/**
 * DynamicText block test case.
 */
class DynamicText extends VK_UnitTestCase {

	/**
	 * Test Block
	 *
	 * @return void
	 */
	public function test_vk_blocks_dynamic_text_render_callback() {

		// Create test page
		$post            = array(
			'post_title'  => 'parent_post',
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_parent' => '',
		);
		$data['post_id'] = wp_insert_post( $post );

		add_post_meta( $data['post_id'], 'test_cf_text', 'Test CF Text' );
		add_post_meta( $data['post_id'], 'test_cf_url', 'https://vektor-inc.co.jp' );

		$post                     = array(
			'post_title'   => 'ancestor_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$data['ancestor_page_id'] = wp_insert_post( $post );

		$post                   = array(
			'post_title'  => 'parent_page',
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_parent' => $data['ancestor_page_id'],
		);
		$data['parent_page_id'] = wp_insert_post( $post );

		$post                  = array(
			'post_title'  => 'child_page',
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_parent' => $data['parent_page_id'],
		);
		$data['child_page_id'] = wp_insert_post( $post );

		$test_data = array(
			// 投稿ページの投稿タイプ名 + divタグ
			array(
				'attributes' => array(
					'displayElement'           => 'post-type',
					'tagName'                  => 'div',
					'ancestorPageHiddenOption' => true,
				),
				'target_url' => get_permalink( $data['post_id'] ),
				'correct'    => '<div class="vk_dynamicText wp-block-vk-blocks-dynamic-text">Posts</div>',
			),
			// 固定ページの投稿タイプ名
			array(
				'attributes' => array(
					'displayElement'           => 'post-type',
					'tagName'                  => 'h1',
					'ancestorPageHiddenOption' => true,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<h1 class="vk_dynamicText wp-block-vk-blocks-dynamic-text">Pages</h1>',
			),
			// 親ページが無いときは何も返さない
			array(
				'attributes' => array(
					'displayElement'           => 'ancestor-page',
					'tagName'                  => 'h2',
					'ancestorPageHiddenOption' => true,
				),
				'target_url' => get_permalink( $data['ancestor_page_id'] ),
				'correct'    => null,
			),
			// 親ページのタイトル
			array(
				'attributes' => array(
					'displayElement'           => 'ancestor-page',
					'tagName'                  => 'h3',
					'ancestorPageHiddenOption' => false,
				),
				'target_url' => get_permalink( $data['parent_page_id'] ),
				'correct'    => '<h3 class="vk_dynamicText wp-block-vk-blocks-dynamic-text">ancestor_page</h3>',
			),
			// 親ページのタイトル（先祖ページ）
			array(
				'attributes' => array(
					'displayElement'           => 'ancestor-page',
					'tagName'                  => 'span',
					'ancestorPageHiddenOption' => true,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text">ancestor_page</span>',
			),
			// 親ページが無いときは何も返さない
			array(
				'attributes' => array(
					'displayElement'           => 'parent-page',
					'tagName'                  => 'h2',
					'parentPageHiddenOption' => true,
				),
				'target_url' => get_permalink( $data['ancestor_page_id'] ),
				'correct'    => null,
			),
			// 親ページのタイトル
			array(
				'attributes' => array(
					'displayElement'           => 'parent-page',
					'tagName'                  => 'h3',
					'parentPageHiddenOption' => false,
				),
				'target_url' => get_permalink( $data['parent_page_id'] ),
				'correct'    => '<h3 class="vk_dynamicText wp-block-vk-blocks-dynamic-text">ancestor_page</h3>',
			),
			// ユーザー名
			array(
				'attributes' => array(
					'displayElement'           => 'user-name',
					'tagName'                  => 'div',
					'userNamePrefixText' => 'こんにちは',
					'userNameSuffixText' => 'さん',
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text">parent_page</span>',
			),
		
			// カスタムフィールド - テキスト
			array(
				'attributes' => array(
					'displayElement'  => 'custom-field',
					'tagName'         => 'span',
					'customFieldName' => 'test_cf_text',
					'fieldType'       => 'text',
				),
				'target_url' => get_permalink( $data['post_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text">Test CF Text</span>',
			),
			// カスタムフィールド - URL
			array(
				'attributes' => array(
					'displayElement'  => 'custom-field',
					'tagName'         => 'span',
					'customFieldName' => 'test_cf_url',
					'fieldType'       => 'url',
					'isLinkSet'       => true,
				),
				'target_url' => get_permalink( $data['post_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text"><a href="https://vektor-inc.co.jp">https://vektor-inc.co.jp</a></span>',
			),
			// カスタムフィールド - URL blank
			array(
				'attributes' => array(
					'displayElement'  => 'custom-field',
					'tagName'         => 'span',
					'customFieldName' => 'test_cf_url',
					'fieldType'       => 'url',
					'isLinkSet'       => true,
					'isLinkTarget'    => true,
				),
				'target_url' => get_permalink( $data['post_id'] ),
				'correct'    => '<span class="vk_dynamicText wp-block-vk-blocks-dynamic-text"><a href="https://vektor-inc.co.jp" target="_blank" rel="noreferrer noopener">https://vektor-inc.co.jp</a></span>',
			),
		);

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_dynamic_text_render_callback()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		WP_Block_Supports::init();

		// カスタムフィールドの値を取得できるようにするために
		// vk_blocks_dynamic_text_render_callback() の引数として渡津 $block オブジェクトを作成する。
		$block = new BlockObject( $data['post_id'] );

		foreach ( $test_data as $value ) {

			// Move to test page.
			$this->go_to( $value['target_url'] );
			WP_Block_Supports::$block_to_render = array(
				'blockName' => 'vk-blocks/dynamic-text',
				'attrs'     => $value['attributes'],
			);
			$return                             = vk_blocks_dynamic_text_render_callback( $value['attributes'], $content = '', $block );
			$correct                            = $value['correct'];

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
