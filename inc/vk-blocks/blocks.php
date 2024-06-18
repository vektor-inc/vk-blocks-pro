<?php
/**
 * Block functions specific for the Gutenberg editor plugin.
 *
 * @package vk-blocks
 */

/**
 * Add Block Category
 *
 * @param array $categories categories.
 */
function vk_blocks_blocks_categories( $categories ) {
	global $vk_blocks_prefix;
	$options = VK_Blocks_Options::get_options();

	foreach ( $categories as $key => $value ) {
		$keys[] = $value['slug'];
	}

	if ( ! empty( $options['block_category_position'] ) && 'above-core-blocks' === $options['block_category_position']) {
		if ( ! in_array( 'vk-blocks-cat-layout', $keys, true ) ) {
			$categories = array_merge(
				array(
					array(
						'slug'  => 'vk-blocks-cat-layout',
						'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-blocks-pro' ),
						'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
					),
				),
				$categories
			);
		}

		if ( ! in_array( 'vk-blocks-cat', $keys, true ) ) {
			$categories = array_merge(
				array(
					array(
						'slug'  => 'vk-blocks-cat',
						'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-blocks-pro' ),
						'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
					),
				),
				$categories
			);
		}
	} else {

		if ( ! in_array( 'vk-blocks-cat', $keys, true ) ) {
			$categories = array_merge(
				$categories,
				array(
					array(
						'slug'  => 'vk-blocks-cat',
						'title' => $vk_blocks_prefix . __( 'Blocks', 'vk-blocks-pro' ),
						'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
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
						'title' => $vk_blocks_prefix . __( 'Blocks Layout', 'vk-blocks-pro' ),
						'icon'  => '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>',
					),
				)
			);
		}
	}

	if ( ! in_array( 'vk-blocks-cat-deprecated', $keys, true ) ) {
		$categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'vk-blocks-cat-deprecated',
					'title' => $vk_blocks_prefix . __( 'Deprecated Blocks', 'vk-blocks-pro' ),
					'icon'  => '',
				),
			)
		);
	}

	return $categories;
}

/*
Priority
10 - Exunit
11 - Video Block
12 - VK Filter Search
13 - VK Blocks
*/
add_filter( 'block_categories_all', 'vk_blocks_blocks_categories', 13, 2 ); // ExUnit を 先に処理するために priority 11 に設定

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

/**
 * Register block style.
 *
 * @return void
 */
function vk_blocks_register_block_style() {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	$block_style_lists = VK_Blocks_Global_Settings::block_style_lists();
	foreach ( $block_style_lists as $block_name => $style_properties_lists ) {
		foreach ( $style_properties_lists as $style_properties ) {
			if ( ! empty( $vk_blocks_options['disable_block_style_lists'] ) ) {
				$is_disable = array_filter(
					$vk_blocks_options['disable_block_style_lists'],
					function ( $disable_block_style_list ) use ( $block_name, $style_properties ) {
						return $block_name === $disable_block_style_list['block_name'] && in_array( $style_properties['name'], $disable_block_style_list['property_name'], true );
					}
				);
				if ( ! empty( $is_disable ) ) {
					continue;
				}
			}

			$directory_name = $block_name;
			$directory_name = preg_replace( '/-/', '/' . $block_name, $directory_name );
			$src_path       = VK_BLOCKS_DIR_PATH . 'build/extensions/' . $directory_name . '/style.css';
			$is_load_style  = ! is_admin() && VK_Blocks_Block_Loader::should_load_separate_assets() && file_exists( $src_path );
			$src_url        = VK_BLOCKS_DIR_URL . 'build/extensions/' . $directory_name . '/style.css';
			$style_handle   = 'vk-blocks/' . $block_name;
			if ( $is_load_style ) {
					wp_register_style(
						$style_handle,
						$src_url,
						array(),
						VK_BLOCKS_VERSION
					);
			}

			register_block_style(
				$block_name,
				array(
					'name'         => $style_properties['name'],
					'label'        => $style_properties['label'],
					'style_handle' => $is_load_style ? $style_handle : null,
				)
			);
		}
	}
}
add_action( 'init', 'vk_blocks_register_block_style' );
