<?php
/**
 * VK CSS Optimize
 *
 * @package Lightning
 */

/**
 * VK CSS Tree Shaking Class
 */
if ( ! class_exists( 'VK_CSS_Optimize' ) ) {
	class VK_CSS_Optimize {

		public function __construct() {
			add_action( 'get_header', array( __CLASS__, 'get_html_start' ), 2147483647 );
			add_action( 'shutdown', array( __CLASS__, 'get_html_end' ), 0 );
		public static function get_css_optimize_options(){

			$vk_css_optimize_options = get_option( 'vk_css_optimize_options' );

			if ( ! isset( $vk_css_optimize_options['optimize_css'] ) ) {

				$theme_textdomain = wp_get_theme()->get( 'TextDomain' );

				if ( 'lightning' === $theme_textdomain || 'lightning-pro' === $theme_textdomain ){
					$options = get_option( 'lightning_theme_options' );
				} else if ( 'katawara' === $theme_textdomain ){
					$options = get_option( 'katawara_theme_options' );
				} else {
					$options = get_option( 'vk_blocks_options' );
				}
				if ( isset( $options['optimize_css'] ) ){
					$vk_css_optimize_options = array(
						'optimize_css' => $options['optimize_css'],
					);
				}
				update_option( 'vk_css_optimize_options', $vk_css_optimize_options );
			}

			return $vk_css_optimize_options;
		}


		public static function is_preload(){
			$options = VK_CSS_Optimize::get_css_optimize_options();
			if ( ! empty( $options['optimize_css'] ) && 'optomize-all-css' === $options['optimize_css'] ) {
				return true;
			}
		}

		public static function get_html_start() {
			ob_start( 'VK_CSS_Optimize::css_optimize' );
		}

		public static function get_html_end() {
			if ( ob_get_length() ){
				ob_end_flush();
			}
		}

		public static function css_optimize( $buffer ) {

			$options = VK_CSS_Optimize::get_css_optimize_options();

			// CSS Tree Shaking.
			require_once dirname( __FILE__ ) . '/class-css-tree-shaking.php';
			global $vk_css_tree_shaking_array;
			foreach ( $vk_css_tree_shaking_array as $vk_css_array ) {
				$options['ssl']['verify_peer']      = false;
				$options['ssl']['verify_peer_name'] = false;

				require_once(ABSPATH.'wp-admin/includes/file.php');
				$path_name = $vk_css_array['path'];
				if( WP_Filesystem() ){
					global $wp_filesystem;
					$css = $wp_filesystem->get_contents($path_name);
				}

				$css                                = celtislab\CSS_tree_shaking::extended_minify( $css, $buffer );
				$buffer                             = str_replace(
					'<link rel=\'stylesheet\' id=\'' . $vk_css_array['id'] . '-css\'  href=\'' . $vk_css_array['url'] . '?ver=' . $vk_css_array['version'] . '\' type=\'text/css\' media=\'all\' />',
					'<style id=\'' . $vk_css_array['id'] . '-css\' type=\'text/css\'>' . $css . '</style>',
					$buffer
				);
				$buffer                             = str_replace(
					'<link rel=\'stylesheet\' id=\'' . $vk_css_array['id'] . '-css\'  href=\'' . $vk_css_array['url'] . '\' type=\'text/css\' media=\'all\' />',
					'<style id=\'' . $vk_css_array['id'] . '-css\' type=\'text/css\'>' . $css . '</style>',
					$buffer
				);

			}

			if ( ! empty( $options['optimize_css'] ) && 'optomize-all-css' === $options['optimize_css'] ) {
				// CSS Preload.
				$buffer = str_replace(
					'link rel=\'stylesheet\'',
					'link rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"',
					$buffer
				);
			}

			return $buffer;
		}

	}
	new VK_CSS_Optimize();
}
