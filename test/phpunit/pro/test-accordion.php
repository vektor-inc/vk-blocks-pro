<?php
/**
 * Class AccordionTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Accordion block test case.
 */
class AccordionTest extends WP_UnitTestCase {
	/**
	 * Post object.
	 *
	 * @var object
	 */
	protected static $post;

	public function test_initial_state() {
		// 新しいポストを作成し、アコーディオンブロックを追加
		$post_id = $this->factory->post->create();
		$block_content = '<!-- wp:vk-blocks/accordion {"initialState":"close"} /-->';
		$post = get_post($post_id);
		$post->post_content = $block_content;
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
		$post_id = $this->factory->post->create();
		$block_content = '<!-- wp:vk-blocks/accordion {"containerClass":"vk_accordion"} /-->';
		$post = get_post($post_id);
		$post->post_content = $block_content;
		wp_update_post($post);

		// ブロックの解析
		$parsed_blocks = parse_blocks($post->post_content);
		$block = $parsed_blocks[0];

		// 古い属性が正しくセットされているかを確認
		$this->assertEquals('vk_accordion', $block['attrs']['containerClass']);
	}
}
?>
