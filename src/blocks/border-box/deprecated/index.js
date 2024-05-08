import save1_21_0 from './1.21.0/save';
import save1_29_2 from './1.29.2/save';

const blockAttributes = {
	borderColor: {
		type: 'string'
	},
};

const blockAttributes2 = {
	...blockAttributes,
	color: {
		type: 'string'
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_29_2,
	},
	{
		attributes: blockAttributes,
		save: save1_21_0,
	},
];
export default deprecated;
