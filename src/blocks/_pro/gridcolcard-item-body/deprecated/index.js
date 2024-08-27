import save1_64_2 from './1.64.2/save';
import save1_64_0 from './1.64.0/save';

const blockAttributes = {
	verticalAlignment: {
		type: "string"
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_64_2,
	},
	{
		attributes: blockAttributes,
		save: save1_64_0,
	}
];
export default deprecated;
