import save001 from './0.0.1/save';
import save000 from './0.0.0/save';

const blockAttributes = {
	containerSpace: {
		type: 'object',
		default: {
			top: null,
			left: null,
			right: null,
			bottom: null
		}
	},
	headerImageAspectRatio: {
		type: 'string',
		default: '1.618/1'
	},
	headerImageFit: {
		type: 'boolean',
		default: true
	},
	headerDisplay: {
		type: 'string',
		default: 'delete'
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
