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
			$toc_levels = isset( $options['tocHeadingLevels'] ) ? $options['tocHeadingLevels'] : array( 'h2', 'h3', 'h4' );
			
			return array(
				'allowedHeadingLevels' => array_map(
					function( $level ) {
						return intval( str_replace( 'h', '', $level ) );
					},
					$toc_levels
				),
			);
		}

		/**
		 * Register settings
		 */
		public function register_settings() {
			register_setting(
				'vk_blocks_options',
				'vk_blocks_toc_heading_levels',
				array(
					'type'              => 'array',
					'show_in_rest'      => true,
					'default'           => array( 'h2', 'h3', 'h4' ),
					'sanitize_callback' => array( $this, 'sanitize_heading_levels' ),
				)
			);
		}

		/**
		 * Sanitize heading levels
		 *
		 * @param array $input The input array.
		 */
		public function sanitize_heading_levels( $input ) {
			if ( ! is_array( $input ) ) {
				return array( 'h2', 'h3', 'h4' );
			}

			$allowed_levels = array( 'h2', 'h3', 'h4', 'h5', 'h6' );
			return array_values( array_intersect( $input, $allowed_levels ) );
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
			$options = get_option( 'vk_blocks_toc_heading_levels', array( 'h2', 'h3', 'h4' ) );
			$levels  = array( 'h2', 'h3', 'h4', 'h5', 'h6' );

			foreach ( $levels as $level ) {
				printf(
					'<label><input type="checkbox" name="vk_blocks_toc_heading_levels[]" value="%s" %s> %s</label><br>',
					esc_attr( $level ),
					checked( in_array( $level, $options, true ), true, false ),
					esc_html( strtoupper( $level ) )
				);
			}
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