<?php
/**
 * Call Page Block
 *
 * @package VK All in One Expansion Unit
 */

class VK_Page_Content_Block {

	// Constructor
	public function __construct() {
		add_action( 'init', array( __CLASS__, 'register_block' ), 15 );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'load_scripts' ) );
		add_filter( 'vk_page_content', 'do_blocks', 9 );
		add_filter( 'vk_page_content', 'wptexturize' );
		add_filter( 'vk_page_content', 'convert_smilies', 20 );
		add_filter( 'vk_page_content', 'shortcode_unautop' );
		add_filter( 'vk_page_content', 'prepend_attachment' );
		add_filter( 'vk_page_content', 'wp_filter_content_tags' );
		add_filter( 'vk_page_content', 'do_shortcode', 11 );
		add_filter( 'vk_page_content', 'capital_P_dangit', 11 );
	}

	public static function register_block() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		global $vk_blocks_common_attributes;
		register_block_type(
			'vk-blocks/page-content',
			array(
				'editor_script'   => 'veu-block',
				'editor_style'    => 'veu-block-editor',
				'attributes'      => array_merge(
					array(
						'className'      => array(
							'type'    => 'string',
							'default' => '',
						),
						'TargetPost'         => array(
							'type'    => 'number',
							'default' => -1
						),
					),
					$vk_blocks_common_attributes
				),
				'supports' => [],
				'render_callback' => array( __CLASS__, 'block_callback'),
			)
		);
	}

	/**
	 * Rendering Call Page Block
	 *
	 * @param array $attributes attributes.
	 * @param html  $content content.
	 */
	public static function block_callback( $attributes, $content = '' ) {

		$page_content_id = ! empty( $attributes['TargetPost'] ) ? $attributes['TargetPost'] : -1;
		$page_content    = get_post( $page_content_id )->post_content;
		self::load_scripts( $page_content );

		$vk_blocks_options  = vkblocks_get_options();
		if ( has_block( 'vk-blocks/faq2', $page_content ) || has_block( 'vk-blocks/faq', $page_content ) ) {
			if ( 'open' === $vk_blocks_options['new_faq_accordion'] ) {
				$page_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-open', $page_content );
			} elseif ( 'close' === $vk_blocks_options['new_faq_accordion'] ) {
				$page_content = str_replace( '[accordion_trigger_switch]', 'vk_faq-accordion vk_faq-accordion-close', $page_content );
			} else {
				$page_content = str_replace( '[accordion_trigger_switch]', '', $page_content );
			}
		}
		$page_content = str_replace('[br-xs]','<br class="vk_responsive-br vk_responsive-br-xs"/>', $page_content);
		$page_content = str_replace('[br-sm]','<br class="vk_responsive-br vk_responsive-br-sm"/>', $page_content);
		$page_content = str_replace('[br-md]','<br class="vk_responsive-br vk_responsive-br-md"/>', $page_content);
		$page_content = str_replace('[br-lg]','<br class="vk_responsive-br vk_responsive-br-lg"/>', $page_content);
		$page_content = str_replace('[br-xl]','<br class="vk_responsive-br vk_responsive-br-xl"/>', $page_content);
		$page_content = str_replace('[br-xxl]','<br class="vk_responsive-br vk_responsive-br-xxl"/>', $page_content);

		$classes = '';
		$page_html = '';

		if ( -1 !== $page_content_id ) {
			$classes .= 'vk_pageContent';
			if ( isset( $attributes['TargetPost'] ) ) {
				$classes .= ' vk_pageContent-id-' . $page_content_id;
			}
			if ( isset( $attributes['className'] ) ) {
				$classes .= ' ' . $attributes['className'];
			}
			if ( isset( $attributes['vkb_hidden'] ) && $attributes['vkb_hidden'] ) {
				$classes .= ' vk_hidden';
			}
			if ( isset( $attributes['vkb_hidden_xxl'] ) && $attributes['vkb_hidden_xxl'] ) {
				$classes .= ' vk_hidden-xxl';
			}
			if ( isset( $attributes['vkb_hidden_xl_v2'] ) && $attributes['vkb_hidden_xl_v2'] ) {
				$classes .= ' vk_hidden-xl';
			}
			if ( isset( $attributes['vkb_hidden_lg'] ) && $attributes['vkb_hidden_lg'] ) {
				$classes .= ' vk_hidden-lg';
			}
			if ( isset( $attributes['vkb_hidden_md'] ) && $attributes['vkb_hidden_md'] ) {
				$classes .= ' vk_hidden-md';
			}
			if ( isset( $attributes['vkb_hidden_sm'] ) && $attributes['vkb_hidden_sm'] ) {
				$classes .= ' vk_hidden-sm';
			}
			if ( isset( $attributes['vkb_hidden_xs'] ) && $attributes['vkb_hidden_xs'] ) {
				$classes .= ' vk_hidden-xs';
			}

			$page_html .= '<div class="' . $classes . '">';
			$page_html .= apply_filters( 'vk_page_content', $page_content );
			$page_html .= '</div>';

			$url = get_edit_post_link( $page_content_id );
			if ( $url ) {
				$page_html .= '<a href="' . esc_url( $url ) . '" class="vk_pageContent_editBtn btn btn-outline-primary btn-sm veu_adminEdit" target="_blank">' . __( 'Edit this area', 'vk-blocks' ) . '</a>';
			}

		}
		return $page_html;

	}

	/**
	 * Load Scripts
	 *
	 * @param html $page_content Contents
	 */
	public static function load_scripts( $page_content ) {
		if ( has_block( 'vk-blocks/faq2', $page_content ) || has_block( 'vk-blocks/faq', $page_content ) ) {
			wp_enqueue_script( 'vk-blocks-faq2', VK_BLOCKS_URL . 'build/faq2.min.js', array(), VK_BLOCKS_VERSION, true );
		}
		if ( has_block( 'vk-blocks/animation', $page_content ) ) {
			wp_enqueue_script( 'vk-blocks-animation', VK_BLOCKS_URL . 'build/vk-animation.min.js', array(), VK_BLOCKS_VERSION, true );
		}
		if ( has_block( 'vk-blocks/slider', $page_content ) ) {
			wp_enqueue_style( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.css', array(), VK_BLOCKS_VERSION );
			wp_enqueue_script( 'vk-blocks-swiper', VK_BLOCKS_URL . 'build/swiper.min.js', array(), VK_BLOCKS_VERSION, true );
			wp_enqueue_script( 'vk-blocks-slider', VK_BLOCKS_URL . 'build/vk-slider.min.js', array( 'vk-blocks-swiper' ), VK_BLOCKS_VERSION, true );
		}
	}
}
new VK_Page_Content_Block();
