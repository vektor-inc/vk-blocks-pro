<?php
/**
 * TOC Block
 *
 * @package VK Blocks Pro
 */

if ( ! class_exists( 'VK_Blocks_TOC' ) ) {
	/**
	 * TOC Block Class
	 */
	class VK_Blocks_TOC {
		/**
		 * Constructor
		 */
		public function __construct() {
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

			// 見出しタグにdata属性を追加.
			$pattern     = '/<h([2-6])(.*?)>/i';
			$replacement = '<h$1$2 data-vk-toc-heading>';
			$content     = preg_replace( $pattern, $replacement, $content );

			return $content;
		}

		/**
		 * Get TOC settings
		 *
		 * @return array
		 */
		private function get_toc_settings() {
			$options = VK_Blocks_Options::get_options();
			return array(
				'tocHeadingLevels' => $options['tocHeadingLevels'],
			);
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
			$current_levels = $options['tocHeadingLevels'];

			// 現在の最大レベルを取得.
			$max_level = empty( $current_levels ) ? 'h2' : end( $current_levels );

			echo '<select name="vk_blocks_options[tocHeadingLevels]" class="regular-text">';
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
				$this->get_toc_settings()
			);
		}

		/**
		 * Enqueue front assets
		 */
		public function enqueue_front_assets() {
			if ( has_block( 'vk-blocks/table-of-contents-new' ) ) {
				wp_localize_script(
					'vk-blocks/table-of-contents-new-script',
					'vkBlocksOptions',
					$this->get_toc_settings()
				);
			}
		}
	}

	new VK_Blocks_TOC();
}
