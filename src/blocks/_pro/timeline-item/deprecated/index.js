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

const deprecated = [
	{
		attributes: blockAttributes,
		save: save0591,
	},
];
export default deprecated;
