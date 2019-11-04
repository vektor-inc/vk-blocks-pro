<?php

class VkBlocksLatestPosts {

	/**
	 * Return html to display latest post list.
	 *
	 * @param $attributes
	 *
	 * @return string
	 */
	public function render_latest_posts( $attributes ) {

		$layout = $attributes['layout'];

		$wp_query = $this->get_loop_query( $attributes );

		if ( $wp_query === false ) {
			return '<div>' . __( 'No Post is selected', 'vk-blocks' ) . '</div>';
		}

		$elm     = '';
		$options = array(
			'layout'             => $layout,
			'slug'               => '',
			'image'              => $attributes['display_image'],
			'image_default_url'  => VK_BLOCKS_URL . 'images/no-image.png',
			'image_overlay_term' => VK_BLOCKS_URL . 'images/no-image.png',
			'excerpt'            => $attributes['display_excerpt'],
			'date'               => $attributes['display_date'],
			'btn'                => false,
			'btn_text'           => __( 'Read more', 'lightning' ),
			'overlay'            => false,
			'new'                => $attributes['display_new'],
			'new_text'           => $attributes['new_text'],
			'new_date'           => $attributes['new_date'],
			'class_outer'        => 'vk_latestPosts_card ' . VK_Component_Posts::get_col_size_classes( $attributes ),
			'class_title'        => '',
			'body_prepend'       => '',
			'body_append'        => '',
		);

		if ( $wp_query->have_posts() ) :

			$elm .= '<div class="vk_latestPosts vk_posts">';

			while ( $wp_query->have_posts() ) {
				$wp_query->the_post();
				$args               = array(
					'class' => 'card_singleTermLabel',
				);
				$options['overlay'] = Vk_term_color::get_single_term_with_color( false, $args );
				$elm               .= VK_Component_Posts::get_view( $wp_query->post, $options );
			} // while ( have_posts() ) {
			$elm .= '</div>';
		endif;

		wp_reset_query();
		wp_reset_postdata();

		return $elm;
	}

	private function isArrayExist( $array ) {
		if ( ! $array ) {
			return false;
		}
	}

	private function format_terms( $isCheckedTerms ) {

		$return             = [];
		$return['relation'] = 'OR';

		foreach ( $isCheckedTerms as $key => $value ) {

			if ( $value !== [] ) {

				$new_array = array(
					'taxonomy' => $key,
					'field'    => 'slug',
					'terms'    => $value,
				);
				array_push( $return, $new_array );
			}
		}
		return $return;
	}

	public function get_loop_query( $attributes ) {

		$isCheckedPostType = json_decode( $attributes['isCheckedPostType'], true );
		$isCheckedTerms    = json_decode( $attributes['isCheckedTerms'], true );

		if ( empty( $isCheckedPostType ) ) {
			return false;
		}

		// $count      = ( isset( $instance['count'] ) && $instance['count'] ) ? $instance['count'] : 10;

		$args = array(
			'post_type'      => $isCheckedPostType,
			'tax_query'      => $this::format_terms( $isCheckedTerms ),
			'paged'          => 1,
			//0で全件取得
			'posts_per_page' => $attributes['numberPosts'],
			'order'          => 'DESC',
			'orderby'        => 'date',
		);

		$wp_query = new WP_Query( $args );

		return $wp_query;
	}

}


/**
 * Gutenberg Callback function.
 *
 * @param $attributes
 *
 * @return string
 */
function vk_blocks_render_latest_posts( $attributes ) {

	$LatestPosts = new VkBlocksLatestPosts();

	return $LatestPosts->render_latest_posts( $attributes );

}
