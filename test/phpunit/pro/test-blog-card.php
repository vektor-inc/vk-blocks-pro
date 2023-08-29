<?php
/**
 * Class BlogCardTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * BlogCard block test case.
 */
class BlogCard extends WP_UnitTestCase {
	/**
	 * Post object.
	 *
	 * @var object
	 */
	protected static $post;

	/**
	 * Attachment id.
	 *
	 * @var int
	 */
	protected static $attachment_id;

	/**
	 * Setup method.
	 */
	public static function wpSetUpBeforeClass() {
		self::$post = self::factory()->post->create_and_get();
		$file       = DIR_TESTDATA . '/images/canola.jpg';

		self::$attachment_id = self::factory()->attachment->create_upload_object(
			$file,
			self::$post->ID,
			array(
				'post_mime_type' => 'image/jpeg',
			)
		);

		set_post_thumbnail( self::$post, self::$attachment_id );

		update_option( 'site_icon', self::$attachment_id );
	}

	/**
	 * Tear down method.
	 */
	public static function wpTearDownAfterClass() {
		wp_delete_post( self::$post->ID, true );
		wp_delete_post( self::$attachment_id, true );
	}

	public function test_vk_blocks_blog_card_render_callback(){

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_blog_card_render_callback' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print PHP_EOL;

		$tests = array(
			// 内部リンク
			array(
				'content' => '
				<!-- wp:vk-blocks/blog-card {"url":"'.get_permalink(self::$post->ID).'"} -->
				<div %s>
				<!-- wp:vk-blocks/blog-card-title /-->
				<!-- wp:vk-blocks/blog-card-featured-image /-->
				<!-- wp:vk-blocks/blog-card-excerpt /-->
				<!-- wp:vk-blocks/blog-card-site-logo /-->
				<!-- wp:vk-blocks/blog-card-site-title /-->
				</div>
				<!-- /wp:vk-blocks/blog-card -->',
				'expected' => '
				<div %s>
				<h5 class="wp-block-vk-blocks-blog-card-title"><a href="'.get_permalink(self::$post->ID).'" target="_self" >'.get_the_title( self::$post->ID ).'</a></h5>
				<figure class="wp-block-vk-blocks-blog-card-featured-image"><a href="'. get_permalink(self::$post->ID) .'" target="_self"  ><img src=\''. get_the_post_thumbnail_url( self::$post->ID, 'large' ) .'\' style="object-fit:cover;" /></a></figure>
				<div class="wp-block-vk-blocks-blog-card-excerpt"><p class="wp-block-vk-blocks-blog-card-excerpt__excerpt">'.get_the_excerpt( self::$post->ID ).'</p></div>
				<figure class="wp-block-vk-blocks-blog-card-site-logo"><a href="'.home_url().'" target="_self" ><img src=\''. get_site_icon_url( 32 ) .'\' /></a></figure>
				<p class="wp-block-vk-blocks-blog-card-site-title"><a href="'. home_url() .'" target="_self" >'. get_bloginfo( 'name' ) .'</a></p>
				</div>
				',
			),
			// 外部リンク
			array(
				'content' => '
				<!-- wp:vk-blocks/blog-card {"url":"https://vektor-inc.co.jp/"} -->
				<div %s>
				<!-- wp:vk-blocks/blog-card-title /-->
				<!-- wp:vk-blocks/blog-card-featured-image /-->
				<!-- wp:vk-blocks/blog-card-excerpt /-->
				<!-- wp:vk-blocks/blog-card-site-logo /-->
				<!-- wp:vk-blocks/blog-card-site-title /-->
				</div>
				<!-- /wp:vk-blocks/blog-card -->',
				'expected' => '
				<div %s>
				<h5 class="wp-block-vk-blocks-blog-card-title"><a href="https://vektor-inc.co.jp/" target="_self" >株式会社ベクトル | WordPressテーマ・プラグイン開発のクリエイティブカンパニー</a></h5>
				<figure class="wp-block-vk-blocks-blog-card-featured-image"><a href="https://vektor-inc.co.jp/" target="_self"  ><img src=\'https://www.vektor-inc.co.jp/wp-content/uploads/2020/04/vecktor-inc_ogp2020.png\' style="object-fit:cover;" /></a></figure>
				<div class="wp-block-vk-blocks-blog-card-excerpt"><p class="wp-block-vk-blocks-blog-card-excerpt__excerpt">WordPressテーマ・プラグイン開発のクリエイティブカンパニー</p></div>
				<figure class="wp-block-vk-blocks-blog-card-site-logo"><a href="https://vektor-inc.co.jp" target="_self" ><img src=\'https://www.vektor-inc.co.jp/wp-content/uploads/2020/03/cropped-icon2020-32x32.png\' /></a></figure>
				<p class="wp-block-vk-blocks-blog-card-site-title"><a href="https://vektor-inc.co.jp" target="_self" >株式会社ベクトル</a></p>
				</div>
				',
				'cannot_embed' => '<div %s>https://vektor-inc.co.jp/</div>',
			),
			// 外部リンク 埋め込み不可
			array(
				'content' => '
				<!-- wp:vk-blocks/blog-card {"url":"https://github.com/vektor-inc/vk-blocks-pro/blob/master/vk-blocks.php"} -->
				<div %s></div>
				<!-- /wp:vk-blocks/blog-card -->',
				'expected' => '<div %s>https://github.com/vektor-inc/vk-blocks-pro/blob/master/vk-blocks.php</div>',
			),
		);

		WP_Block_Supports::init();
		WP_Block_Supports::$block_to_render = array(
			'blockName' => 'vk-blocks/blog-card',
		);

		foreach ( $tests as $test ) {

			$get_block_wrapper_attributes = get_block_wrapper_attributes();
			$parse_blocks = parse_blocks(sprintf($test['content'], $get_block_wrapper_attributes));
			$render_block_content = render_block( $parse_blocks[1] );
			if ( is_wp_version_compatible( '6.3' ) ) {
				$get_block_wrapper_attributes = 'class="wp-block-vk-blocks-blog-card is-layout-flow wp-block-blog-card-is-layout-flow"';
			} else {
				$get_block_wrapper_attributes = 'class="wp-block-vk-blocks-blog-card"';
			}
			$correct = sprintf($test['expected'], $get_block_wrapper_attributes);
			if (!empty($test['cannot_embed'])) {
				$cannot_embed_correct = sprintf($test['cannot_embed'], $get_block_wrapper_attributes);
			}

			// print PHP_EOL;
			// print '$test[content][1]  :';
			// var_dump($test['content']);
			// print PHP_EOL;
			// print '$render_block_content  :' . $render_block_content;
			// print PHP_EOL;
			// print '$test[expected]  :' . $test['expected'];
			// print PHP_EOL;
			// print PHP_EOL;
			// print 'get_block_wrapper_attributes()  :';
			// var_dump(get_block_wrapper_attributes());
			// print PHP_EOL;
			// print PHP_EOL;
			// print 'correct  :';
			// var_dump($correct);
			// print PHP_EOL;

			$blog_card_data = VK_Blocks_Blog_Card::vk_get_blog_card_data('https://www.vektor-inc.co.jp/');
			if (!empty($test['cannot_embed']) && !empty($blog_card_data['cannot_embed'])) {
				$this->assertSame( $cannot_embed_correct, $render_block_content );
			} else {
				$this->assertSame( $correct, $render_block_content );
			}

		}
	}
};
