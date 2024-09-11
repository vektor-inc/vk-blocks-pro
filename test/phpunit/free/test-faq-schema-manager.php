<?php
/**
 * Class FaqSchemaManegerTest
 *
 * @package Vk_Blocks_Pro
 */

/**
 * Faq Schema Manager test case.
 */
class FaqSchemaManegerTest extends VK_UnitTestCase {

	public function test_output_schema() {

		$block_contents = '<!-- wp:vk-blocks/faq -->
<dl class="wp-block-vk-blocks-faq vk_faq [accordion_trigger_switch]"><dt class="vk_faq_title" aria-label="質問">ああああ</dt><dd class="vk_faq_content" aria-label="回答"><!-- wp:paragraph -->
<p>いいいいい</p>
<!-- /wp:paragraph --></dd></dl>
<!-- /wp:vk-blocks/faq -->

<!-- wp:vk-blocks/faq2 -->
<div class="wp-block-vk-blocks-faq2 vk_faq  [accordion_trigger_switch]"><div class="vk_faq-header"></div><dl class="vk_faq-body"><!-- wp:vk-blocks/faq2-q -->
<dt class="wp-block-vk-blocks-faq2-q vk_faq_title" aria-label="質問"><!-- wp:paragraph -->
<p>あああ</p>
<!-- /wp:paragraph --></dt>
<!-- /wp:vk-blocks/faq2-q -->

<!-- wp:vk-blocks/faq2-a -->
<dd class="wp-block-vk-blocks-faq2-a vk_faq_content" aria-label="回答"><!-- wp:paragraph -->
<p>いいいいい</p>
<!-- /wp:paragraph --></dd>
<!-- /wp:vk-blocks/faq2-a --></dl><div class="vk_faq-footer"></div></div>
<!-- /wp:vk-blocks/faq2 -->';

		$correct = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"ああああ","acceptedAnswer":{"@type":"Answer","text":"いいいいい"}},{"@type":"Question","name":"あああ","acceptedAnswer":{"@type":"Answer","text":"いいいいい"}}]}</script>';

		VK_Blocks_Faq_Schema_Manager::add_content( $block_contents );

		// Start output buffering
		ob_start();

		// Trigger the footer action
		VK_Blocks_Faq_Schema_Manager::output_schema();

		// Get the buffered content
		$return = ob_get_clean();	

		// Print the JSON-LD output
		print PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'FaqSchemaManegerTest::output_schema()' . PHP_EOL;
		print '------------------------------------' . PHP_EOL;
		print 'return  :';
		print PHP_EOL;
		var_dump( $return );
		print PHP_EOL;
		print 'correct  :';
		print PHP_EOL;
		var_dump( $correct );
		print PHP_EOL;
		// Check that the JSON-LD script is present and contains the correct data
		$this->assertSame( $correct, $return );
	}

}