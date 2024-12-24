import save1_4_1 from './1.4.1/save';
import save1_13_2 from './1.13.2/save';
import save1_20_5 from './1.20.5/save';
import save1_78_0 from './1.78.0/save';
import save1_93_0 from './1.93.0/save';

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
	col_xxl: {
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

const blockAttributes2 = {
	...blockAttributes,
	textColor: {
		type: 'string'
	},
	backgroundColor: {
		type: 'string'
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
	paddingTop: {
		type: 'number'
	},
	paddingX: {
		type: 'number'
	},
	paddingBottom: {
		type: 'number'
	},
	marginBottom: {
    	type: 'number',
	    default: null
	},
	unit: {
		type: 'string',
		default: 'px'
	}
}

/* 1.78.0よりあとのバージョンで追加された属性 */
const { rel, ...blockAttributes3 } = blockAttributes2;

const blockAttributes4 = {
	...blockAttributes3,
	linkUrl: {
		type: 'string'
	},
	linkTarget: {
		type: 'string',
		default: ''
	}
}

const deprecated = [
	{
		attributes: blockAttributes4,
		save: save1_93_0,
	},
	{
		attributes: blockAttributes2,
		save: save1_78_0,
	},
	{
		attributes: blockAttributes2,
		save: save1_20_5,
	},
	{
		attributes: blockAttributes2,
		save: save1_13_2,
	},
	{
		attributes: blockAttributes,
		save: save1_4_1,
	},
];
export default deprecated;
