<?php
/**
 * Registers the `vk-blocks/breadcrumb` block.
 *
 * @package vk-blocks
 */

 use VektorInc\VK_Breadcrumb\VkBreadcrumb;

 /**
  * Breadcrumb render callback
  *
  * @param array $attributes Block attributes.
  * @return string
  */
 function vk_blocks_breadcrumb_render_callback( $attributes ) {
	 if ( is_front_page() ) {
		 return '';
	 }
	 $vk_breadcrumb = new VkBreadcrumb();
 
	 $outer_classes = 'vk_breadcrumb';
	 if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
		 $outer_classes .= ' vk_hidden';
	 }
	 if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
		 $outer_classes .= ' vk_hidden-xxl';
	 }
	 if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
		 $outer_classes .= ' vk_hidden-xl';
	 }
	 if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
		 $outer_classes .= ' vk_hidden-lg';
	 }
	 if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
		 $outer_classes .= ' vk_hidden-md';
	 }
	 if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
		 $outer_classes .= ' vk_hidden-sm';
	 }
	 if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
		 $outer_classes .= ' vk_hidden-xs';
	 }
 
	 // block.jsonのSupportsで設定したクラス名やスタイルを取得する
	 $wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $outer_classes ) );
 
	 $breadcrumb_options = array(
		 'id_outer'           => 'vk_breadcrumb',
		 'class_outer'        => 'vk_breadcrumb', // wrapper_attributesを設定した場合、この文字列はパンくずリスト前後のコメントアウトに表示される
		 'wrapper_attributes' => $wrapper_attributes,
		 'class_inner'        => 'vk_breadcrumb_inner',
		 'class_list'         => 'vk_breadcrumb_list',
		 'class_list_item'    => 'vk_breadcrumb_list_item',
	 );
 }
 
 /**
  * Register block breadcrumb
  *
  * @return void
  */
 function vk_blocks_register_block_breadcrumb() {
 
	 // Register Style.
	 if ( ! is_admin() ) {
		 wp_register_style(
			 'vk-blocks/breadcrumb',
			 VK_BLOCKS_DIR_URL . 'build/_pro/breadcrumb/style.css',
			 array(),
			 VK_BLOCKS_VERSION
		 );
	 }
 
	 global $vk_blocks_common_attributes;
	 register_block_type(
		 __DIR__,
		 array(
			 'style'           => 'vk-blocks/breadcrumb',
			 'editor_style'    => 'vk-blocks-build-editor-css',
			 'editor_script'   => 'vk-blocks-build-js',
			 'attributes'      => array_merge(
				 array(
					 'className' => array(
						 'type'    => 'string',
						 'default' => '',
					 ),
				 ),
				 $vk_blocks_common_attributes
			 ),
			 'render_callback' => 'vk_blocks_breadcrumb_render_callback',
		 )
	 );
 }
 add_action( 'init', 'vk_blocks_register_block_breadcrumb', 99 );

/**
 * Registers dynamic separator style globally
 */
function vk_blocks_register_breadcrumb_separator_style() {
	// ブロックの属性からセパレーターデザインの値を取得
	$vk_blocks_options = VK_Blocks_Options::get_options();

	if ( isset( $vk_blocks_options['vk_blocks_pro_breadcrumb_separator'] ) ) {
		$separator_design = $vk_blocks_options['vk_blocks_pro_breadcrumb_separator'];
	} else {
		$separator_design = '';
	}

	// セパレーターのデザインが設定されている場合に動的CSSを生成
	if ( '' !== $separator_design ) {
		// セパレーターの文字列を適切にエスケープ
		$separator_escaped = addslashes( $separator_design );
		$dynamic_css = '<style>li.vk_breadcrumb_list_item:after, .breadcrumb-list li:after { content: "' . $separator_escaped . '"; }</style>';
		echo $dynamic_css; // グローバルにスタイルを出力
	}
}
add_action( 'wp_footer', 'vk_blocks_register_breadcrumb_separator_style' );
 
