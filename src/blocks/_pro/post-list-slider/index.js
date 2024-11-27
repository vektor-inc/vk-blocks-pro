/**
 * post-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			layout: 'card',
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
			taxQueryRelation: 'AND',
			order: 'DESC',
			orderby: 'date',
		},
	},
	edit,
};
