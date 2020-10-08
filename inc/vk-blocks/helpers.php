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


if ( ! function_exists( 'vkblocks_allow_safe_style_css' ) ) {

	/**
	 * Fix block saving for Non-Super-Admins (no unfiltered_html capability).
	 * For Non-Super-Admins, some styles & HTML tags/attributes are removed upon saving,
	 * this allows vkblocks styles from being saved.
	 *
	 * For every vkblocks, add the styles used here.
	 * Inlined styles are the only ones filtered out. Styles inside
	 * <style> tags are okay.
	 *
	 * @see The list of style rules allowed: https://core.trac.wordpress.org/browser/tags/5.2/src/wp-includes/kses.php#L2069
	 *
	 * @param array $styles Allowed CSS style rules.
	 *
	 * @return array Modified CSS style rules.
	 */
	function vkblocks_allow_safe_style_css( $styles ) {

		// var_dump($styles);

		return array_merge( $styles, array(
			'border-radius',
			'background-size',
			'background-repeat',
			'padding-top:',
			'height',
		) );
	}
	add_filter( 'safe_style_css', 'vkblocks_allow_safe_style_css' );
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
		$tags['style'] = array();

		// Used by Separators & Icons.
		$tags['svg'] = array(
			'viewbox' => true,
			'filter' => true,
			'enablebackground' => true,
			'xmlns' => true,
			'class' => true,
			'preserveaspectratio' => true,
			'aria-hidden' => true,
			'data-*' => true,
			'role' => true,
			'height' => true,
			'width' => true,
		);
		$tags['path'] = array(
			'class' => true,
			'fill' => true,
			'd' => true,
			'strokewidth' => true,
		);
		$tags['filter'] = array(
			'id' => true,
		);
		$tags['fegaussianblur'] = array(
			'in' => true,
			'stddeviation' => true,
		);
		$tags['fecomponenttransfer'] = array();
		$tags['fefunca'] = array(
			'type' => true,
			'slope' => true,
		);
		$tags['femerge'] = array();
		$tags['femergenode'] = array(
			'in' => true,
		);
		// SVG gradients.
		$tags['stop'] = array(
			'offset' => true,
			'style' => true,
			'stop-color' => true,
			'stop-opacity' => true,
		);
		$tags['linearGradient'] = array(
			'id' => true,
			'x1' => true,
			'x2' => true,
			'y1' => true,
			'y2' => true,
		);

		_vkblocks_common_attributes( $tags, 'div' );
		_vkblocks_common_attributes( $tags, 'h1' );
		_vkblocks_common_attributes( $tags, 'h2' );
		_vkblocks_common_attributes( $tags, 'h3' );
		_vkblocks_common_attributes( $tags, 'h4' );
		_vkblocks_common_attributes( $tags, 'h5' );
		_vkblocks_common_attributes( $tags, 'h6' );
		_vkblocks_common_attributes( $tags, 'svg' );

		return $tags;
	}

	function _vkblocks_common_attributes( &$tags, $tag ) {
		$tags[ $tag ]['aria-hidden'] = true; // Used by Separators & Icons
		$tags[ $tag ]['aria-expanded'] = true; // Used by Expand block.
		$tags[ $tag ]['aria-level'] = true; // Used by Accordion block.
		$tags[ $tag ]['role'] = true; // Used by Accordion block.
		$tags[ $tag ]['tabindex'] = true; // Used by Accordion block.
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
		if ( ! preg_match( '%wp:ugb/\w+(.*)?<style>(.*)?&gt;%s', $data['post_content'] ) ) {
			return $data;
		}

		// Go through each block's "&gt;" and replace them with ">", only do
		// this for vkblocks blocks.
		$data['post_content'] = preg_replace_callback( '%wp:ugb/\w+(.*)?/wp:ugb/\w+%s', function( $matches ) {
			return preg_replace_callback( '%<style>(.*)?</style>%s', function( $matches ) {
				return '<style>' . preg_replace( '%&gt;%', '>', $matches[1] ) . '</style>';
			}, $matches[0] );
			return $content;
		}, $data['post_content'] );

		return $data;
	}

	add_filter( 'wp_insert_post_data' , 'vkblocks_fix_gt_style_errors' , 99, 1 );
}
