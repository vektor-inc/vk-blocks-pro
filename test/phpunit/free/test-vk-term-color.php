<?php
/**
 * Class PostListBlockTest
 *
 * @package Vk_Blocks_Pro
 */
use VektorInc\VK_Term_Color\VkTermColor;
/**
 * Post List block test case.
 */
class VkTermColorTest extends WP_UnitTestCase {

	/**
	 * PostListブロックを挿入する投稿
	 *
	 * @var int|\WP_Error $page_id
	 */
	public $post_id;

	/**
	 * 設定する色
	 */
	public $term_color = "#123456";
	

	/**
	 * 各テストケースの実行直前に呼ばれる
	 */
	public function setUp(): void {
		parent::setUp();

		$catarr                           = array(
			'cat_name' => 'parent_category',
		);
		$test_posts['parent_category_id'] = wp_insert_category( $catarr );

		$post          = array(
			'post_title'   => 'Post Title',
			'post_content' => '<!-- wp:paragraph --><p>This is my post</p><!-- /wp:paragraph -->',
			'post_status'  => 'publish',
			'post_category' => array( $test_posts['parent_category_id'] ),
		);
		$this->post_id = wp_insert_post( $post );
		add_term_meta( $test_posts['parent_category_id'], 'term_color', $this->term_color );

	}

	/**
	 * Tear down each test method.
	 */
	public function tearDown(): void {
		parent::tearDown();
	

		wp_delete_post( $this->post_id, true );
		$this->post_id = 0;
	}

	/**
	 * A single example test.
	 */
	public function test_get_single_term_with_color() {
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'VkTermColor::test_get_single_term_with_color' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		$post = get_post( $this->post_id );

		$result = VkTermColor::get_single_term_with_color( $post );
		$expected = '<span style="color:#fff;background-color:' . $this->term_color . '">parent_category</span>';
		print 'correct ::::' . PHP_EOL;
		var_dump( $expected );
		print 'return  ::::' . PHP_EOL;
		var_dump( $result );
		$this->assertEquals( $expected, $result );

		$result = VkTermColor::get_single_term_with_color( $post, array( 'class' => 'vk_post_imgOuter_singleTermLabel', 'link' => true ) );
		$expected = '<a class="vk_post_imgOuter_singleTermLabel" style="color:#fff;background-color:' . $this->term_color . '" href="http://localhost:8889/?cat=6">parent_category</a>';
		print 'correct ::::' . PHP_EOL;
		var_dump( $expected );
		print 'return  ::::' . PHP_EOL;
		var_dump( $result );		
		$this->assertEquals( $expected, $result );

		if ( class_exists('Vk_term_color') ) {
			$result = Vk_term_color::get_single_term_with_color( $post );
			$expected = '<span style="color:#fff;background-color:' . $this->term_color . '">parent_category</span>';
			print 'correct ::::' . PHP_EOL;
			var_dump( $expected );
			print 'return  ::::' . PHP_EOL;
			var_dump( $result );			
			$this->assertEquals( $expected, $result );
	
			$result = Vk_term_color::get_single_term_with_color( $post, array( 'class' => 'vk_post_imgOuter_singleTermLabel', 'link' => true ) );
			$expected = '<a class="vk_post_imgOuter_singleTermLabel" style="color:#fff;background-color:' . $this->term_color . '" href="http://localhost:8889/?cat=6">parent_category</a>';
			print 'correct ::::' . PHP_EOL;
			var_dump( $expected );
			print 'return  ::::' . PHP_EOL;
			var_dump( $result );			
			$this->assertEquals( $expected, $result );

		}


	}

	/**
	 * Add user and set the user as current user.
	 *
	 * @param  string $role administrator, editor, author, contributor ...
	 * @return void
	 */
	public function set_current_user( $role ) {
		$user = $this->factory()->user->create_and_get(
			array(
				'role' => $role,
			)
		);

		/*
			* Set $user as current user
			*/
		wp_set_current_user( $user->ID, $user->user_login );
	}

};
