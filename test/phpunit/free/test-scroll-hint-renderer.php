<?php
/**
 * Class VK_Blocks_ScrollHintRendererTest
 *
 * @package vektor-inc/vk-blocks-pro
 */

class VK_Blocks_ScrollHintRendererTest extends VK_UnitTestCase {

	public static function setUpBeforeClass(): void {
		parent::setUpBeforeClass();

		// Initialize the ScrollHintRenderer class for testing
		VK_Blocks_ScrollHintRenderer::init();
	}

	/**
	 * Normalize HTML by removing whitespace and line breaks for comparison.
	 *
	 * @param string $html The HTML content to normalize.
	 * @return string The normalized HTML content.
	 */
	private function normalize_html( $html ) {
		return preg_replace( '/\s+/', '', $html );
	}

	/**
	 * Test render_with_scroll_hint method with scrollable block and scroll hint enabled.
	 */
	public function test_render_with_scroll_hint() {
		$block_content = '<div class="is-style-vk-table-scrollable vk_hidden vk_hidden-xs" data-output-scroll-hint="true">Test Content</div>';
		$block         = array(
			'blockName' => 'core/table',
			'attrs'     => array(
				'className'           => 'is-style-vk-table-scrollable',
				'scrollMessageText'   => 'Scroll to see more',
				'scrollIconLeft'      => 'fa-solid fa-caret-left',
				'scrollIconRight'     => 'fa-solid fa-caret-right',
				'scrollBreakpoint'    => 'table-scrollable-mobile',
				'iconOutputLeft'      => true,
				'iconOutputRight'     => true,
				'data-output-scroll-hint' => 'true',
			),
		);

		// Execute the method
		$actual_content = VK_Blocks_ScrollHintRenderer::render_with_scroll_hint( $block_content, $block );

		// Expected scroll hint HTML
		$expected_scroll_hint = '<div class="vk-scroll-hint vk_hidden vk_hidden-xs" data-scroll-breakpoint="table-scrollable-mobile" data-output-scroll-message="false" data-icon-output-left="true" data-icon-output-right="true" data-hint-icon-left="fa-solid fa-caret-left" data-hint-icon-right="fa-solid fa-caret-right">
				<i class="fa-solid fa-caret-left"></i>
				<span>Scroll to see more</span>
				<i class="fa-solid fa-caret-right"></i>
			</div><div class="is-style-vk-table-scrollable vk_hidden vk_hidden-xs" data-output-scroll-hint="true">Test Content</div>';

		// Normalize and compare
		$this->assertEquals( $this->normalize_html($expected_scroll_hint), $this->normalize_html($actual_content) );
	}

	/**
	 * Test render_with_scroll_hint method with scrollable block but scroll hint disabled.
	 */
	public function test_render_with_scroll_hint_disabled() {
		$block_content = '<div class="is-style-vk-table-scrollable" data-output-scroll-hint="false">Test Content</div>';
		$block         = array(
			'blockName' => 'core/table',
			'attrs'     => array(
				'className'           => 'is-style-vk-table-scrollable',
				'scrollMessageText'   => 'Scroll to see more',
				'scrollIconLeft'      => 'fa-solid fa-caret-left',
				'scrollIconRight'     => 'fa-solid fa-caret-right',
				'scrollBreakpoint'    => 'table-scrollable-mobile',
				'iconOutputLeft'      => true,
				'iconOutputRight'     => true,
				'data-output-scroll-hint' => 'false',
			),
		);

		// Execute the method
		$actual_content = VK_Blocks_ScrollHintRenderer::render_with_scroll_hint( $block_content, $block );

		// Assert the scroll hint is not inserted
		$this->assertSame( $this->normalize_html($block_content), $this->normalize_html($actual_content) );
	}

