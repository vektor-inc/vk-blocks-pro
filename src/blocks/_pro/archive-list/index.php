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
	$archives        = Vk_Blocks_ArchiveList::get_archive_list( $attributes );
	$options_archive = array( 'class_archive_outer' => 'vk_archiveList' );

	return Vk_Blocks_ArchiveList::render_archive_list( $attributes, $archives, $options_archive );
}

/**
 * Register block archive-list
 *
 * @return void
 */
function vk_blocks_register_block_archive_list() {

	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/archive-list',
			VK_BLOCKS_DIR_URL . 'build/archive-list/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'postType'        => array(
						'type'    => 'string',
						'default' => 'post',
					),
					'displayType'     => array(
						'type'    => 'string',
						'default' => 'monthly',
					),
					'displayDropdown' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showCount'       => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'className'       => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_archive_list_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_archive_list', 99 );

