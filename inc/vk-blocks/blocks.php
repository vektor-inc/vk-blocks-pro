<?php
/**
 * Block functions specific for the Gutenberg editor plugin.
 *
 * @package vk-blocks
 */

/**
 * Add Block Category
 *
 * @param array  $categories categories.
 * @param string $post post.
 */
function vk_blocks_blocks_categories( $categories, $post ) {
	global $vk_blocks_prefix;

	foreach ( $categories as $key => $value ) {
		$keys[] = $value['slug'];
	}

	if ( ! in_array( 'vk-blocks-cat', $keys, true ) ) {
		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat',
					'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-blocks' ),
					'icon'  => '',
				),
			)
		);
	}

	if ( ! in_array( 'vk-blocks-cat-layout', $keys, true ) ) {
		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat-layout',
					'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-blocks' ),
					'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
				),
			)
		);
	}

	if ( ! in_array( 'vk-blocks-cat-deprecated', $keys, true ) ) {
		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat-deprecated',
					'title' => $vk_blocks_prefix . __( 'Deprecated Blocks', 'vk-blocks' ),
					'icon'  => '',
				),
			)
		);
	}

	return $categories;
}
add_filter( 'block_categories_all', 'vk_blocks_blocks_categories', 10, 2 );

/**
 * VK Blocks Hide Blocks
 *
 * @param array $metadata Metadata for registering a block type.
 *
 * @return array
 */
function vk_blocks_hide_blocks( $metadata ) {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	foreach ( (array) $vk_blocks_options['disable_block_lists'] as $value ) {
		if ( $value === $metadata['name'] ) {
			$metadata['supports']['inserter'] = false;
		}
	}
	return $metadata;
}
add_filter( 'block_type_metadata', 'vk_blocks_hide_blocks' );
