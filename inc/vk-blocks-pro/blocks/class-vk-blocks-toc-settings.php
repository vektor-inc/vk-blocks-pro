<?php
/**
 * TOC Settings
 *
 * @package VK Blocks Pro
 */

if ( ! class_exists( 'VK_Blocks_TOC_Settings' ) ) {
	/**
	 * TOC Settings Class
	 */
	class VK_Blocks_TOC_Settings {
		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'admin_init', array( $this, 'register_settings' ) );
			add_action( 'admin_menu', array( $this, 'add_custom_fields' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_front_assets' ) );
		}

		/**
		 * Get TOC settings
		 */
		private function get_toc_settings() {
			$options = get_option( 'vk_blocks_options', array() );
			return array(
				'allowedHeadingLevels' => array_map(
					function( $level ) {
						return intval( str_replace( 'h', '', $level ) );
					},
					isset( $options['tocHeadingLevels'] ) ? $options['tocHeadingLevels'] : array( 'h2', 'h3', 'h4', 'h5', 'h6' )
				),
			);
		}

		/**
		 * Register settings
		 */
		public function register_settings() {
			register_setting(
				'vk_blocks_options',
				'vk_blocks_options',
				array(
					'type'              => 'object',
					'show_in_rest'      => true,
					'default'           => array(
						'tocHeadingLevels' => array( 'h2', 'h3', 'h4' )
					),
					'sanitize_callback' => array( $this, 'sanitize_options' ),
				)
			);
		}

		/**
		 * Sanitize options
		 *
		 * @param array $input The input array.
		 */
		public function sanitize_options( $input ) {
			if ( isset( $input['tocHeadingLevels'] ) ) {
				$max_level = $input['tocHeadingLevels'];
				$levels = ['h2'];
				$level_numbers = ['h3', 'h4', 'h5', 'h6'];
				$max_index = array_search($max_level, $level_numbers);
				
				if ($max_index !== false) {
					$levels = array_merge($levels, array_slice($level_numbers, 0, $max_index + 1));
				}
				
				$input['tocHeadingLevels'] = $levels;
			}
			return $input;
		}

		/**
		 * Add custom fields to VK Blocks settings page
		 */
		public function add_custom_fields() {
			add_settings_section(
				'vk_blocks_toc_settings',
				__( 'Table of Contents Settings', 'vk-blocks-pro' ),
				array( $this, 'section_description' ),
				'vk-blocks-options'
			);

			add_settings_field(
				'vk_blocks_toc_heading_levels',
				__( 'Heading Levels to Include', 'vk-blocks-pro' ),
				array( $this, 'render_heading_levels_field' ),
				'vk-blocks-options',
				'vk_blocks_toc_settings'
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
			$options = get_option( 'vk_blocks_options', array() );
			$current_levels = isset( $options['tocHeadingLevels'] ) 
				? $options['tocHeadingLevels'] 
				: array( 'h2', 'h3', 'h4' );
			
			// 現在の最大レベルを取得
			$max_level = end($current_levels) ?: 'h2';
			
			echo '<select name="vk_blocks_options[tocHeadingLevels]" class="regular-text">';
			foreach ( array('h2', 'h3', 'h4', 'h5', 'h6') as $level ) {
				printf(
					'<option value="%s" %s>%s</option>',
					esc_attr($level),
					selected($level, $max_level, false),
					esc_html(strtoupper($level))
				);
			}
			echo '</select>';
			
			echo '<p class="description">' . 
				esc_html__('Headings from H2 up to the selected level will be included.', 'vk-blocks-pro') . 
				'</p>';
		}

		/**
		 * Enqueue editor assets
		 */
		public function enqueue_editor_assets() {
			wp_localize_script(
				'vk-blocks-build-js',
				'vkBlocksTocSettings',
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
					'vkBlocksTocSettings',
					$this->get_toc_settings()
				);
			}
		}
	}

	new VK_Blocks_TOC_Settings();
} 