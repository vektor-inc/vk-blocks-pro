<?php
/**
 * Registers the `vk-blocks/taxonomy` block.
 * vk-blocks/taxonomy-list にするべきか迷ったが、taxonomy-list だと term のリストではなく taxonomy のリストとも解釈できるため taxonomy とした
 * I was wondering if I should name it vk-blocks/taxonomy-list, but since taxonomy-list can also be interpreted as a list of taxonomies, I named it taxonomy.
 *
 * @package vk-blocks
 */

/**
 * Register Alert block.
 *
 * @return void
 */
function vk_blocks_register_block_taxonomy() {
	// Register Style.
	if ( ! is_admin() ) {
		wp_register_style(
			'vk-blocks/taxonomy',
			VK_BLOCKS_DIR_URL . 'build/_pro/taxonomy/style.css',
			array(),
			VK_BLOCKS_VERSION
		);
	}

	global $vk_blocks_common_attributes;

	register_block_type(
		__DIR__,
		array(
			'style'           => 'vk-blocks/taxonomy',
			'editor_style'    => 'vk-blocks-build-editor-css',
			'editor_script'   => 'vk-blocks-build-js',
			'attributes'      => array_merge(
				array(
					'isSelectedTaxonomy' => array(
						'type'    => 'string',
						'default' => 'category',
					),
					'displayAsDropdown'  => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showHierarchy'      => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showPostCounts'     => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'hideIfEmpty'        => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'showOnlyTopLevel'   => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'className'          => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				$vk_blocks_common_attributes
			),
			'render_callback' => 'vk_blocks_taxonomy_render_callback',
		)
	);
}
add_action( 'init', 'vk_blocks_register_block_taxonomy', 99 );

/**
 * タクソノミーブロックに与える情報
 *
 * @return void
 */
function vk_blocks_taxonomy_enqueue_block_assets() {
	/**
	 * 選択させるタクソノミーのリストを生成し渡す
	 */
	// タクソノミーリストを生成.
	$the_taxonomies = get_taxonomies(
		array(
			'public'  => true,
			'show_ui' => true,
		),
		'objects',
		'and'
	);

	// タクソノミーブロックで使うタクソノミーの選択肢.
	$taxonomy_option_raw = array(
		array(
			'label' => __( 'Please select taxonomy', 'vk-blocks-pro' ),
			'value' => '',
		),
	);
	foreach ( $the_taxonomies as $the_taxonomy ) {
		$terms = get_terms( $the_taxonomy->name );
		if ( ! empty( $terms ) ) {
			$taxonomy_option_raw[] = array(
				'label' => $the_taxonomy->labels->singular_name,
				'value' => $the_taxonomy->name,
			);
		} else {
			// カテゴリーの割り当ててある投稿が一つもないと get_terms で取得できなく、
			// 項目がないとエラーになるため、とりあえずカテゴリーをオプションに追加しておく
			$taxonomy_option_raw[] = array(
				'label' => __( 'Categories', 'vk-blocks-pro' ),
				'value' => 'category',
			);
		}
	}

	// ループでカテゴリーが重複してしまう事があるので重複を削除 //////////////
	// 多次元配列を一次元配列に変換
	$taxonomy_option_raw = array_map( 'serialize', $taxonomy_option_raw );
	// 重複項目を削除
	$taxonomy_option = array_unique( $taxonomy_option_raw );
	// 多次元に戻す
	$taxonomy_option = array_map( 'unserialize', $taxonomy_option );
	// インデックスをリセット
	$taxonomy_option = array_values( $taxonomy_option );

	wp_localize_script(
		'vk-blocks-build-js',
		'vkTaxonomy',
		array(
			'taxonomyOption' => $taxonomy_option,
			'editThemes'     => current_user_can( 'edit_themes' ),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'vk_blocks_taxonomy_enqueue_block_assets' );

/**
 * Render callback of Taxonomy block
 *
 * @param array $attributes Block attributes.
 * @return string block html.
 */
function vk_blocks_taxonomy_render_callback( $attributes ) {
	$attributes = wp_parse_args(
		$attributes,
		array(
			'blockLabel'         => '',
			'isSelectedTaxonomy' => 'category',
			'displayAsDropdown'  => false,
			'showHierarchy'      => false,
			'showPostCounts'     => false,
			'hideIfEmpty'        => false,
			'showOnlyTopLevel'   => false,
			'className'          => '',
		)
	);

	static $block_id = 0;
	++$block_id;

	$content = '';

	$taxonomy    = ! empty( $attributes['isSelectedTaxonomy'] ) ? $attributes['isSelectedTaxonomy'] : 'category';
	$is_dropdown = ! empty( $attributes['displayAsDropdown'] );
	$dropdown_id = 'vk_taxonomy-' . $block_id;

	$taxonomy_data = get_taxonomy( $taxonomy );

	if ( ! empty( $taxonomy_data ) ) {
		$default_label = $taxonomy_data->labels->singular_name;

		$block_label = '' !== $attributes['blockLabel'] ? $attributes['blockLabel'] : $default_label;

		$common_args = array(
			'echo'         => false,
			'show_count'   => ! empty( $attributes['showPostCounts'] ) ? $attributes['showPostCounts'] : false,
			'hide_empty'   => ! empty( $attributes['hideIfEmpty'] ) ? $attributes['hideIfEmpty'] : false,
			'hierarchical' => ( ! empty( $attributes['showHierarchy'] ) && empty( $attributes['showOnlyTopLevel'] ) ) ? $attributes['showHierarchy'] : false,
			'taxonomy'     => $taxonomy,
			'value_field'  => 'slug',
			'orderby'      => 'NAME',
			'order'        => 'ASC',
		);
		if ( ! empty( $attributes['showOnlyTopLevel'] ) ) {
			$common_args['parent'] = 0;
		}
		$common_args = apply_filters( 'vk_blocks_taxlist_args', $common_args ); // 9.13.0.0

		// ドロップダウンの名前を設定
		$name = $taxonomy;
		if ( 'category' === $taxonomy ) {
			$name = 'category_name';
		} elseif ( 'post_tag' === $taxonomy ) {
			$name = 'tag';
		}

		$dropdown_args = array(
			// translators:
			'show_option_all' => sprintf( __( 'All of %s', 'vk-blocks-pro' ), $taxonomy_data->labels->singular_name ),
			'id'              => $dropdown_id,
			'class'           => 'vk_taxonomy__input-wrap vk_taxonomy__input-wrap--select',
			'selected'        => get_query_var( $name ),
			'name'            => $name,
		);

		$list_args = array(
			'style'           => 'list',
			'title_li'        => '',
			'show_option_all' => false,
		);

		$outer_attributes = get_block_wrapper_attributes(
			array(
				'class' => "vk_taxonomy vk_taxonomy--{$taxonomy} vk_taxonomy-outer-wrap",
			)
		);

		$content .= '<div ' . $outer_attributes . '>';
		if ( ! empty( $is_dropdown ) ) {
			$content .= wp_dropdown_categories(
				array_merge(
					$common_args,
					$dropdown_args
				)
			);
		} else {
			$content .= '<ul class="vk_taxonomy-list">';
			$content .= wp_list_categories(
				array_merge(
					$common_args,
					$list_args
				)
			);
			$content .= '</ul>';
		}

		$content .= '</div>';

		$content = apply_filters( 'vk_blocks_taxonomy_content', $content, $name, $is_dropdown, $dropdown_id );
	} elseif ( current_user_can( 'edit_themes' ) ) {
		$content  = '<div class="vk_taxonomy-warning alert alert-warning">';
		$content .= '<div class="vk_taxonomy-label-name text-center">';
		$content .= __( 'VK Taxonomy Block', 'vk-blocks-pro' );
		$content .= '</div>';
		$content .= '<div class="vk_taxonomy-warning_text">';
		$content .= __( 'Specified taxonomy does not exist. Please check your taxonomy settings to display or remove this block.', 'vk-blocks-pro' );
		$content .= '</div>';
		$content .= '</div>';
	}
	return $content;
}

/**
 * Generates the inline script for a categories dropdown field.
 *
 * @param string  $content Block Content.
 * @param string  $name Selected Taxoinomy.
 * @param boolean $is_dropdown Dropdown or not.
 * @param string  $dropdown_id ID of the dropdown field.
 *
 * @return string Returns the dropdown onChange redirection script.
 */
function vk_blocks_taxonomy_add_scripts( $content, $name, $is_dropdown, $dropdown_id ) {
	$script = '';
	if ( ! empty( $_SERVER['REQUEST_URI'] ) ) {
		$current_url = esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) );

		if (
			! empty( $is_dropdown ) &&
			false === strpos( $current_url, 'post-new.php' ) &&
			false === strpos( $current_url, 'post.php' ) &&
			false === strpos( $current_url, 'widgets.php' ) &&
			false === strpos( $current_url, 'site-editor.php' )
		) {
			$script = '
			<script type="text/javascript">
			/* <![CDATA[ */
			( function() {
				var dropdown = document.getElementById( \'' . esc_js( $dropdown_id ) . '\' );
				function onCatChange() {
					if ( !!dropdown.options[ dropdown.selectedIndex ].value ) {
						location.href = \'' . esc_url( home_url() ) . '/?' . $name . '=\' + dropdown.options[ dropdown.selectedIndex ].value;
					}
				}
				dropdown.onchange = onCatChange;
			})();
			/* ]]> */
			</script>
			';
		}
	}

	return $content . $script;
}
add_filter( 'vk_blocks_taxonomy_content', 'vk_blocks_taxonomy_add_scripts', 10, 4 );
