import save1_73_0 from './1.73.0/save';

const blockAttributes = {
	tabOptionJSON: {
		type: 'string',
		default: '{}',
	},
	tabSizeSp: {
		type: 'string',
		default: 'fitText',
	},
	tabSizeTab: {
		type: 'string',
		default: 'fitText',
	},
	tabSizePc: {
		type: 'string',
		default: 'fitText',
	},
	firstActive: {
		type: 'number',
		default: 0,
	},
	blockId: {
		type: 'string',
		default: '',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_73_0,
	},
];

export default deprecated;
