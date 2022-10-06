<?php
/**
 * Block functions specific for the Gutenberg editor plugin.
 *
 * @package vk-blocks
 */

/**
 * VK Blocks Hide Blocks
 *
 * @param array $metadata Metadata for registering a block type.
 *
 * @return array
 */
function vk_blocks_hide_blocks( $metadata ) {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	foreach ( VK_Blocks_Global_Settings::blocks() as $key => $value ) {
		if ( false === $vk_blocks_options['block_manager'][ $value['name'] ]['inserter'] && 'vk-blocks/' . $value['name'] === $metadata['name'] ) {
			$metadata['supports']['inserter'] = false;
		}
	}
	return $metadata;
}
add_filter( 'block_type_metadata', 'vk_blocks_hide_blocks' );
