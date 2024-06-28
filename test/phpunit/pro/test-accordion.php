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
	 * Post object.
	 *
	 * @var object
	 */
	protected static $post;

	public function test_initial_state() {
		// 新しいポストを作成し、アコーディオンブロックを追加
		$post_id = $this->factory->post->create();
		$block_content = '<!-- wp:vk-blocks/accordion {"initialState":"close","initialStateMobile":"open","initialStateTablet":"close","initialStateDesktop":"open","isDeviceSpecific":true} /-->';
		$post = get_post($post_id);
		$post->post_content = $block_content;
		wp_update_post($post);

		// ブロックの解析
		$parsed_blocks = parse_blocks($post->post_content);
		$block = $parsed_blocks[0];

		// 初期状態が正しくセットされているかを確認
		$this->assertEquals('close', $block['attrs']['initialState']);
		$this->assertEquals('open', $block['attrs']['initialStateMobile']);
		$this->assertEquals('close', $block['attrs']['initialStateTablet']);
		$this->assertEquals('open', $block['attrs']['initialStateDesktop']);
		$this->assertTrue($block['attrs']['isDeviceSpecific']);
	}
}
