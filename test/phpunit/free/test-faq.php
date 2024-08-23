<?php
/**
 * Class FaqTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Faq block test case.
 */
class FaqTest extends WP_UnitTestCase {
	/**
	 * Test if the FAQ block renders correctly and outputs structured data.
	 */
	public function test_faq_block_renders_with_structured_data() {
		// Set up global variable for structured data
		global $vk_blocks_faq_data;
		$vk_blocks_faq_data = array();

		// Create a block instance
		$block_content = '
			<dl>
				<dt>Question 1?</dt>
				<dd>Answer 1</dd>
				<dt>Question 2?</dt>
				<dd>Answer 2</dd>
			</dl>';

		// Simulate rendering the block
		$block = array(
			'blockName' => 'vk-blocks/faq',
			'attrs'     => array(),
			'innerHTML' => $block_content,
		);

		// Apply the render callback
		$rendered_content = vk_blocks_faq_render_callback($block_content, $block);

		// Print the test details
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_faq_block_renders_with_structured_data()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'Rendered Content:' . PHP_EOL;
		print $rendered_content . PHP_EOL;

		// Check that the block content is rendered correctly
		$this->assertStringContainsString('Question 1?', $rendered_content);
		$this->assertStringContainsString('Answer 1', $rendered_content);
		$this->assertStringContainsString('Question 2?', $rendered_content);
		$this->assertStringContainsString('Answer 2', $rendered_content);

		// Print the structured data
		print 'Structured Data:' . PHP_EOL;
		var_dump($vk_blocks_faq_data);

		// Check that the structured data is collected
		$this->assertCount(2, $vk_blocks_faq_data);

		$this->assertEquals('Question', $vk_blocks_faq_data[0]['@type']);
		$this->assertEquals('Question 1?', $vk_blocks_faq_data[0]['name']);
		$this->assertEquals('Answer', $vk_blocks_faq_data[0]['acceptedAnswer']['@type']);
		$this->assertEquals('Answer 1', $vk_blocks_faq_data[0]['acceptedAnswer']['text']);

		$this->assertEquals('Question', $vk_blocks_faq_data[1]['@type']);
		$this->assertEquals('Question 2?', $vk_blocks_faq_data[1]['name']);
		$this->assertEquals('Answer', $vk_blocks_faq_data[1]['acceptedAnswer']['@type']);
		$this->assertEquals('Answer 2', $vk_blocks_faq_data[1]['acceptedAnswer']['text']);
	}

	/**
	 * Test if the structured data is output as JSON-LD in the footer.
	 */
	public function test_faq_json_ld_output() {
		// Set up global variable for structured data
		global $vk_blocks_faq_data;
		$vk_blocks_faq_data = array(
			array(
				'@type'          => 'Question',
				'name'           => 'Test Question?',
				'acceptedAnswer' => array(
					'@type' => 'Answer',
					'text'  => 'Test Answer.',
				),
			),
		);

		// Start output buffering
		ob_start();

		// Trigger the footer action
		vk_blocks_output_schema_json_ld();

		// Get the buffered content
		$output = ob_get_clean();

		// Print the JSON-LD output
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'test_faq_json_ld_output()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'JSON-LD Output:' . PHP_EOL;
		print $output . PHP_EOL;

		// Check that the JSON-LD script is present and contains the correct data
		$this->assertStringContainsString('<script type="application/ld+json">', $output);
		$this->assertStringContainsString('"@type":"FAQPage"', $output);
		$this->assertStringContainsString('"name":"Test Question?"', $output);
		$this->assertStringContainsString('"text":"Test Answer."', $output);
	}
}
