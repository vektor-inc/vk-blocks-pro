/* eslint camelcase: 0 */
import save0_0_0 from './0.0.0/save';
import save0_60_1 from './0.60.1/save';
import save1_20_5 from './1.20.5/save';

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

/*
1.20.5でcolorをundefinedに変更
*/
const blockAttributes3 = {
	...blockAttributes,
	bgColor: {
		type: 'string',
	},
}

export default [
	{
		attributes: {
			...blockAttributes3
		},
		save: save1_20_5,
	},
	{
		attributes: {
			... blockAttributes
		},
		save: save0_60_1,
	},
	{
		attributes: {
			... blockAttributes2,
			... blockAttributes
		},
		save: save0_0_0,
	},
];
