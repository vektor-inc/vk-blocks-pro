<?php

//ハンドル名登録
function heading_style_method() {
    wp_enqueue_style(
        'heading-style',
        get_template_directory_uri() . '/src/heading-style/style.css'
    );
}
add_action( 'wp_enqueue_scripts', 'heading_style_method' );


add_action( 'wp_head', 'lightning_print_css_vk_heading_style', 3 );
function lightning_print_css_vk_heading_style() {
	$options = get_option( 'lightning_theme_options' );
	if ( isset( $options['color_key'] ) && isset( $options['color_key_dark'] ) ) {
		$color_key      = esc_html( $options['color_key'] );
		$color_key_dark = esc_html( $options['color_key_dark'] );




		$dynamic_css .= '
		.is-style-vk-heading-speech_balloon_fill,
		.is-style-vk-heading-background_fill,
		.is-style-vk-heading-background_fill_stitch	{ background-color:' . $color_key . '; }
		.is-style-vk-heading-speech_balloon_fill:before,
		.is-style-vk-heading-topborder_background_fill_none,
		.is-style-vk-heading-topborder_background_fill_black,
		.is-style-vk-heading-small_bottomborder::after{ border-top-color:' . $color_key . ';}
		.is-style-vk-heading-double,
		.is-style-vk-heading-solid{ border-top-color:' . $color_key . ';  border-bottom-color:' . $color_key . ';}
		.is-style-vk-heading-double_bottomborder,
		.is-style-vk-heading-solid_bottomborder,
		.is-style-vk-heading-solid_bottomborder_leftkeycolor::after{ border-bottom-color:' . $color_key . ';}
		.is-style-vk-heading-leftborder,
		.is-style-vk-heading-leftborder_nobackground{ border-left-color:' . $color_key . ';}
		.is-style-vk-heading-diagonal_stripe_bottomborder::after{background: linear-gradient(-45deg,rgba(255,255,255,0.1) 25%, ' . $color_key . ' 25%,' . $color_key . ' 50%, rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.1) 75%, ' . $color_key . ' 75%,' . $color_key . '); background-size: 5px 5px;}
		.is-style-vk-heading-brackets::before{ border-top-color:' . $color_key . '; border-bottom-color:' . $color_key . '; border-left-color:' . $color_key . '; }
		.is-style-vk-heading-brackets::after{ border-top-color:' . $color_key . '; border-bottom-color:' . $color_key . '; border-right-color:' . $color_key . '; }
		';

var_dump($color_key);

		// delete before after space
		$dynamic_css = trim( $dynamic_css );
		// convert tab and br to space
		$dynamic_css = preg_replace( '/[\n\r\t]/', '', $dynamic_css );
		// Change multiple spaces to single space
		$dynamic_css = preg_replace( '/\s(?=\s)/', '', $dynamic_css );
		wp_add_inline_style( 'heading-style', $dynamic_css );
	} // if ( isset($options['color_key'] && isset($options['color_key_dark'] ) {
}