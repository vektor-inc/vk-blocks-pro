import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
// import save1_81_0 from './1.81.0/save';

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

/*
const blockAttributes2 = {
	...blockAttributes,
	headerDisplay: {
		type: 'string',
		default: 'display'
	}
};
*/

const deprecated = [
	{
	//	attributes: blockAttributes2,
	//	save: save1_81_0,
	},
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
