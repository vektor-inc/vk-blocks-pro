<?php
/**
 * FaceList Customize.
 */
function vkblocks_face_list_customize( $wp_customize ) {
	$max_faces = 5;
	$max_faces = apply_filters( 'vkblocks_max_faces', $max_faces );
	global $vk_blocks_prefix;

	$wp_customize->add_section(
		'vk_blocks_face_list_setting',
		array(
			'title' =>  __( 'Baloon Face Image Setting', 'vk-blocks-pro' ),
			'panel' => 'vk_blocks_setting',
		)
	);

	for ( $i = 1; $i <= $max_faces; $i++ ) {
		// image.
		$wp_customize->add_setting(
			'vk_blocks_face_option[face_image]['. $i . ']',
			array(
				'default'           => '',
				'type'              => 'option',
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => 'esc_url_raw',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				'vk_blocks_face_option[face_image]['. $i . ']',
				array(
					'label'       => __( 'Face Image ', 'vk-blocks-pro' ) . '[' . $i . '] ',
					'section'     => 'vk_blocks_face_list_setting',
					'settings'    => 'vk_blocks_face_option[face_image]['. $i . ']',
				)
			)
		);
	}

}
add_action( 'customize_register', 'vkblocks_face_list_customize' );
