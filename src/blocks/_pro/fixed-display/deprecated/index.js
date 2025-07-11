import save1_75_0 from './1.75.0/save';
import save1_81_1 from './1.81.1/save';
import save1_86_0 from './1.86.0/save';
import save1_93_2 from './1.93.2/save';

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

const blockAttributes3 = {
	...blockAttributes2,
	displayAfterSeconds: {
		type: 'number',
		default: 0
	},
	hideAfterSeconds: {
		type: 'number',
		default: 0
	},
	dontShowAgain: {
		type: 'boolean',
		default: false,
	},
};

/*
const blockAttributes4 = {
	...blockAttributes3,
	closeButtonText: {
		type: 'string',
		default: '✕',
	},
	closeButtonBorderRadius: {
		type: 'string',
		default: '0',
	},
	closeButtonTextColor: {
		type: 'string',
		default: '#ffffff',
	},
	closeButtonBackgroundColor: {
		type: 'string',
		default: '#000000',
	},
};
*/

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_93_2,
	},
	{
		attributes: blockAttributes3,
		save: save1_86_0,
	},
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
