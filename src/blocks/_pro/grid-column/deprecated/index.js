/* eslint camelcase: 0 */
import save0_57_4 from './0.57.4/save';
import save0_60_1 from './0.60.1/save';

const blockAttributes = {
	name: {
		type: 'string',
		default: 'grid-column-item',
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
};

const deprecated = [
	{
		attributes: blockAttributes,
		save0_60_1,
	},
	{
		attributes: blockAttributes,
		save0_57_4,
	},
];
export default deprecated;
