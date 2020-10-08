<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function vkblocks_is_lightning() {

	// テーマがLightning系の場合読み込まない
	$theme_textdomain = wp_get_theme()->get( 'TextDomain' );
	if ( $theme_textdomain == 'lightning' || $theme_textdomain == 'lightning-pro' || $theme_textdomain == 'katawara'  ) {
		return true;
	}

	$theme_template = wp_get_theme()->get( 'Template' );
	if ( $theme_template == 'lightning' || $theme_template == 'lightning-pro' || $theme_textdomain == 'katawara' ) {
		return true;
	}

	return false;

}

/**
 * カスタマイザー用のチェックボックス
 *
 * @param $checked
 *
 * @return bool
 */
function vkblocks_sanitize_checkbox( $checked ) {
	if ( isset( $checked ) && $checked ) {
		return true;
	} else {
		return false;
	}
}

if ( ! function_exists( 'vkblocks_allow_wp_kses_allowed_html' ) ) {

	/**
	 * Fix block saving for Non-Super-Admins (no unfiltered_html capability).
	 * For Non-Super-Admins, some styles & HTML tags/attributes are removed upon saving,
	 * this allows vkblocks HTML tags & attributes from being saved.
	 *
	 * For every vkblocks block, add the HTML tags and attributes used here.
	 *
	 * @see The list of tags & attributes currently allowed: https://core.trac.wordpress.org/browser/tags/5.2/src/wp-includes/kses.php#L61
	 *
	 * @param array $tags Allowed HTML tags & attributes.
	 * @param string $context The context wherein the HTML is being filtered.
	 *
	 * @return array Modified HTML tags & attributes.
	 */
	function vkblocks_allow_wp_kses_allowed_html( $tags, $context ) {
		// Used by Card, Outer Blocks.
		$tags['style'] = array(
			'type' => true,
		);

		// Used by Table of Contents Blocks.
		$tags['input'] = array(
			'type' => true,
			'id' => true,
		);

		// Used by OuterBlock
		$tags['svg'] = array(
			'viewbox' => true,
			'xmlns' => true,
			'preserveaspectratio' => true,
		);
		$tags['path'] = array(
			'fill' => true,
			'd' => true,
			'strokewidth' => true,
		);

		return $tags;
	}

	add_filter( 'wp_kses_allowed_html', 'vkblocks_allow_wp_kses_allowed_html', 10, 2 );
}

if ( ! function_exists( 'vkblocks_fix_gt_style_errors' ) ) {

	/**
	 * Fix block saving for Non-Super-Admins (no unfiltered_html capability).
	 * For Non-Super-Admins, style tags with the ">" symbol are replaced with
	 * "&gt;", ">" is used across a lot of vkblocks block styles. When these
	 * are replaced, the blocks may show an error, and the blocks styles will
	 * not take effect in the frontend.
	 *
	 * This function checks the page content for vkblocks blocks that use the
	 * "&gt;" in styles, then replaces them with the correct ">" symbol.
	 *
	 * We do the replacement upon post saving and not on `render_block` so that
	 * we don't need to do any processing for the frontend.
	 *
	 * @see Issue: https://core.trac.wordpress.org/ticket/48873#ticket
	 * @see https://github.com/gambitph/vkblocks/issues/510
	 *
	 * @param array $data Post data
	 *
	 * @return array Post data to save
	 */
	function vkblocks_fix_gt_style_errors( $data ) {
		if ( empty( $data['post_content'] ) ) {
			return $data;
		}

		// Check whether there are any "&gt;" symbols inside <style> tags of
		// vkblocks blocks.
		if ( ! preg_match( '%wp:vk-blocks/\w+(.*)?<style>(.*)?&gt;%s', $data['post_content'] ) || ! preg_match( '%wp:vk-blocks/\w+(.*)?<style type="text/css">(.*)?&gt;%s', $data['post_content'] ) ) {
			return $data;
		}

		// Go through each block's "&gt;" and replace them with ">", only do
		// this for vkblocks blocks.
		$data['post_content'] = preg_replace_callback( '%wp:vk-blocks/\w+(.*)?/wp:vk-blocks/\w+%s', function( $matches ) {

			// Replace <style type="text/css">
			return preg_replace_callback( '%<style type="text/css">(.*)?</style>%s', function( $matches ) {
				return '<style type="text/css">' . preg_replace( '%&gt;%', '>', $matches[1] ) . '</style>';
			}, $matches[0] );

			// // Replace <style>
			return preg_replace_callback( '%<style>(.*)?</style>%s', function( $matches ) {
				return '<style>' . preg_replace( '%&gt;%', '>', $matches[1] ) . '</style>';
			}, $matches[0] );

			return $content;
		}, $data['post_content'] );

		return $data;
	}

	add_filter( 'wp_insert_post_data' , 'vkblocks_fix_gt_style_errors' , 99, 1 );
}
