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

	if ( empty( $block['attrs']['color'] ) ) {
		return $block_content;
	}

	$block_content = new WP_HTML_Tag_Processor( $block_content );
	if ( empty( $block['attrs']['ordered'] ) ) {
		$block_content->next_tag(
			array( 'tag_name' => 'ul' )
		);
	} else {
		$block_content->next_tag(
			array( 'tag_name' => 'ol' )
		);
	}
	$unique_classname = wp_unique_id( 'vk_list_' );
	$block_content->add_class( $unique_classname );
	$block_content->get_updated_html();

	$list_styles = array();
	if ( ! empty( $block['attrs']['className'] ) && strpos( $block['attrs']['className'], 'is-style-vk-numbered-square-mark' ) !== false ) {
		$list_styles = array(
			array(
				'selector'     => ".is-style-vk-numbered-square-mark.{$unique_classname} li::before",
				'declarations' => array(
					'color'            => '#fff',
					'background-color' => vk_blocks_get_color_code( $block['attrs']['color'] ),
				),
			),
		);
	} elseif ( ! empty( $block['attrs']['className'] ) && strpos( $block['attrs']['className'], 'is-style-vk-numbered-circle-mark' ) !== false ) {
		$list_styles = array(
			array(
				'selector'     => ".is-style-vk-numbered-circle-mark.{$unique_classname} li::before",
				'declarations' => array(
					'color'            => '#fff',
					'background-color' => vk_blocks_get_color_code( $block['attrs']['color'] ),
				),
			),
		);
	} else {
		$list_styles = array(
			array(
				'selector'     => ".{$unique_classname} li::marker,.{$unique_classname} li::before",
				'declarations' => array(
					'color' => vk_blocks_get_color_code( $block['attrs']['color'] ),
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
