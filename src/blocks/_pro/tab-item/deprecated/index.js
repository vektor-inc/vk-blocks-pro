import save1_75_0 from './1.75.0/save';
import save1_76_2 from './1.76.2/save';

const blockAttributes = {};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_76_2,
	},
	{
		attributes: blockAttributes,
		save: save1_75_0,
	},
];

export default deprecated;
