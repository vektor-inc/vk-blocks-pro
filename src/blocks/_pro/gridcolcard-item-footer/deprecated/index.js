import save1_83_0 from './1.83.0/save';

const blockAttributes = {
	footerDisplay: {
		type: 'string',
		default: 'delete'
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_83_0,
	},
];
export default deprecated;
