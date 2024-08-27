<?php
/**
 * Class PostNewBadgeTest
 *
 * @package Vk_Blocks_Pro
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * DynamicText block test case.
 */
class PostNewBadgeTest extends VK_UnitTestCase {

    /**
	 * @var array
	 */
	protected static $posts;

	/**
	 * @var WP_Post
	 */
	protected static $post_today;

	/**
	 * @var WP_Post
	 */
	protected static $post_fivedays_ago;
		
    /**
	 * @var array|null
	 */
	private $original_block_supports;

	/**
	 * @var string
	 */
	private $content = '<div class="wp-block-vk-blocks-post-new-badge vk_newBadge has-text-align-center has-text-color" style="color:#ff0000;font-style:normal;font-weight:700"><span>New!</span></div>';


    public static function wpSetUpBeforeClass() {
	
		self::$post_today = self::factory()->post->create_and_get(
			array(
				'post_type'    => 'post',
				'post_title'   => 'Today Post',
				'post_content' => 'Today Post content',
                'post_date'    => date('Y-m-d H:i:s', strtotime('08:00:00'))
			)
		);
		
		self::$posts[]         = self::$post_today;

		self::$post_fivedays_ago = self::factory()->post->create_and_get(
			array(
				'post_type'    => 'post',
				'post_title'   => '5 days ago Post',
				'post_content' => '5 days ago Post content',
                'post_date'    => date('Y-m-d H:i:s', strtotime('-5 days 23:00:00'))
			)
		);
		self::$posts[]         = self::$post_fivedays_ago;
	}

    public static function wpTearDownAfterClass() {
		foreach ( self::$posts as $post_to_delete ) {
			wp_delete_post( $post_to_delete->ID, true );
		}
	}

	public function set_up() {
		parent::set_up();
       // WP_Block_Supports::init();
		$this->original_block_supports      = WP_Block_Supports::$block_to_render;
		WP_Block_Supports::$block_to_render = array(
			'blockName' => 'vk-blocks/post-new-badge',
		);
	}

	public function tear_down() {
		WP_Block_Supports::$block_to_render = $this->original_block_supports;
		parent::tear_down();
	}

	public function test_returns_for_today_post() {
		global $wp_query;

		$wp_query->post  = self::$post_today;
		$GLOBALS['post'] = self::$post_today;

		$page_id       = self::$post_today->ID;
	
        $tests = array(
            array (
                'attributes' => array(
                    'daysAsNewPost' => 4,
                    'content' => 'New'
                ),
                'correct' => $this->content
            ),
            array (
                'attributes' => array(
                    'daysAsNewPost' => 5,
                    'content' => 'New'
                ),
                'correct' => $this->content
            )                     
        );

        print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'PostNewBadgeTest::test_returns_for_today_post' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;

        foreach( $tests as $test ) {
            $return = vk_blocks_post_new_badge_render_callback($test['attributes'], $this->content);
            print 'return  :' . $return;
            print PHP_EOL;
            print 'correct :' . $test['correct'];
            print PHP_EOL;
            $this->assertEquals($test['correct'], $return);
        }

	}

	public function test_returns_for_fivedays_ago_post() {
		global $wp_query;

		$wp_query->post  = self::$post_fivedays_ago;
		$GLOBALS['post'] = self::$post_fivedays_ago;

		$page_id       = self::$post_fivedays_ago->ID;

        $tests = array(
            array (
                'attributes' => array(
                    'daysAsNewPost' => 5,
                    'content' => 'New'
                ),
                'correct' => ''
            ),
            array (
                'attributes' => array(
                    'daysAsNewPost' => 6,
                    'content' => 'New'
                ),
                'correct' => $this->content
            )                      
        );

        print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'PostNewBadgeTest::test_returns_for_fivedays_ago_post' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
       // WP_Block_Supports::init();
        foreach( $tests as $test ) {
            $return = vk_blocks_post_new_badge_render_callback($test['attributes'], $this->content);
            print 'return  :' . $return;
            print PHP_EOL;
            print 'correct :' . $test['correct'];
            print PHP_EOL;
            $this->assertEquals($test['correct'], $return);
        }
	}
};
