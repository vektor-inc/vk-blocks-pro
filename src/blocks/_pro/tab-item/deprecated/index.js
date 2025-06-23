import save1_75_0 from './1.75.0/save';
import save1_76_2 from './1.76.2/save';

const blockAttributes = {
	tabLabel: {
		type: 'string',
		default: ''
	},
	tabBodyActive: {
		type: 'boolean',
		default: false
	},
	tabColor: {
		type: 'string',
		default: ''
	},
	tabBodyBorderTop: {
		type: 'boolean',
		default: true
	},
	blockId: {
		type: 'string',
		default: ''
	}
};

/* 次回対応おねがいします
const blockAttributes2 = {
	...blockAttributes,
	iconBefore: {
		type: 'string',
		default: ''
	},
	iconAfter: {
		type: 'string',
		default: ''
	},
	iconSizeBefore: {
		type: 'string',
		default: ''
	},
	iconSizeAfter: {
		type: 'string',
		default: ''
	}
};
*/

const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_76_2,
	},
	{
		attributes: blockAttributes,
		save: save1_75_0,
	},
];

export default deprecated;
