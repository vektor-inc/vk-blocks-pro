<?php
/**
 * Class AccordionTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Accordion block test case.
 */
class AccordionTest extends VK_UnitTestCase {
	/**
	 * @var array
	 */
	protected static $posts;

	/**
	 * @var WP_Post
	 */
	protected static $post;

	/**
	 * @var string
	 */
	private $initial_content = '<!-- wp:vk-blocks/accordion {"initialState":"close"} /-->';

	/**
	 * @var string
	 */
	private $deprecated_content = '<!-- wp:vk-blocks/accordion {"containerClass":"vk_accordion"} /-->';

	public static function wpSetUpBeforeClass() {
		self::$post = self::factory()->post->create_and_get(
			array(
				'post_type'    => 'post',
				'post_title'   => 'Test Post',
				'post_content' => 'Test Post content'
			)
		);
		self::$posts[] = self::$post;
	}

	public static function wpTearDownAfterClass() {
		foreach ( self::$posts as $post_to_delete ) {
			wp_delete_post( $post_to_delete->ID, true );
		}
	}

	public function set_up() {
		parent::set_up();
	}

	public function tear_down() {
		parent::tear_down();
	}

	/**
	 * Test initial state of Accordion block.
	 */
	public function test_initial_state() {
		// 新しいポストを作成し、アコーディオンブロックを追加
		$post = self::$post;
		$post->post_content = $this->initial_content;
		wp_update_post($post);

		// ブロックの解析
		$parsed_blocks = parse_blocks($post->post_content);
		$block = $parsed_blocks[0];

		// 初期状態が正しくセットされているかを確認
		$this->assertEquals('close', $block['attrs']['initialState']);
	}

	/**
	 * Test deprecated attributes for Accordion block.
	 */
	public function test_deprecated_attributes() {
		// 新しいポストを作成し、古いアコーディオンブロックを追加
		$post = self::$post;
		$post->post_content = $this->deprecated_content;
		wp_update_post($post);

		// ブロックの解析
		$parsed_blocks = parse_blocks($post->post_content);
		$block = $parsed_blocks[0];

		// 古い属性が正しくセットされているかを確認
		$this->assertEquals('vk_accordion', $block['attrs']['containerClass']);
	}

	/**
	 * Test device-specific initial states for Accordion block.
	 */
	public function test_device_specific_initial_states() {
		// 新しいポストを作成し、デバイス固有の初期状態を持つアコーディオンブロックを追加
		$block_content = '<!-- wp:vk-blocks/accordion {"initialStateMobile":"open","initialStateTablet":"close","initialStateDesktop":"open","isDeviceSpecific":true} /-->';
		$post = self::$post;
		$post->post_content = $block_content;
		wp_update_post($post);

		// ブロックの解析
		$parsed_blocks = parse_blocks($post->post_content);
		$block = $parsed_blocks[0];

		// デバイス固有の初期状態が正しくセットされているかを確認
		$this->assertEquals('open', $block['attrs']['initialStateMobile']);
		$this->assertEquals('close', $block['attrs']['initialStateTablet']);
		$this->assertEquals('open', $block['attrs']['initialStateDesktop']);
		$this->assertTrue($block['attrs']['isDeviceSpecific']);
	}
}
