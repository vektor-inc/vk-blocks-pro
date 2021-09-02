<?php
/**
 * VK Blocks Customize Config
 *
 * @package vk_blocks
 */

/**
 * Vk blocks customize register
 *
 * @param WP_Customize_Manager $wp_customize WP_Customize_Manager instance.
 */
function vk_blocks_customize( $wp_customize ) {
	$vk_blocks_prefix = 'VK Blocks Pro ';

	$wp_customize->add_panel(
		'vk_blocks_setting',
		array(
			'title' => $vk_blocks_prefix . __( 'Setting', 'vk-blocks' ),
		)
	);
}
add_action( 'customize_register', 'vk_blocks_customize' );

require_once dirname( __FILE__ ) . '/balloon.php';
