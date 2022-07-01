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
	 * @param object $archives wp_query.
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
			'title'         => esc_html( $attributes['title'] ),
			'postType'      => esc_html( $attributes['postType'] ),
			'archiveType'   => esc_html( $attributes['archiveType'] ),
			'displayDesign' => esc_html( $attributes['displayDesign'] ),
		);

		// Outer Post Type classes.
		$archive_outer_class_post_types = array();
		if ( ! isset( $archives->query['post_type'] ) ) {
			$archive_outer_class_post_types[] = 'vk_posts-postType-post';
		} else {
			if ( is_array( $archives->query['post_type'] ) ) {
				foreach ( $archives->query['post_type'] as $key => $value ) {
					$archive_outer_class_post_types[] = 'vk_posts-postType-' . $value;
				}
			} else {
				$archive_outer_class_post_types[] = 'vk_posts-postType-' . $archives->query['post_type'];
			}
		}

		$archive_outer_class_post_types[] = 'vk_posts-display-' . $options['displayDesign'];

		// Additional archive option.
		$archive_outer_class = implode( ' ', $archive_outer_class_post_types );

		$archive_options = self::get_archive_list_options( $archive_options, $archives );

		if ( ! empty( $archive_options['class_archive_outer'] ) ) {
			$archive_outer_class .= ' ' . $archive_options['class_archive_outer'];
		}

		$html  = '';
		$html .= '<div class="vk_archive_list ' . esc_attr( $archive_outer_class ) . '">';
		$html .= self::get_archive_list_view( $options );
		$html .= '<ul>';
		$html .= $archives;
		$html .= '</ul>';
		$html .= '</div>';

		return $html;
	}

	/**
	 * Get archive list
	 *
	 * @param array $attributes attributes.
	 */
	public static function get_archive_list( $attributes ) {
		$is_checked_post_type = json_decode( $attributes['isCheckedPostType'], true );

		$is_checked_terms = json_decode( $attributes['isCheckedTerms'], true );

		// if ( empty( $is_checked_post_type ) ) {
			// return false;
		// }

		$args = array(
			'type'             => 'monthly',
			'show_post_count ' => true,
			'echo'             => false,
			'post_type'        => 'post',
		);
		return wp_get_archives( $args );
	}

	/**
	 * Get archive list View Options
	 *
	 * @since 1.39.0
	 *
	 * @param array $options options array.
	 * @return array options
	 */
	public static function get_archive_list_view_options( $options ) {
		$default = array(
			'title'         => '',
			'postType'      => 'post',
			'archiveType'   => 'm',
			'displayDesign' => 'list',
		);
		$return  = apply_filters( 'vk_blocks_archive_list_view_options', wp_parse_args( $options, $default ) );
		return $return;
	}

	/**
	 * Archive options
	 *
	 * @param array  $archive_options : archive options.
	 * @param object $archives : object.
	 * @return array $archive_options
	 */
	public static function get_archive_list_options( $archive_options, $archives ) {
		$default = array(
			'class_archives_outer' => null,
		);
		$return  = apply_filters( 'vk_blocks_archive_list_options', wp_parse_args( $archive_options, $default ), $archives );
		return $return;
	}

	/**
	 * Archive view
	 *
	 * @param array $options component options.
	 *
	 * @return string $html
	 */
	public static function get_archive_list_view( $options ) {
		$options = self::get_archive_list_view_options( $options );
		$html    = '';
		$html   .= '<h2 class="vk_archive_list_title">';
		$html   .= $options['title'];
		$html   .= '</h2>';
		return apply_filters( 'vk_blocks_archive_list_view', $html );
	}
}
