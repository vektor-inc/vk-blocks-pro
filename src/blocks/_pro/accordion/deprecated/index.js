import save1_3_9 from './1.3.9/save';
import save1_12_0 from './1.12.0/save';

const blockAttributes = {};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_12_0
	},
	{
		attributes: blockAttributes,
		save: save1_3_9,
	}
];
export default deprecated;
