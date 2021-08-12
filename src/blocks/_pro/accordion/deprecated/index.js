import save1_3_9 from './1.3.9/save';
import save1_11_2 from './1.11.2/save';

const blockAttributes = {};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_11_2
	},
	{
		attributes: blockAttributes,
		save: save1_3_9,
	}
];
export default deprecated;
