import save1_36_2 from './1.36.2/save';
import save1_20_4 from './1.20.4/save';

const blockAttributes = {
	label: {
		type: 'string',
		default: '6:00AM',
	},
	color: {
		type: 'string',
		default: '#337ab7',
	},
	style: {
		type: 'string',
		default: 'outlined',
	},
	styleLine: {
		type: 'string',
		default: 'default',
	},
	color: {
		type: 'string',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_36_2,
	},
	{
		attributes: blockAttributes,
		save: save1_20_4,
	},
];
export default deprecated;
