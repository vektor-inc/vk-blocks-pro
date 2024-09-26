import save1_75_0 from './1.75.0/save';
import save1_81_1 from './1.81.1/save';

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
	fixedTopPosition: {
		type: 'number',
		default: 50,
	},
	fixedTopPositionUnit: {
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

const blockAttributes2 = {
	...blockAttributes,
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
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_81_1,
	},
	{
		attributes: blockAttributes,
		save: save1_75_0,
	},
];
export default deprecated;
