import save000 from './0.0.0/save';
import save0374 from './0.37.4/save';
import save0400 from './0.40.0/save';
import save0601 from './0.60.1/save';
import save1_0_4 from './1.0.4/save';
import save1_23_0 from './1.23.0/save';
import save1_34_1 from './1.34.1/save';

const blockAttributes = {
	postId: {
		type: 'number',
	},
	name: {
		type: 'string',
		default: '',
	},
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
	display_title: {
		type: 'boolean',
		default: true,
	},
	display_excerpt: {
		type: 'boolean',
		default: true,
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
	btn_align: {
		type: 'string',
		default: 'text-right',
	},
	numberPosts: {
		type: 'number',
		default: 6,
	},
	isCheckedPostType: {
		type: 'string',
		default: '["post"]',
	},
	coreTerms: {
		type: 'string',
		default: '[]',
	},
	isCheckedTerms: {
		type: 'string',
		default: '{}',
	},
	activeControl: {
		type: 'string',
		default: '{"title": "left", "text":"left" ,"button":"right"}',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 150,
	},
	tablet: {
		type: 'number',
		default: 150,
	},
	mobile: {
		type: 'number',
		default: 150,
	},
	clientId: {
		type: 'string',
		default: '',
	}
}

const blockAttributes3 = {
	...blockAttributes2,
	blockId: {
		type: 'string',
		default: ''
	}
}

/*
// 1.34.1 で attributes を変更
const blockAttributes4 = {
	...blockAttributes3,
	clientId: {
		type: 'string'
	},
	blockId: {
		type: 'string',
	}
}
*/

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_34_1
	},
	{
		attributes: blockAttributes3,
		save: save1_23_0
	},
	{
		attributes:blockAttributes3,
		save: save1_0_4
	},
	{
		attributes: blockAttributes2,
		save: save0601,
	},
	{
		attributes: blockAttributes2,
		save: save0400,
	},
	{
		attributes: blockAttributes,
		save: save0374,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
