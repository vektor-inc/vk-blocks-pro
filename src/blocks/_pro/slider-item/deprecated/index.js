/* eslint camelcase: 0 */
import save0_0_0 from './0.0.0/save';

const blockAttributes = {
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

export default [
	{
		attributes: blockAttributes,
		save0_0_0,
	},
];
