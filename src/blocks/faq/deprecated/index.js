import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save0_58_6 from './0.58.6/save';
import save1_76_2 from './1.76.2/save';

const blockAttributes = {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'dt',
	},
	content: {
		type: 'string',
		source: 'html',
		selector: 'dd',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save000,
	},
	{
		attributes: blockAttributes,
		save: save001,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save: save002,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save: save0_58_6,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save: save1_76_2,
	},
];
export default deprecated;
