<?php
/**
 * Minify css
 *
 * @package vk-blocks
 */

/**
 * Minify Css
 *
 * 不要なスペースやタブを削除してcssを最小化する
 *
 * @param string $css css to target minimization.
 *
 * @return string Minimized css.
 */
function vk_blocks_minify_css( $css ) {
	// delete before after space.
	$css = trim( $css );
	// convert tab and br to space.
	$css = preg_replace( '/[\n\r\t]/', '', $css );
	// Change multiple spaces to single space.
	$css = preg_replace( '/\s(?=\s)/', '', $css );
	return $css;
}
