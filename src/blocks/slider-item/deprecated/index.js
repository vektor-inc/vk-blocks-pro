/* eslint camelcase: 0 */
import save1_9_2 from './1.9.2/save';
import save1_22_1 from './1.22.1/save';
import save1_27_7 from './1.27.7/save';
import save1_34_1 from './1.34.1/save';
import save1_73_0 from './1.73.0/save';
import save1_76_0 from './1.76.0/save';

const blockAttributes = {
	verticalAlignment: {
		type: 'string',
		default: 'center',
	},
	bgColor: {
		type: 'string',
		default: '#ffffff',
	},
	bgImage: {
		type: 'string',
		default: null,
	},
	bgImageTablet: {
		type: 'string',
		default: null,
	},
	bgImageMobile: {
		type: 'string',
		default: null,
	},
	opacity: {
		type: 'number',
		default: 0.5,
	},
	bgSize: {
		type: 'string',
		default: 'repeat',
	},
	padding_left_and_right: {
		type: 'string',
		default: '0',
	},
	padding_top_and_bottom: {
		type: 'string',
		default: '1',
	},
	clientId: {
		type: 'string',
		default: null,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	col_xs: {
		type: 'number',
		default: 1,
	},
	col_sm: {
		type: 'number',
		default: 1,
	},
	col_md: {
		type: 'number',
		default: 1,
	},
	col_lg: {
		type: 'number',
		default: 1,
	},
	col_xl: {
		type: 'number',
		default: 1,
	},
}
const blockAttributes3 = {
	...blockAttributes,
	clientId: {
		type: 'string',
	},
}

const blockAttributes4 = {
	...blockAttributes3,
	bgColor: {
		type: 'string',
	},
}


// 1.34.1 で blockId を追加
const blockAttributes5 = {
	...blockAttributes4,
	blockId: {
		type: 'string',
	},
}

// 1.73.0 で linkUrl, linkTarget を追加
const blockAttributes6 = {
	...blockAttributes5,
	linkUrl: {
		type: 'string'
	},
	linkTarget: {
		type: 'string',
		default: ''
	},
}


export default [
	{
		attributes: blockAttributes6,
		save: save1_76_0,
	},
	{
		attributes: blockAttributes5,
		save: save1_73_0,
	},
	{
		attributes: blockAttributes4,
		save: save1_34_1,
	},
	{
		attributes: blockAttributes4,
		save: save1_27_7,
	},
	{
		attributes: blockAttributes3,
		save: save1_22_1,
	},
	{
		attributes: blockAttributes,
		save: save1_9_2,
	},
];
