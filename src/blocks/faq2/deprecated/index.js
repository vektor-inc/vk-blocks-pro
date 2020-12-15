import save000 from './0.0.0/save';
import save001 from './0.58.7/save';

const blockAttributes = {
	attributes: {
		heading: {
			type: 'string',
			source: 'html',
			selector: 'dt',
		},
		content: {
			type: 'string',
		},
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save000,
	},
	{
		attributes: blockAttributes,
		save: save001,
	},
];
export default deprecated;
