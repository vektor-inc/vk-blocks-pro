<?php
/**
 * Registers the `vk-blocks/archive-list` block.
 *
 * @package vk-blocks
 */

/**
 * Archive list render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_archive_list_render_callback( $attributes ) {
	$archives = Vk_Blocks_ArchiveList::get_archive_list( $attributes );
	$options  = array( 'class_archive_outer' => 'vk_archiveList' );

	return Vk_Blocks_ArchiveList::render_archive_list( $attributes, $archives, $options );
}

/**
 * Register block archive-list
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {
	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'title'         => array(
						'type'    => 'string',
						'default' => '',
					),
					'postType'      => array(
						'type'    => 'string',
						'default' => 'post',
					),
					'archiveType'   => array(
						'type'    => 'string',
						'default' => 'm',
					),
					'displayDesign' => array(
						'type'    => 'string',
						'default' => 'list',
					),
					'className'     => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_archive_list_render_callback',
		)
	);

	$the_taxonomies = get_taxonomies(
		array(),
		'objects',
		'and'
	);

	$term_by_taxonomy_name = array();
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms                                        = get_terms( $the_taxonomy->name, array( 'hide_empty' => false ) );
		$term_by_taxonomy_name[ $the_taxonomy->name ] = array_map(
			function( $term ) {
				return array(
					'term_id' => $term->term_id,
					'name'    => $term->name,
				);
			},
			$terms
		);
	}

	wp_localize_script(
		'vk-blocks-build-js',
		'vk_block_archive_type_params',
		array(
			'term_by_taxonomy_name' => $term_by_taxonomy_name,
		)
	);

	wp_localize_script(
		'vk-blocks/archive-list',
		'vk_block_archive_type_params',
		array(
			'term_by_taxonomy_name' => $term_by_taxonomy_name,
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );

