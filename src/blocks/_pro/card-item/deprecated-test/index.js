import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0202 from './0.20.2/save';
import save0203 from './0.20.3/save';

import { __ } from '@wordpress/i18n';
import { fixBrokenUnicode } from './0.20.3/node_modules/@vkblocks/utils/depModules';
import { RichText, MediaUpload, InnerBlocks } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { dispatch } from '@wordpress/data';

import { convertToGrid } from './0.20.3/node_modules/@vkblocks/utils/convert-to-grid';

const blockAttributes = {
	layout: {
		type: 'string',
		default: 'card',
	},
	col_xs: {
		type: 'number',
		default: 1,
	},
	col_sm: {
		type: 'number',
		default: 2,
	},
	col_md: {
		type: 'number',
		default: 3,
	},
	col_lg: {
		type: 'number',
		default: 3,
	},
	col_xl: {
		type: 'number',
		default: 3,
	},
	display_image: {
		type: 'boolean',
		default: true,
	},
	display_image_overlay_term: {
		type: 'boolean',
		default: true,
	},
	display_date: {
		type: 'boolean',
		default: false,
	},
	display_new: {
		type: 'boolean',
		default: true,
	},
	display_btn: {
		type: 'boolean',
		default: true,
	},
	new_date: {
		type: 'number',
		default: 7,
	},
	new_text: {
		type: 'string',
		default: 'New!!',
	},
	btn_text: {
		type: 'string',
		default: 'Read more',
	},
	title: {
		type: 'string',
		source: 'html',
		selector: 'h5.vk_post_title.card-title',
	},
	excerpt_text: {
		type: 'string',
		source: 'html',
		selector: 'p.vk_post_excerpt.card-text',
	},
	image: {
		type: 'string',
		default: null,
	},
	url: {
		type: 'string',
		default: '',
	},
	activeControl: {
		type: 'string',
		default: '{"title": "left", "text":"left" ,"button":"right"}',
	},
	linkTarget: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'target',
	},
	rel: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'rel',
	},
};

import CardItem0_20_2 from './0.20.2/index';

export const deprecated = [
	{
		attributes: {
			...blockAttributes,
			display_title: {
				type: 'boolean',
				default: true,
			},
			display_excerpt: {
				type: 'boolean',
				default: true,
			},
		},
		save0203,
	},
	CardItem0_20_2,

	{
		attributes: blockAttributes,
		save002,
	},
	{
		attributes: blockAttributes,
		save001,
	},
	{
		attributes: blockAttributes,
		save000,
	},
];
