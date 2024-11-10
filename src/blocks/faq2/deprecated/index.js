import save1_3_9 from './1.3.9/save';
import save1_76_2 from './1.76.2/save';
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
		save: save1_76_2,
	},
	{
		attributes: blockAttributes,
		save: save1_3_9,
	}
];
export default deprecated;
