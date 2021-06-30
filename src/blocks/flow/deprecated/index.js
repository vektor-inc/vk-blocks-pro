import save000 from './0.0.0/save';
import save1_8_0 from './1.8.0/save';


const blockAttributes =  {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'dt',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: 'dd',
	},
	arrowFlag: {
		type: 'string',
		default: 'vk_flow-arrow-on',
	},
	insertImage: {
		type: 'string',
		default: null, // no image by default!
	},
}

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_8_0,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
