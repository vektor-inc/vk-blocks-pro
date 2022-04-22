import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save1_21_0 from './1.21.0/save';
import save1_29_2 from './1.29.2/save';

const blockAttributes = {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'h4',
	},
	color: {
		type: 'string',
		default: 'red',
	},
	faIcon: {
		type: 'string',
		default: '',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	bgColor: {
		type: 'string',
		default: 'transparent',
	},
};

const blockAttributes3 = {
	...blockAttributes2,
	borderColor: {
		type: 'string'
	},
};

const blockAttributes4 = {
	...blockAttributes3,
	color: {
		type: 'string'
	},
};

const deprecated = [
	{
		attributes: blockAttributes4,
		save: save1_29_2,
	},
	{
		attributes: blockAttributes3,
		save: save1_21_0,
	},
	{
		attributes: blockAttributes2,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	}
];
export default deprecated;
