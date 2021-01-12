import save000 from './0.0.0/save';
import save0601 from './0.60.1/save';

const blockAttributes = {
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
	activeControl: {
		type: 'string',
		default: '{"title":"center","text":"center"}',
	},
};

const deprecated = [
	{
		attributes: {
			...blockAttributes,
			col_xxl: {
				type: 'number',
				default: 3,
			},
		},
		save: save0601,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
