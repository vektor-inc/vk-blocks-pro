import save1_20_4 from './1.20.4/save';
import save0591 from './0.59.1/save';

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
};

const blockAttributes2 = {
	...blockAttributes,
	color: {
		type: 'string',
	},
}

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_20_4,
	}, {
		attributes: blockAttributes,
		save: save0591,
	},
];
export default deprecated;