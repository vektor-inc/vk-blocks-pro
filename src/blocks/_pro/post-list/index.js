/**
 * post-list block type
 *
 */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';

registerBlockType('vk-blocks/post-list', {
	title: __('Post list', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			layout: 'card',
			col_xs: 1,
			col_sm: 2,
			col_md: 2,
			col_lg: 2,
			col_xl: 2,
			col_xxl: 2,
			display_image: true,
			display_image_overlay_term: true,
			display_excerpt: false,
			display_date: true,
			display_new: true,
			display_taxonomies: false,
			display_btn: true,
			new_date: 7,
			new_text: 'New!!',
			btn_text: 'Read more',
			btn_align: 'text-right',
			numberPosts: 6,
			isCheckedPostType: '["post","page"]',
			order: 'DESC',
			orderby: 'date',
		},
	},
	edit,
});
