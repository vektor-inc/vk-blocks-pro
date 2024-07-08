import save0591 from './0.59.1/save';

const blockAttributes = {
	style: {
		type: 'string',
		default: 'default',
	},
	renderHtml: {
		type: 'string',
		default: '',
	},
	open: {
		type: 'string',
		default: 'open',
	},
	className: {
		type: 'string',
		default: '',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save0591,
	},
];
export default deprecated;
