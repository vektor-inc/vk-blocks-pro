import save000 from './0.0.0/save';
import save1_3_9 from './1.3.9/save';
const blockAttributes = {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'dt',
	},
	content: {
		type: 'string',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_3_9,
	},
	{
		attributes: blockAttributes,
		save: save000,
	}
];
export default deprecated;
