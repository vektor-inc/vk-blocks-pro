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
	 *
	 * @return string
	 */
	public static function render_archive_list( $attributes ) {

		$options = array(
			'postType'			=> esc_html( $attributes['postType'] ),
			'displayType'		=> ( 'yearly' === $attributes['displayType'] ) ? 'yearly' : 'monthly',
			'displayDropdown'	=> $attributes['displayDropdown'] ? true : false,
			'showCount'			=> $attributes['showCount'] ? true : false,
			'className'			=> esc_html( $attributes['className'] ),
		);

		// Get archive list html
		$archives = self::get_archive_list( $options );

		if ( empty( $archives ) ) {
			// no archives
			return null;
		}

		// wrapper class
		$classes   = array();
		$classes[] = 'vk_archiveList';
		$classes[] = 'vk_archive-list-postType-' . $options['postType'];
		$classes[] = 'vk_archive-list-display-type-' . $options['displayType'];
		if ( $options['displayDropdown'] ) {
			$classes[] = 'vk_archive-list-display-dropdown';
		}
		if ( ! empty( $attributes['className'] ) ) {
			$classes[] .= $options['className'];
		}
		$wrapper_classes = implode( ' ', $classes );

		$block_content ='';

		if ( $options['displayDropdown'] ) {
			// dropdown
			$label = '';
			if ( 'yearly' === $attributes['displayType'] ) {
				$label .= __( 'Please select year', 'vk-blocks' );
			}
			else{
				$label .= __( 'Please select month', 'vk-blocks' );
			}

			$block_content = sprintf(
				'<select name="archive-list-dropdown" onChange="document.location.href=this.options[this.selectedIndex].value;"><option value="">%1$s</option>%2$s</select>',
				$label,
				$archives
			);
		} else {
			// list
			$block_content = sprintf(
				'<ul class="vk_archive-list">%1$s</ul>',
				$archives
			);
		}

		return sprintf(
			'<div class="%1$s">%2$s</div>',
			$wrapper_classes,
			$block_content
		);
	}

	/**
	 * Get archive list html
	 *
	 * @param array $options setting value.
	 *
	 * @return string
	 */
	public static function get_archive_list( $options ) {
		$get_posts = get_posts(
			array(
				'post_type' => $options['postType'],
			)
		);

		if ( empty( $get_posts ) ) {
			return null;
		}

		$arg = array(
			'format'          => $options['displayDropdown'] ? 'option' : 'html',
			'show_post_count' => $options['showCount'],
			'echo'            => false,
			'post_type'       => $options['postType'],
		);

		if ( 'yearly' === $options['displayType'] ) {
			$arg['type'] = 'yearly';
			if ( ! $options['showCount'] && strtoupper( get_locale() ) == 'JA' ) {
				$arg['after'] = '年';
			}
		}

		return wp_get_archives( $arg );
	}
}
