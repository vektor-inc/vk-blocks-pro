import save000 from './0.59.1/save';

const blockAttributes = {
	style: {
		type: 'string',
		default: 'info',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: 'p',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
