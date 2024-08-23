<?php
/**
 * VK Blocks - Faq2 Blocks
 *
 * @package vk-blocks
 */

/**
 * Register FAQ2 block.
 *
 * @return void
 */
function vk_blocks_register_block_faq2() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/faq',
			VK_BLOCKS_DIR_URL . 'build/faq/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	// Register Script.
	if ( ! is_admin() ) {
		wp_register_script(
			'vk-blocks/faq-script',
			VK_BLOCKS_DIR_URL . 'build/vk-faq2.min.js',
			array(),
			VK_BLOCKS_VERSION,
			true
		);
	}

	$assets = array();
	if ( method_exists( 'VK_Blocks_Block_Loader', 'should_load_separate_assets' ) && VK_Blocks_Block_Loader::should_load_separate_assets() ) {
		$assets = array(
			'style'         => 'vk-blocks/faq',
			'script'        => 'vk-blocks/faq-script',
			'editor_style'  => 'vk-blocks-build-editor-css',
			'editor_script' => 'vk-blocks-build-js',
		);
	}

	register_block_type(
		__DIR__,
		$assets
	);
}
add_action( 'init', 'vk_blocks_register_block_faq2', 99 );

/**
 * Collect FAQ data for all blocks on the page.
 *
 * @param string $block_content The block content.
 * @param array  $block         The block data.
 * @return string The block content.
 */
function vk_blocks_collect_faq_data( $block_content, $block ) {
	global $vk_blocks_faq_data;

	if ( 'vk-blocks/faq2' === $block['blockName'] ) {
		$doc = new DOMDocument();
		libxml_use_internal_errors( true );

		// PHP 5.3 以前の互換性のためのチェック
		$options = 0;
		if ( defined( 'LIBXML_HTML_NOIMPLIED' ) ) {
			$options |= constant( 'LIBXML_HTML_NOIMPLIED' );
		}
		if ( defined( 'LIBXML_HTML_NODEFDTD' ) ) {
			$options |= constant( 'LIBXML_HTML_NODEFDTD' );
		}

		$doc->loadHTML( '<?xml encoding="utf-8" ?>' . $block_content, $options );

		$questions = $doc->getElementsByTagName( 'dt' );
		$answers   = $doc->getElementsByTagName( 'dd' );

		foreach ( $questions as $index => $question ) {
			// HTML タグをすべて削除して1行にまとめる
			$question_text = trim( preg_replace( "/\r|\n|\r\n|\n\n/", '', strip_tags( $doc->saveHTML( $question ) ) ) );
			$answer_text   = null !== $answers->item( $index ) ? trim( preg_replace( "/\r|\n|\r\n|\n\n/", '', strip_tags( $doc->saveHTML( $answers->item( $index ) ) ) ) ) : '';

			$vk_blocks_faq_data[] = array(
				'@type'          => 'Question',
				'name'           => $question_text,
				'acceptedAnswer' => array(
					'@type' => 'Answer',
					'text'  => $answer_text,
				),
			);
		}
	}

	return $block_content;
}
add_filter( 'render_block', 'vk_blocks_collect_faq_data', 10, 2 );

if ( ! function_exists( 'vk_blocks_output_schema_json_ld' ) ) {
	/**
	 * Output the collected FAQ data as JSON-LD.
	 */
	function vk_blocks_output_schema_json_ld() {
		global $vk_blocks_faq_data;

		if ( ! empty( $vk_blocks_faq_data ) ) {
			$faq_schema = array(
				'@context'   => 'https://schema.org',
				'@type'      => 'FAQPage',
				'mainEntity' => $vk_blocks_faq_data,
			);

			// PHP 5.3 以前の互換性のためのチェック
			$json_options = 0;
			if ( defined( 'JSON_UNESCAPED_UNICODE' ) ) {
				$json_options |= constant( 'JSON_UNESCAPED_UNICODE' );
			}
			if ( defined( 'JSON_UNESCAPED_SLASHES' ) ) {
				$json_options |= constant( 'JSON_UNESCAPED_SLASHES' );
			}

			echo '<script type="application/ld+json">' . wp_json_encode( $faq_schema, $json_options ) . '</script>';
		}
	}
	add_action( 'wp_footer', 'vk_blocks_output_schema_json_ld' );
}
