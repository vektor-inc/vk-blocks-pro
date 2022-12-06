<?php
/**
 * Registers custom block style .
 *
 * @package vk-blocks
 */

/**
 * Register Custom block style.
 *
 * @return void
 */
function vk_blocks_custom_register_block_style() {
	$vk_blocks_options = VK_Blocks_Options::get_options();
	$editor_css        = '';
	foreach ( $vk_blocks_options['custom_block_style_lists'] as $custom_block_style ) {
		$inline_style = '';
		// property_inline_styleからCSSを出力
		if ( ! empty( $custom_block_style['property_inline_style'] ) ) {
			// selectorをクラスに変換
			$inline_style .= preg_replace( '/selector/', '.is-style-' . $custom_block_style['property_name'], $custom_block_style['property_inline_style'] );
			$editor_css   .= $inline_style;
		}

		register_block_style(
			$custom_block_style['block_name'],
			array(
				'name'         => $custom_block_style['property_name'],
				'label'        => $custom_block_style['property_label'],
				'inline_style' => vk_blocks_minify_css( $inline_style ),
			)
		);
	}
	// エディターiframe内で読み込ませるため
	wp_add_inline_style( 'wp-edit-blocks', $editor_css );
}
add_action( 'init', 'vk_blocks_custom_register_block_style' );
