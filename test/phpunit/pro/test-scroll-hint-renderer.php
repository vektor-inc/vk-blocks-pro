<?php
/**
 * Class VK_Blocks_ScrollHintRendererTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

class VK_Blocks_ScrollHintRendererTest extends VK_UnitTestCase {

	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();

		// 必要な初期化を行う
		VK_Blocks_ScrollHintRenderer::init();
	}

	public function test_render_with_scroll_hint() {
		$block_content = '<div class="is-style-vk-table-scrollable">Test Content</div>';
		$block         = array(
			'blockName' => 'core/table',
			'attrs'     => array(
				'className'           => 'is-style-vk-table-scrollable',
				'scrollMessageText'   => 'Scroll to see more',
				'scrollIconLeft'      => '<i class="fa-solid fa-caret-left"></i>',
				'scrollIconRight'     => '<i class="fa-solid fa-caret-right"></i>',
				'scrollBreakpoint'    => 'table-scrollable-mobile',
			),
		);

		// テスト実行
		$actual_content = VK_Blocks_ScrollHintRenderer::render_with_scroll_hint( $block_content, $block );

		// 期待されるスクロールヒントのHTML
		$expected_scroll_hint = '<div class="vk-scroll-hint" data-scroll-breakpoint="table-scrollable-mobile" data-hint-icon-left="fa-solid fa-caret-left" data-hint-icon-right="fa-solid fa-caret-right">
				<i class="fa-solid fa-caret-left"></i>
				<span>Scroll to see more</span>
				<i class="fa-solid fa-caret-right"></i>
			</div>';

		// スクロールヒントが挿入されたか確認
		$this->assertStringContainsString( $expected_scroll_hint, $actual_content );
	}

	public function test_render_without_scroll_hint() {
		$block_content = '<div class="some-other-class">Test Content</div>';
		$block         = array(
			'blockName' => 'core/paragraph',
			'attrs'     => array(
				'className' => 'some-other-class',
			),
		);

		// テスト実行
		$actual_content = VK_Blocks_ScrollHintRenderer::render_with_scroll_hint( $block_content, $block );

		// スクロールヒントが挿入されていないことを確認
		$this->assertSame( $block_content, $actual_content );
	}

	public function test_generate_scroll_hint() {
		$block = array(
			'attrs' => array(
				'scrollMessageText' => 'Scroll to see more',
				'scrollIconLeft'    => '<i class="fa-solid fa-caret-left"></i>',
				'scrollIconRight'   => '<i class="fa-solid fa-caret-right"></i>',
				'scrollBreakpoint'  => 'table-scrollable-mobile',
			),
		);

		// 期待されるスクロールヒントのHTML
		$expected_scroll_hint = '<div class="vk-scroll-hint" data-scroll-breakpoint="table-scrollable-mobile" data-hint-icon-left="fa-solid fa-caret-left" data-hint-icon-right="fa-solid fa-caret-right">
				<i class="fa-solid fa-caret-left"></i>
				<span>Scroll to see more</span>
				<i class="fa-solid fa-caret-right"></i>
			</div>';

		// メソッドのテスト
		$actual_scroll_hint = VK_Blocks_ScrollHintRenderer::generate_scroll_hint( $block );

		$this->assertSame( $expected_scroll_hint, $actual_scroll_hint );
	}
}
