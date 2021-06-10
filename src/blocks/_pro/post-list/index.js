/**
 * post-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Post list', 'vk-blocks'),
	icon: <Icon />,
	description: __('Displays the list of posts by setting the post type, classification, and number of posts to display.', 'vk-blocks'),
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
			display_author: false,
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
};
