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

	// 番号付きスタイルのクラス名を保持
	if ( ! empty( $block['attrs']['className'] ) ) {
		$class_array = explode( ' ', $block['attrs']['className'] );
		foreach ( $class_array as $class ) {
			if ( strpos( $class, 'is-style-' ) === 0 ) {
				$processor->add_class( $class );
			}
		}
	}

	// 番号付きスタイルでliごとにdata-vk-numberを付与
	$has_numbered_style = ! empty( $block['attrs']['className'] ) && (
		strpos( $block['attrs']['className'], 'is-style-vk-numbered-square-mark' ) !== false ||
		strpos( $block['attrs']['className'], 'is-style-vk-numbered-circle-mark' ) !== false
	);

	if ( $has_numbered_style ) {
		$block_content = vk_blocks_set_number_recursive( $block_content );

		// ルートul/olタグにユニーククラス名とスタイルクラス名を付与
		$root_tag   = ! empty( $block['attrs']['ordered'] ) ? 'ol' : 'ul';
		$root_class = $unique_classname;
		if ( ! empty( $block['attrs']['className'] ) ) {
			$class_array = explode( ' ', $block['attrs']['className'] );
			foreach ( $class_array as $class ) {
				if ( strpos( $class, 'is-style-' ) === 0 ) {
					$root_class .= ' ' . $class;
				}
			}
		}
		$block_content = preg_replace(
			'/<' . $root_tag . '(.*?)class="(.*?)"(.*?)>/',
			'<' . $root_tag . '$1class="$2 ' . $root_class . '"$3>',
			$block_content,
			1,
			$count
		);
		if ( 0 === $count ) {
			// もともとclass属性がなければ追加
			$block_content = preg_replace(
				'/<' . $root_tag . '(.*?)(?=>)/',
				'<' . $root_tag . '$1 class="' . $root_class . '"',
				$block_content,
				1
			);
		}
	} else {
		$block_content = $processor->get_updated_html();
	}

	// 色設定の処理（以前の形式のクラス名がある場合はスキップ）
	if ( $has_deprecated_classname || empty( $block['attrs']['color'] ) ) {
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

if ( ! function_exists( 'vk_blocks_set_number_recursive' ) ) {
	/**
	 * Set number recursively for list items.
	 *
	 * @param string $html HTML content.
	 * @return string
	 */
	function vk_blocks_set_number_recursive( $html ) {
		libxml_use_internal_errors( true );
		$doc = new DOMDocument();
		// phpcs:disable PHPCompatibility.Constants.NewConstants
		$doc->loadHTML( '<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
		// phpcs:enable PHPCompatibility.Constants.NewConstants

		$process_list = function ( $list_element ) use ( &$process_list, $doc ) {
			// reversed属性の有無
			// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$is_reversed = 'ol' === $list_element->nodeName && $list_element->hasAttribute( 'reversed' );
			// 直下liのみ
			$li_nodes = array();
			foreach ( $list_element->childNodes as $child ) {
				if ( $child instanceof DOMElement && 'li' === $child->nodeName ) {
					$li_nodes[] = $child;
				}
			}
			$start = 1;
			if ( 'ol' === $list_element->nodeName && $list_element->hasAttribute( 'start' ) ) {
				$start = intval( $list_element->getAttribute( 'start' ) );
			}
			// phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$li_count  = count( $li_nodes );
			$li_number = $is_reversed ? $li_count + $start - 1 : $start;
			foreach ( $li_nodes as $li ) {
				$li->setAttribute( 'data-vk-number', $li_number );
				// 入れ子リストがあれば再帰
				// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				foreach ( $li->childNodes as $li_child ) {
					if ( $li_child instanceof DOMElement && ( 'ol' === $li_child->nodeName || 'ul' === $li_child->nodeName ) ) {
						$process_list( $li_child );
					}
				}
				// phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
				if ( $is_reversed ) {
					--$li_number;
				} else {
					++$li_number;
				}
			}
		};
		// ルートのol/ulを探して処理
		// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		foreach ( $doc->childNodes as $node ) {
			if ( $node instanceof DOMElement && ( 'ol' === $node->nodeName || 'ul' === $node->nodeName ) ) {
				$process_list( $node );
			}
		}
		// phpcs:enable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$html = $doc->saveHTML();
		$html = preg_replace( '/^<\?xml.*?\?>/', '', $html );
		return $html;
	}
}