	/**
	 * Test render_with_scroll_hint method with non-scrollable block.
	 */
	public function test_render_without_scroll_hint() {
		$block_content = '<div class="some-other-class">Test Content</div>';
		$block         = array(
			'blockName' => 'core/paragraph',
			'attrs'     => array(
				'className' => 'some-other-class',
			),
		);

		// Execute the method
		$actual_content = VK_Blocks_ScrollHintRenderer::render_with_scroll_hint( $block_content, $block );

		// Assert the scroll hint is not inserted
		$this->assertSame( $this->normalize_html($block_content), $this->normalize_html($actual_content) );
	}

	/**
	 * Test generate_scroll_hint method with both icons enabled.
	 */
	public function test_generate_scroll_hint() {
		$block = array(
			'attrs' => array(
				'scrollMessageText' => 'Scroll to see more',
				'scrollIconLeft'    => 'fa-solid fa-caret-left',
				'scrollIconRight'   => 'fa-solid fa-caret-right',
				'scrollBreakpoint'  => 'table-scrollable-mobile',
				'iconOutputLeft'    => true,
				'iconOutputRight'   => true,
			),
		);

		// Expected scroll hint HTML with both icons
		$expected_scroll_hint = '<div class="vk-scroll-hint" data-scroll-breakpoint="table-scrollable-mobile" data-output-scroll-message="false" data-icon-output-left="true" data-icon-output-right="true" data-hint-icon-left="fa-solid fa-caret-left" data-hint-icon-right="fa-solid fa-caret-right">
				<i class="fa-solid fa-caret-left"></i>
				<span>Scroll to see more</span>
				<i class="fa-solid fa-caret-right"></i>
			</div>';

		// Execute the method
		$actual_scroll_hint = VK_Blocks_ScrollHintRenderer::generate_scroll_hint( $block );

		$this->assertEquals( $this->normalize_html($expected_scroll_hint), $this->normalize_html($actual_scroll_hint) );
	}

	/**
	 * Test generate_scroll_hint method with one icon disabled.
	 */
	public function test_generate_scroll_hint_one_icon_disabled() {
		$block = array(
			'attrs' => array(
				'scrollMessageText' => 'Scroll to see more',
				'scrollIconLeft'    => 'fa-solid fa-caret-left',
				'scrollIconRight'   => 'fa-solid fa-caret-right',
				'scrollBreakpoint'  => 'table-scrollable-mobile',
				'iconOutputLeft'    => false,
				'iconOutputRight'   => true,
			),
		);

		// Expected scroll hint HTML with only the right icon
		$expected_scroll_hint = '<div class="vk-scroll-hint" data-scroll-breakpoint="table-scrollable-mobile" data-output-scroll-message="false" data-icon-output-left="false" data-icon-output-right="true" data-hint-icon-right="fa-solid fa-caret-right">
				<span>Scroll to see more</span>
				<i class="fa-solid fa-caret-right"></i>
			</div>';

		// Execute the method
		$actual_scroll_hint = VK_Blocks_ScrollHintRenderer::generate_scroll_hint( $block );

		$this->assertEquals( $this->normalize_html($expected_scroll_hint), $this->normalize_html($actual_scroll_hint) );
	}

	/**
	 * Test generate_scroll_hint method with no icons enabled.
	 */
	public function test_generate_scroll_hint_no_icons() {
		$block = array(
			'attrs' => array(
				'scrollMessageText' => 'Scroll to see more',
				'scrollIconLeft'    => 'fa-solid fa-caret-left',
				'scrollIconRight'   => 'fa-solid fa-caret-right',
				'scrollBreakpoint'  => 'table-scrollable-mobile',
				'iconOutputLeft'    => false,
				'iconOutputRight'   => false,
			),
		);

		// Expected scroll hint HTML with no icons
		$expected_scroll_hint = '<div class="vk-scroll-hint" data-scroll-breakpoint="table-scrollable-mobile" data-output-scroll-message="false" data-icon-output-left="false" data-icon-output-right="false">
				<span>Scroll to see more</span>
			</div>';

		// Execute the method
		$actual_scroll_hint = VK_Blocks_ScrollHintRenderer::generate_scroll_hint( $block );

		$this->assertEquals( $this->normalize_html($expected_scroll_hint), $this->normalize_html($actual_scroll_hint) );
	}
}
