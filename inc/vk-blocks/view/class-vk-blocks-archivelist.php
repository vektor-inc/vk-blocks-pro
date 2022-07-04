<?php
/**
 * Class VK Blocks Archiveist
 *
 * @package vk_blocks
 */

/**
 * VK Blocks ArchiveList
 */
class Vk_Blocks_ArchiveList {

	/**
	 * Return html to display archive list.
	 *
	 * @param array  $attributes attributes.
	 * @param object $archives wp_get_archives().
	 * @param array  $options_archive options archive.
	 *
	 * @return string
	 */
	public static function render_archive_list( $attributes, $archives, $options_archive ) {
		if ( ! empty( $attributes['className'] ) ) {
			$options_archive['class_archive_outer'] .= ' ' . $attributes['className'];
		}

		if ( ! isset( $archives ) || false === $archives ) {
			// no archives
			return null;
		}

		$options = array(
			'postType'        => esc_html( $attributes['postType'] ),
			'displayType'     => esc_html( $attributes['displayType'] ),
			'displayDropdown' => $attributes['displayDropdown'] ? true : false,
			'showCount'       => $attributes['showCount'] ? true : false,
		);

		// Outer classes
		$classes   = array();
		$classes[] = 'vk_archive-list-postType-' . $options['postType'];
		if ( $options['displayDropdown'] ) {
			$classes[] = 'vk_archive-list-display-dropdown';
		}
		$outer_classname = implode( ' ', $classes );

		// Additional classes
		if ( ! empty( $options_archive['class_archive_outer'] ) ) {
			$outer_classname .= ' ' . $options_archive['class_archive_outer'];
		}

		$html  = '';
		$html .= '<div class="vk_archive_list ' . esc_attr( $outer_classname ) . '">';

		if ( $options['displayDropdown'] ) {
			// Dropdown
			$html .= '<select name="archive-list-dropdown" onChange="document.location.href=this.options[this.selectedIndex].value;">';
			$html .= '<option value="" ' . selected( $options['displayType'], '', true ) . '>' . __( 'Please select', 'vk-blocks' ) . '</option>';
			$html .= $archives;
			$html .= '</select>';
		} else {
			// list
			$html .= '<ul>';
			$html .= $archives;
			$html .= '</ul>';
		}
		$html .= '</div>';

		return $html;
	}

	/**
	 * Get archive list html
	 *
	 * @param array $attributes attributes.
	 */
	public static function get_archive_list( $attributes ) {
		$get_posts = get_posts(
			array(
				'post_type' => esc_html( $attributes['postType'] ),
			)
		);
		if ( empty( $get_posts ) ) {
			return null;
		}

		$args = array(
			'type'            => esc_html( $attributes['displayType'] ),
			'format'          => $attributes['displayDropdown'] ? 'option' : 'html',
			'show_post_count' => $attributes['showCount'] ? true : false,
			'echo'            => false,
			'post_type'       => esc_html( $attributes['postType'] ),
		);
		return wp_get_archives( $args );
	}
}
