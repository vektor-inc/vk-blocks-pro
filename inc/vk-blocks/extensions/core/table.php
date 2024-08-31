<?php
/**
 * Extensions core table block style .
 *
 * @package vk-blocks
 */

/**
 * Extensions scroll hint to core table block.
 *
 * @param string $block_content The block content.
 * @param array  $block The block settings and attributes.
 * @return string Modified block content.
 */
function vk_blocks_render_core_table( $block_content, $block ) {
	// Check if the block is core/table.
	if ( 'core/table' !== $block['blockName'] ) {
		return $block_content;
	}

	// Check if the block has the 'is-style-vk-table-scrollable' class.
	if ( empty( $block['attrs']['className'] ) || strpos( $block['attrs']['className'], 'is-style-vk-table-scrollable' ) === false ) {
		return $block_content;
	}

	// Load WP_HTML_Tag_Processor class if WordPress version is 6.2 or higher.
	if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor( $block_content );

	// Prepare scroll hint only if <figure> is found.
	if ( $processor->next_tag( array( 'tag_name' => 'figure' ) ) ) {
		$scroll_message_text = ! empty( $block['attrs']['scrollMessageText'] ) ? $block['attrs']['scrollMessageText'] : __( 'You can scroll', 'vk-blocks-pro' );
		$scroll_icon_left    = ! empty( $block['attrs']['scrollIconLeft'] ) ? vk_blocks_extract_icon_class( $block['attrs']['scrollIconLeft'] ) : 'fa-caret-left';
		$scroll_icon_right   = ! empty( $block['attrs']['scrollIconRight'] ) ? vk_blocks_extract_icon_class( $block['attrs']['scrollIconRight'] ) : 'fa-caret-right';
		$scroll_breakpoint   = ! empty( $block['attrs']['scrollBreakpoint'] ) ? $block['attrs']['scrollBreakpoint'] : 'table-scrollable-mobile';

		$scroll_hint = sprintf(
			'<div class="vk-scroll-hint" data-scroll-breakpoint="%s" data-hint-icon-left="%s" data-hint-icon-right="%s">
				<i class="fa-solid %s"></i>
				<span>%s</span>
				<i class="fa-solid %s"></i>
			</div>',
			esc_attr( $scroll_breakpoint ),
			esc_attr( $scroll_icon_left ),
			esc_attr( $scroll_icon_right ),
			esc_attr( $scroll_icon_left ),
			esc_html( $scroll_message_text ),
			esc_attr( $scroll_icon_right )
		);

		// Insert scroll hint before the <figure> tag.
		$block_content = preg_replace( '/(<figure\b[^>]*>)/i', $scroll_hint . '$1', $block_content );
	}

	return $block_content;
}

/**
 * Extracts class names from an HTML string.
 *
 * @param string $html_string The HTML string to extract class from.
 * @return string The extracted class name(s) or an empty string if none found.
 */
function vk_blocks_extract_icon_class( $html_string ) {
	// Use a regular expression to extract the class name
	if ( preg_match( '/class="([^"]+)"/', $html_string, $matches ) ) {
		return $matches[1];
	}
	return '';
}

add_filter( 'render_block', 'vk_blocks_render_core_table', 10, 2 );
