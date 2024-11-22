import save1_4_1 from './1.4.1/save';
import save1_13_2 from './1.13.2/save';

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
		save: save1_13_2,
	},
	{
		attributes: blockAttributes,
		save: save1_4_1,
	},
];
export default deprecated;
