import save1_87_0 from './1.87.0/save';

const blockAttributes = {
	footerDisplay: {
		type: 'string',
		default: 'delete'
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_87_0,
	},
];
export default deprecated;
