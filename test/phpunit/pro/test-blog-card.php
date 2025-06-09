<?php
/**
 * Class BlogCardTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * BlogCard block test case.
 */
class BlogCard extends VK_UnitTestCase {
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

	/**
	 * Setup method.
	 */
	protected function setUp(): void {
		parent::setUp();
		// wp_oembed_get()をモック化
		add_filter( 'pre_oembed_result', function( $result, $url ) {
			if ( strpos( $url, 'is_embeddable=false' ) !== false ) {
				return false;
			}
			return $result;
		}, 10, 2 );
	}	

	public function test_vk_blocks_blog_card_render_callback() {

		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'vk_blocks_blog_card_render_callback' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print PHP_EOL;

		$tests = array(
			// 内部リンク
			array(
				'content'  => '
				<!-- wp:vk-blocks/blog-card {"url":"' . get_permalink( self::$post->ID ) . '"} -->
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
				<h5 class="wp-block-vk-blocks-blog-card-title"><a href="' . get_permalink( self::$post->ID ) . '" target="_self" >' . get_the_title( self::$post->ID ) . '</a></h5>
				<figure class="wp-block-vk-blocks-blog-card-featured-image"><a href="' . get_permalink( self::$post->ID ) . '" target="_self"  ><img src=\'' . get_the_post_thumbnail_url( self::$post->ID, 'large' ) . '\' style="object-fit:cover;" /></a></figure>
				<div class="wp-block-vk-blocks-blog-card-excerpt"><p class="wp-block-vk-blocks-blog-card-excerpt__excerpt">' . get_the_excerpt( self::$post->ID ) . '</p></div>
				<figure class="wp-block-vk-blocks-blog-card-site-logo"><a href="' . home_url() . '" target="_self" ><img src=\'' . get_site_icon_url( 32 ) . '\' /></a></figure>
				<p class="wp-block-vk-blocks-blog-card-site-title"><a href="' . home_url() . '" target="_self" >' . get_bloginfo( 'name' ) . '</a></p>
				</div>
				',
			),
			// 外部リンク 埋め込み不可（画像ファイル）
			array(
				'content'  => '
				<!-- wp:vk-blocks/blog-card {"url":"https://vektor-inc.co.jp/data/photo_ishikawa.jpg"} -->
<div class="wp-block-vk-blocks-blog-card"></div>
<!-- /wp:vk-blocks/blog-card -->',
				'expected' => '<div %s>https://vektor-inc.co.jp/data/photo_ishikawa.jpg</div>',
			),
			// 外部リンク 埋め込み不可（is_embeddable=false）
			array(
				'content'  => '
				<!-- wp:vk-blocks/blog-card {"url":"https://vektor-inc.co.jp/is_embeddable=false"} -->
<div class="wp-block-vk-blocks-blog-card"></div>
<!-- /wp:vk-blocks/blog-card -->',
				'expected' => '<div %s>https://vektor-inc.co.jp/is_embeddable=false</div>',
			),
		);

		WP_Block_Supports::init();
		WP_Block_Supports::$block_to_render = array(
			'blockName' => 'vk-blocks/blog-card',
		);

		foreach ( $tests as $test ) {

			// Get block wrapper attributes ( HTML attributes like as : class="wp-block-vk-blocks-blog-card" ).
			$get_block_wrapper_attributes = get_block_wrapper_attributes();
			// ラッパーア属性を結合したコンテンツ要素
			$block_content = sprintf( $test['content'], $get_block_wrapper_attributes );
			// ブロック情報を配列に変換
			$parse_blocks = parse_blocks( $block_content );
			// Render Blog card block.
			$render_block_content = render_block( $parse_blocks[1] );

			if ( is_wp_version_compatible( '6.3' ) ) {
				$get_block_wrapper_attributes = 'class="wp-block-vk-blocks-blog-card is-layout-flow wp-block-blog-card-is-layout-flow"';
			} else {
				$get_block_wrapper_attributes = 'class="wp-block-vk-blocks-blog-card"';
			}

			if ( is_array( $test['expected'] ) ) {
				// Expected が配列の場合
				$correct = array();
				// 埋め込み成功
				$correct[1] = sprintf( $test['expected']['can_embed'], $get_block_wrapper_attributes );
				// 埋め込み失敗
				$correct[2] = sprintf( $test['expected']['cannot_embed'], $get_block_wrapper_attributes );
			} else {
				$correct = sprintf( $test['expected'], $get_block_wrapper_attributes );
			}

			// print PHP_EOL;
			print '$render_block_content  :';
			var_dump( $render_block_content );
			// print PHP_EOL;
			// print PHP_EOL;
			print 'correct  :';
			var_dump( $correct );
			// print PHP_EOL;

			if ( is_array( $correct ) ) {
				// 成功 / 失敗 がある場合
				$this->assertContains( $render_block_content, $correct );
			} else {
				$this->assertSame( $correct, $render_block_content );
			}
		}
	}
}
