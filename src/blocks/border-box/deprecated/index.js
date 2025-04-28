import save1_21_0 from './1.21.0/save';
import save1_29_2 from './1.29.2/save';
import save1_75_0 from './1.75.0/save';
import save1_102_0 from './1.102.0/save';

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
	bgColor: {
		type: 'string',
		default: 'transparent',
	},
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

const blockAttributes3 = {
	...blockAttributes2,
	bodyAlign: {
		type: 'string'
	}	
}

const blockAttributes4 = {
	...blockAttributes3,
	headingTag: {
		type: 'string',
		default: 'h4'
	}
}

const deprecated = [
	{
		attributes: blockAttributes4,
		save: save1_102_0,
	},
	{
		attributes: blockAttributes3,
		save: save1_75_0,
	},
	{
		attributes: blockAttributes2,
		save: save1_29_2,
	},
	{
		attributes: blockAttributes,
		save: save1_21_0,
	}
];
export default deprecated;
