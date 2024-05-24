import save1_73_0 from './1.73.0/save';

const blockAttributes = {
	tabOptionJSON: {
		type: 'string',
	},
	tabSizeSp: {
		type: 'string',
	},
	tabSizeTab: {
		type: 'string',
	},
	tabSizePc: {
		type: 'string',
	},
	firstActive: {
		type: 'number',
	},
	blockId: {
		type: 'string',
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_73_0,
	},
];
export default deprecated;
