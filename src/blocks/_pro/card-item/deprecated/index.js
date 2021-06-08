import save0_20_2 from './0.20.2/save';
import save0_20_3 from './0.20.3/save';
import save0_20_4 from './0.20.4/save';
import save0_20_5 from './0.20.5/save';
import save0_20_6 from './0.20.6/save';
import save0_60_1 from './0.60.1/save';
import save1_2_4 from './1.2.4/save';

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

const blockAttributes2 = {
	...blockAttributes,
	display_image: {
		type: 'boolean',
		default: true,
	},
	display_image_overlay_term: {
		type: 'boolean',
		default: true,
	},
	display_title: {
		type: 'boolean',
		default: true,
	},
	display_excerpt: {
		type: 'boolean',
		default: true,
	},
};

const blockAttributes3 = {
	...blockAttributes2,
	col_xxl: {
		type: 'number',
		default: 3,
	},
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_2_4,
	},
	{
		attributes: blockAttributes3,
		save: save0_60_1,
	},
	{
		attributes: blockAttributes2,
		save: save0_20_6,
	},
	{
		attributes: blockAttributes2,
		save: save0_20_5,
	},
	{
		attributes: blockAttributes2,
		save: save0_20_4,
	},
	{
		attributes: blockAttributes2,
		save: save0_20_3,
	},
	{
		attributes: blockAttributes,
		save: save0_20_2,
	},
];

export default deprecated;
