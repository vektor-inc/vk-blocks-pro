<?php
/**
 * VK_Blocks_TOC class
 *
 * @package vk-blocks
 */

if ( class_exists( 'VK_Blocks_TOC' ) ) {
	return;
}

/**
 * VK_Blocks_TOC
 */
class VK_Blocks_TOC {

	/**
	 * Class instance.
	 *
	 * @var VK_Blocks_TOC|null
	 */
	private static $instance = null;

	/**
	 * Initialize hooks
	 */
	public static function init() {
		if ( ! self::$instance ) {
			self::$instance = new static();
			self::$instance->register_hooks();
		}
		return self::$instance;
	}

	/**
	 * Register hooks
	 */
	protected function register_hooks() {
		add_action( 'admin_menu', array( $this, 'add_custom_fields' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_front_assets' ) );
		add_filter( 'the_content', array( $this, 'mark_content_headings' ), 9 );
	}

	/**
	 * Mark headings in the content
	 *
	 * @param string $content The content.
	 * @return string
	 */
	public function mark_content_headings( $content ) {
		if ( ! has_block( 'vk-blocks/table-of-contents-new' ) ) {
			return $content;
		}

		// カスタム設定を使用している目次ブロックがあるかチェック
		$blocks = parse_blocks( $content );
		$has_custom_levels = false;
		
		foreach ( $blocks as $block ) {
			if ( 'vk-blocks/table-of-contents-new' === $block['blockName'] ) {
				$use_custom_levels = isset( $block['attrs']['useCustomLevels'] ) ? $block['attrs']['useCustomLevels'] : false;
				if ( $use_custom_levels ) {
					$has_custom_levels = true;
					break;
				}
			}
		}

		// カスタム設定を使用している場合は、data-vk-toc-heading属性を付与しない
		if ( $has_custom_levels ) {
			return $content;
		}

		// グローバル設定時のみdata-vk-toc-heading属性を付与
		$options      = get_option( 'vk_blocks_options', array() );
		$levels       = isset( $options['toc_heading_levels'] ) ? $options['toc_heading_levels'] : array( 'h2', 'h3', 'h4', 'h5', 'h6' );
		$levels_regex = implode(
			'|',
			array_map(
				function ( $h ) {
					return substr( $h, 1 );
				},
				$levels
			)
		);
		$pattern     = '/<h(' . $levels_regex . ')(.*?)>/i';
		$replacement = '<h$1$2 data-vk-toc-heading>';
		$content     = preg_replace( $pattern, $replacement, $content );
		return $content;
	}

	/**
	 * Add custom fields to VK Blocks settings page
	 */
	public function add_custom_fields() {
		add_settings_section(
			'VK_Blocks_TOC',
			__( 'Table of Contents Settings', 'vk-blocks-pro' ),
			array( $this, 'section_description' ),
			'vk-blocks-options'
		);

		add_settings_field(
			'vk_blocks_toc_heading_levels',
			__( 'Heading Levels to Include', 'vk-blocks-pro' ),
			array( $this, 'render_heading_levels_field' ),
			'vk-blocks-options',
			'VK_Blocks_TOC'
		);
	}

	/**
	 * Section description
	 */
	public function section_description() {
		echo '<p>' . esc_html__( 'Configure which heading levels should be included in the table of contents.', 'vk-blocks-pro' ) . '</p>';
	}

	/**
	 * Render heading levels field
	 */
	public function render_heading_levels_field() {
		$options        = VK_Blocks_Options::get_options();
		$current_levels = $options['toc_heading_levels'];

		// 現在の最大レベルを取得.
		$max_level = empty( $current_levels ) ? 'h2' : end( $current_levels );

		echo '<select name="vk_blocks_options[toc_heading_levels]" class="regular-text">';
		foreach ( array( 'h2', 'h3', 'h4', 'h5', 'h6' ) as $level ) {
			printf(
				'<option value="%s" %s>%s</option>',
				esc_attr( $level ),
				selected( $level, $max_level, false ),
				esc_html( strtoupper( $level ) )
			);
		}
		echo '</select>';

		echo '<p class="description">' .
			esc_html__( 'Headings from H2 up to the selected level will be included.', 'vk-blocks-pro' ) .
			'</p>';
	}

	/**
	 * Enqueue editor assets
	 */
	public function enqueue_editor_assets() {
		wp_localize_script(
			'vk-blocks-build-js',
			'vkBlocksOptions',
			get_option( 'vk_blocks_options', array() )
		);
	}

	/**
	 * Enqueue front assets
	 */
	public function enqueue_front_assets() {
		if ( has_block( 'vk-blocks/table-of-contents-new' ) ) {
			// カスタム設定を使用している目次ブロックがあるかチェック
			global $post;
			$content = $post->post_content;
			$blocks = parse_blocks( $content );
			$has_custom_levels = false;
			
			foreach ( $blocks as $block ) {
				if ( 'vk-blocks/table-of-contents-new' === $block['blockName'] ) {
					$use_custom_levels = isset( $block['attrs']['useCustomLevels'] ) ? $block['attrs']['useCustomLevels'] : false;
					if ( $use_custom_levels ) {
						$has_custom_levels = true;
						break;
					}
				}
			}

			// カスタム設定の場合、the_content内の見出しを抽出
			$content_headings = array();
			if ( $has_custom_levels ) {
				$content_headings = self::get_headings_from_content( $content );
			}

			wp_localize_script(
				'vk-blocks/table-of-contents-new-script',
				'vkBlocksOptions',
				array_merge(
					get_option( 'vk_blocks_options', array() ),
					array(
						'contentHeadings' => $content_headings,
						'hasCustomLevels' => $has_custom_levels,
					)
				)
			);
		}
	}

	/**
	 * The_content内のh2〜h6を抽出する共通メソッド
	 *
	 * @param string $content 投稿本文.
	 * @return array 見出し情報の配列.
	 */
	public static function get_headings_from_content( $content ) {
		preg_match_all( '/<h([2-6])(.*?)>(.*?)<\\/h\\1>/is', $content, $matches, PREG_SET_ORDER );
		return $matches;
	}
}
