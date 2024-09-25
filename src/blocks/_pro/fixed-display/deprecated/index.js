import save1_75_0 from './1.75.0/save';


const blockAttributes = {
	mode: {
		type: 'string',
		default: 'always-visible',
	},
	position: {
		type: 'string',
		default: 'right',
	},
	scrollTiming: {
		type: 'number',
		default: 0,
	},
	scrollTimingUnit: {
		type: 'string',
		default: 'px',
	},
	scrollPersistVisible: {
		type: 'boolean',
		default: false,
	},
	fixedPositionType: {
		type: 'string',
		default: 'top'
	},
	fixedPositionValue: {
		type: 'number',
		default: 50
	},
	fixedPositionUnit: {
		type: 'string',
		default: 'svh'
	},
	clientId: {
		type: 'string',
	},
	blockId: {
		type: 'string',
	}
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_75_0,
	},
];
export default deprecated;
