<?php

/*-------------------------------------------*/
/*  Load modules
/*-------------------------------------------*/

if ( ! class_exists( 'VK_Custom_Field_Builder' ) ) {

	global $custom_field_builder_url; // configファイルでpackageの場所を指定
	$custom_field_builder_url = plugins_url() . 'inc/custom-field-builder/package/custom-field-builder.php';
	// $custom_field_builder_url = plugins_url() . 'inc/custom-field-builder/package/custom-field-builder.php';

	require_once('package/custom-field-builder.php');
	require_once('custom-field-setting-config.php');

	// require_once( $custom_field_builder_url);
	$custom_field_builder_url = VK_BLOCKS_INC_URL.'custom-field-builder/package/';
}
