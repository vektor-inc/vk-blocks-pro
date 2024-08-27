<?php
/**
 * Class AncestorPageListTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

class AncestorPageListTest extends VK_UnitTestCase {

	/**
	 * Test Title
	 *
	 * @return void
	 */
	public function test_vk_blocks_get_ancestor_page_list_title() {

		// Create test page .
		$post                     = array(
			'post_title'   => 'ancestor_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$data['ancestor_page_id'] = wp_insert_post( $post );

		$post                   = array(
			'post_title'   => 'parent_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
			'post_parent'  => $data['ancestor_page_id'],
		);
		$data['parent_page_id'] = wp_insert_post( $post );

		$post = array(
			'post_title'   => 'child_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
			'post_parent'  => $data['parent_page_id'],

		);
		$data['child_page_id'] = wp_insert_post( $post );

		$test_data = array(
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => false,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '',
			),
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => false,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<h3 class="vk_ancestorPageList_title">ancestor_page</h3>',
			),
			array(
				'attributes' => array(
					'ancestorTitleDisplay'   => true,
					'ancestorTitleTagName'   => 'h3',
					'ancestorTitleClassName' => 'test-class',
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<h3 class="vk_ancestorPageList_title test-class">ancestor_page</h3>',
			),
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => true,
				),
				'target_url' => get_permalink( $data['child_page_id'] ),
				'correct'    => '<h3 class="vk_ancestorPageList_title"><a href="' . get_permalink( $data['ancestor_page_id'] ) . '">ancestor_page</a></h3>',
			),
			// Not public page.
			// サイトエディター上でのテストだが、サイトエディターの中身が iframe で判別方法が不明のため、一般公開でないURLを target_url 指定している .
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => false,
				),
				'target_url' => admin_url() . '/site-editor.php?postType=wp_template',
				'correct'    => '<h3 class="vk_ancestorPageList_title">' . esc_html__( 'Ancestor Page Title', 'vk-blocks-pro' ) . '</h3>',
			),
		);
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_get_ancestor_page_list_title()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		foreach ( $test_data as $value ) {

			// Move to test page.
			$this->go_to( $value['target_url'] );

			$return  = vk_blocks_get_ancestor_page_list_title( $value['attributes'] );
			$correct = $value['correct'];

			print 'return  :' . wp_kses_post( $return );
			print PHP_EOL;
			print 'correct :' . wp_kses_post( $correct );
			print PHP_EOL;
			$this->assertSame( $correct, $return );

		}
		wp_delete_post( $data['ancestor_page_id'] );
		wp_delete_post( $data['parent_page_id'] );
		wp_delete_post( $data['child_page_id'] );
	}

	/**
	 * Test Block
	 *
	 * @return void
	 */
	public function test_vk_blocks_ancestor_page_list_render_callback() {
		
		// Create test page .
		$post                     = array(
			'post_title'   => 'no_child_page',
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_content' => 'content',
		);
		$data['no_child_page_id'] = wp_insert_post( $post );

		$test_data = array(
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'displayHasChildOnly'  => true,
				),
				'target_url' => get_permalink( $data['no_child_page_id'] ),
				'correct'    => null,
			),
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => false,
					'displayHasChildOnly'  => false,
				),
				'target_url' => get_permalink( $data['no_child_page_id'] ),
				'correct'    => '<aside class="vk_ancestorPageList wp-block-vk-blocks-ancestor-page-list"><h3 class="vk_ancestorPageList_title">no_child_page</h3></aside>',
			),
			array(
				'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => false,
					'displayHasChildOnly'  => false,
					'hiddenGrandChild'     => true,
				),
				'target_url' => get_permalink( $data['no_child_page_id'] ),
				'correct'    => '<aside class="vk_ancestorPageList vk_ancestorPageList-hiddenGrandChild-true wp-block-vk-blocks-ancestor-page-list"><h3 class="vk_ancestorPageList_title">no_child_page</h3></aside>',
			),
			// Not public page.
			// サイトエディター上でのテストだが、サイトエディターの中身が iframe で判別方法が不明のため、一般公開でないURLを target_url 指定している .
			array(
			'attributes' => array(
					'ancestorTitleDisplay' => true,
					'ancestorTitleTagName' => 'h3',
					'ancestorTitleLink'    => false,
					'displayHasChildOnly'  => false,
					'hiddenGrandChild'     => true,
				),
				'target_url' => admin_url() . '/site-editor.php?postType=wp_template',
				'correct'    => '<aside class="vk_ancestorPageList vk_ancestorPageList-hiddenGrandChild-true wp-block-vk-blocks-ancestor-page-list"><h3 class="vk_ancestorPageList_title">' . esc_html__( 'Ancestor Page Title', 'vk-blocks-pro' ) . '</h3><ul class="vk_ancestorPageList_list"><li class="page_item page-item-**"><a href="#">' . esc_html__( 'Dummy Text', 'vk-blocks-pro' ) . '</a></li><li class="page_item page-item-**"><a href="#">' . esc_html__( 'Dummy Text', 'vk-blocks-pro' ) . '</a></li></ul><div class="alert alert-warning">' . esc_html__( 'Because of the site editor have not child page that, the page list from ancestor is not displayed. Now displaying the dummy text list instead of the page list from ancestor.', 'vk-blocks-pro' ) . '<br />* ' . esc_html__( 'This message only display on the edit screen.', 'vk-blocks-pro' ) . '</div></aside>',
			),
		);

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_ancestor_page_list_render_callback()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

		WP_Block_Supports::init();

		foreach ( $test_data as $value ) {

			// Move to test page.
			$this->go_to( $value['target_url'] );
			WP_Block_Supports::$block_to_render =  array('blockName'=> 'vk-blocks/ancestor-page-list', 'attrs' => $value['attributes'] );			
			$return  = vk_blocks_ancestor_page_list_render_callback( $value['attributes'] );
			$correct = $value['correct'];

			print 'return  :' . $return;
			print PHP_EOL;
			print 'correct :' . $correct;
			print PHP_EOL;
			$this->assertSame( $correct, $return );

		}
		wp_delete_post( $data['no_child_page_id'] );
	}
}
