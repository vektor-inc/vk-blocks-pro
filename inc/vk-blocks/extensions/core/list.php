<?php
/**
 * Extensions core list block style .
 *
 * @package vk-blocks
 */

/**
 * Extensions core list block style.
 *
 * @param string $block_content block_content.
 * @param array  $block block.
 * @return string
 */
function vk_blocks_render_core_list( $block_content, $block ) {
	// 以前の形式 vk-has-(.*)-colorで保存されている場合
	$has_deprecated_classname = ! empty( $block['attrs']['className'] ) && strpos( $block['attrs']['className'], 'vk-has-(.*)-color' ) !== false;
	if ( $has_deprecated_classname ) {
		return $block_content;
	}

	// WP6.2未満の場合
	if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor( $block_content );
	if ( empty( $block['attrs']['ordered'] ) ) {
		$processor->next_tag( array( 'tag_name' => 'ul' ) );
	} else {
		$processor->next_tag( array( 'tag_name' => 'ol' ) );
	}
	$unique_classname = wp_unique_id( 'vk_list_' );
	$processor->add_class( $unique_classname );

	// 番号付きスタイルでliごとにdata-vk-numberを付与
	$has_numbered_style = ! empty( $block['attrs']['className'] ) && (
		strpos( $block['attrs']['className'], 'is-style-vk-numbered-square-mark' ) !== false ||
		strpos( $block['attrs']['className'], 'is-style-vk-numbered-circle-mark' ) !== false
	);

	if ( $has_numbered_style && ! empty( $block['attrs']['ordered'] ) ) {
		$li_html = $processor->get_updated_html();
		preg_match_all( '/<li(.*?)>/', $li_html, $matches, PREG_OFFSET_CAPTURE );
		$li_count = count( $matches[0] );
		$li_processor = new WP_HTML_Tag_Processor( $li_html );
		$start = 1;
		if ( isset( $block['attrs']['start'] ) && is_numeric( $block['attrs']['start'] ) ) {
			$start = intval( $block['attrs']['start'] );
		}
		if ( ! empty( $block['attrs']['reversed'] ) ) {
			// reversed属性がある場合はカウントダウン
			$li_number = $start;
			if ( isset( $block['attrs']['start'] ) && is_numeric( $block['attrs']['start'] ) ) {
				$li_number = $start;
			} else {
				$li_number = $li_count;
			}
			while ( $li_processor->next_tag( array( 'tag_name' => 'li' ) ) ) {
				$li_processor->set_attribute( 'data-vk-number', $li_number );
				$li_number--;
			}
		} else {
			// 通常はカウントアップ
			$li_number = $start;
			while ( $li_processor->next_tag( array( 'tag_name' => 'li' ) ) ) {
				$li_processor->set_attribute( 'data-vk-number', $li_number );
				$li_number++;
			}
		}
		$block_content = $li_processor->get_updated_html();
	} else {
		$block_content = $processor->get_updated_html();
	}

	// 色設定の処理
	if ( empty( $block['attrs']['color'] ) ) {
		return $block_content;
	}

	$list_styles = array();
	if ( ! empty( $block['attrs']['className'] ) && strpos( $block['attrs']['className'], 'is-style-vk-numbered-square-mark' ) !== false ) {
		$list_styles = array(
			array(
				'selector'     => ".is-style-vk-numbered-square-mark.{$unique_classname} li::before",
				'declarations' => array(
					'color'            => '#fff',
					'background-color' => vk_blocks_get_color_code( $block['attrs']['color'] ) . ' !important',
				),
			),
		);
	} elseif ( ! empty( $block['attrs']['className'] ) && strpos( $block['attrs']['className'], 'is-style-vk-numbered-circle-mark' ) !== false ) {
		$list_styles = array(
			array(
				'selector'     => ".is-style-vk-numbered-circle-mark.{$unique_classname} li::before",
				'declarations' => array(
					'color'            => '#fff',
					'background-color' => vk_blocks_get_color_code( $block['attrs']['color'] ) . ' !important',
				),
			),
		);
	} else {
		$list_styles = array(
			array(
				'selector'     => ".{$unique_classname} li::marker,.{$unique_classname} li::before",
				'declarations' => array(
					'color' => vk_blocks_get_color_code( $block['attrs']['color'] ) . ' !important',
				),
			),
		);
	}

	wp_style_engine_get_stylesheet_from_css_rules(
		$list_styles,
		array(
			'context' => 'vk-blocks',
		)
	);
	return $block_content;
}
add_filter( 'render_block_core/list', 'vk_blocks_render_core_list', 10, 2 );
