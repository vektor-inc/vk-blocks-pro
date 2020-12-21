import save000 from './0.0.0';

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
