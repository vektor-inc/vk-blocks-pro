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
	}

	/**
	 * The_content内のh2〜h6を抽出する共通メソッド
	 *
	 * @param string $content 投稿本文.
	 * @return array 見出し情報の配列.
	 */
	public static function get_headings_from_content( $content ) {
		$blocks   = parse_blocks( $content );
		$headings = array();

		// 再帰的にブロックを探索する関数
		$extract_headings = function ( $block ) use ( &$extract_headings, &$headings ) {
			// core/headingとvk-blocks/headingブロックのみを処理
			if ( in_array( $block['blockName'], array( 'core/heading', 'vk-blocks/heading' ), true ) ) {
				// レベルを取得
				$level = isset( $block['attrs']['level'] ) ? $block['attrs']['level'] : 2;

				// IDを取得（複数のソースをチェック）
				$id = '';
				if ( isset( $block['attrs']['anchor'] ) ) {
					$id = $block['attrs']['anchor'];
				} elseif ( isset( $block['attrs']['id'] ) ) {
					$id = $block['attrs']['id'];
				} elseif ( preg_match( '/id="([^"]+)"/', $block['innerHTML'], $matches ) ) {
					$id = $matches[1];
				}

				// コンテンツを取得
				$content = '';
				if ( preg_match( '/<h[1-6][^>]*>(.*?)<\/h[1-6]>/is', $block['innerHTML'], $matches ) ) {
					$content = wp_strip_all_tags( $matches[1] );
				}

				if ( ! empty( $content ) ) {
					$headings[] = array(
						$level,
						! empty( $id ) ? ' id="' . esc_attr( $id ) . '"' : '',
						$content,
					);
				}
			}

			// インナーブロックがある場合は再帰的に処理
			if ( ! empty( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $inner_block ) {
					$extract_headings( $inner_block );
				}
			}
		};

		// 各ブロックを処理
		foreach ( $blocks as $block ) {
			$extract_headings( $block );
		}

		return $headings;
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
			global $post;
			if ( ! $post ) {
				return;
			}

			$content            = $post->post_content;
			$content_headings   = self::get_headings_from_content( $content );
			$options            = get_option( 'vk_blocks_options', array() );
			$toc_heading_levels = isset( $options['toc_heading_levels'] ) ? $options['toc_heading_levels'] : array( 'h2', 'h3', 'h4', 'h5', 'h6' );

			wp_localize_script(
				'vk-blocks/table-of-contents-new-script',
				'vkBlocksOptions',
				array(
					'contentHeadings'  => $content_headings,
					'tocHeadingLevels' => $toc_heading_levels,
				)
			);
		}
	}
}
