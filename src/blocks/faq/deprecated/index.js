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
		attributes: {
			...blockAttributes,
		},
		save: save1_76_2,
	},
];
export default deprecated;
