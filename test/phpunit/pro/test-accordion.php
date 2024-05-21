<?php
/**
 * Class AccordionTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

/**
 * Accordion block test case.
 */
class AccordionTest extends VK_UnitTestCase {
	/**
	 * Test initial state of Accordion block.
	 */
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

		// テスト後のクリーンアップ
		wp_delete_post($post_id, true);
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

		// テスト後のクリーンアップ
		wp_delete_post($post_id, true);
	}

	/**
	 * Test device-specific initial states for Accordion block.
	 */
	public function test_device_specific_initial_states() {
		// 新しいポストを作成し、デバイス固有の初期状態を持つアコーディオンブロックを追加
		$post_id = $this->factory->post->create();
		$block_content = '<!-- wp:vk-blocks/accordion {"initialStateMobile":"open","initialStateTablet":"close","initialStateDesktop":"open","isDeviceSpecific":true} /-->';
		$post = get_post($post_id);
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

		// テスト後のクリーンアップ
		wp_delete_post($post_id, true);
	}
}
