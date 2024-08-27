<<<<<<< HEAD
import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
=======
import save1_21_0 from './1.21.0/save';
import save1_29_2 from './1.29.2/save';
import save1_75_0 from './1.75.0/save';
>>>>>>> develop

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

const deprecated = [
	{
<<<<<<< HEAD
		attributes: {
			...blockAttributes,
			bgColor: {
				type: 'string',
				default: 'transparent',
			},
		},
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
=======
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
>>>>>>> develop
];
export default deprecated;
