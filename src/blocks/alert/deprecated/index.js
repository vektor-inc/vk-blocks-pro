import save1_79_0 from './1.79.0/save';
import save000 from './0.0.0/save';

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
		save: save1_79_0,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
