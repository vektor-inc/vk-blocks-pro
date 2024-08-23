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

	// クラシックテーマ & 6.5 環境で $assets = array() のように空にしないと重複登録になるため
	// ここで初期化しておく
	$assets = array();
	// Attend to load separate assets.
	// 分割読み込みが有効な場合のみ、分割読み込み用のスクリプトを登録する
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
 * Render faq2 block
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_faq2_render_callback( $block_content, $block ) {
	$vk_blocks_options = VK_Blocks_Options::get_options();

	if ( 'vk-blocks/faq2' === $block['blockName'] ) {
		if ( ! empty( $vk_blocks_options['new_faq_accordion'] ) && 'open' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $block_content );
		} elseif ( ! empty( $vk_blocks_options['new_faq_accordion'] ) && 'close' === $vk_blocks_options['new_faq_accordion'] ) {
			$block_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $block_content );
		} else {
			$block_content = str_replace( '[accordion_trigger_switch]', '', $block_content );
		}

		// 構造化データの追加
		if ( apply_filters( 'vk_blocks_output_faq_schema', true ) ) {
			global $vk_blocks_faq_data;
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
	}

	return $block_content;
}

add_filter( 'render_block', 'vk_blocks_faq2_render_callback', 10, 2 );

if ( ! function_exists( 'vk_blocks_output_schema_json_ld' ) ) {
	/**
	 * Output the collected structured data as JSON-LD.
	 */
	function vk_blocks_output_schema_json_ld() {
		global $vk_blocks_faq_data;

		$schema_graph = array();

		if ( ! empty( $vk_blocks_faq_data ) && apply_filters( 'vk_blocks_output_faq_schema', true ) ) {
			$faq_schema     = array(
				'@type'      => 'FAQPage',
				'mainEntity' => $vk_blocks_faq_data,
			);
			$schema_graph[] = $faq_schema;
		}

		$schema_graph = apply_filters( 'vk_blocks_additional_schema_graph', $schema_graph );

		if ( ! empty( $schema_graph ) ) {
			if ( count( $schema_graph ) > 1 ) {
				$schema_output = array(
					'@context' => 'https://schema.org',
					'@graph'   => $schema_graph,
				);
			} else {
				$schema_output = array(
					'@context' => 'https://schema.org',
				) + $schema_graph[0];  // 配列の最初の要素を直接結合
			}

			// PHP 5.3 以前の互換性のためのチェック
			$json_options = 0;
			if ( defined( 'JSON_UNESCAPED_UNICODE' ) ) {
				$json_options |= constant( 'JSON_UNESCAPED_UNICODE' );
			}
			if ( defined( 'JSON_UNESCAPED_SLASHES' ) ) {
				$json_options |= constant( 'JSON_UNESCAPED_SLASHES' );
			}

			echo '<script type="application/ld+json">' . wp_json_encode( $schema_output, $json_options ) . '</script>';
		}
	}
	add_action( 'wp_footer', 'vk_blocks_output_schema_json_ld' );
}