<?php
/**
 * Registers the `vk-blocks/dynamic-text` block.
 *
 * @package vk-blocks
 */

use VektorInc\VK_Helpers\VkHelpers;

/**
 * Dynamic text render callback
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function vk_blocks_new_text_render_callback( $attributes ) {

    $daysAsNewPost = $attributes['daysAsNewPost'];
    $limit = date('Ymd', strtotime("-$daysAsNewPost days"));
    $post_date = get_the_date('Ymd');

	$wrapper_attributes = get_block_wrapper_attributes();
	$result = "<div $wrapper_attributes>";

	if ($post_date >= $limit) {
        $result .= $attributes['content'];
    }
	$result .= '</div>';

    return $result;
}

/**
 * Register Dynamic Text block.
 *
 * @return void
 */
function vk_blocks_register_block_new_text() {
	// Register Style.
	if ( ! is_admin() ) {
		
        wp_register_style(
			'vk-blocks/new-text',
			VK_BLOCKS_DIR_URL . 'build/_pro/new-text/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
        
	}

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/new-text',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'render_callback' => 'vk_blocks_new_text_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_new_text', 99 );
