<?php
/**
 * VK Blocks - Faq Schema Manager
 *
 * @package vk-blocks
 */

/**
 * FAQ Schema Manager Class
 */
class VK_Blocks_Faq_Schema_Manager {

	/**
	 * 構造化データ
	 *
	 * @var array
	 */
	private static $datas = array();

	/**
	 * FAQ ブロックのコンテンツを追加
	 *
	 * @param string $block_content ブロックのコンテンツ.
	 * @return void
	 */
	public static function add_content( $block_content ) {
			// 構造化データの追加
		if ( apply_filters( 'vk_blocks_output_faq_schema', true ) ) {
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
				$question_text = trim( preg_replace( "/\r|\n|\r\n|\n\n/", '', wp_strip_all_tags( $doc->saveHTML( $question ) ) ) );
				$answer_text   = null !== $answers->item( $index ) ? trim( preg_replace( "/\r|\n|\r\n|\n\n/", '', wp_strip_all_tags( $doc->saveHTML( $answers->item( $index ) ) ) ) ) : '';

				self::$datas[] = array(
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

	/**
	 * 初期化
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'wp_footer', array( __CLASS__, 'output_schema' ) );
	}

	/**
	 * 構造化データの出力
	 *
	 * @return void
	 */
	public static function output_schema() {
		$schema_graph = array();

		if ( ! empty( self::$datas ) && apply_filters( 'vk_blocks_output_faq_schema', true ) ) {
			$faq_schema     = array(
				'@type'      => 'FAQPage',
				'mainEntity' => self::$datas,
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
}
