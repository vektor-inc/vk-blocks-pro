import save1_73_0 from './1.73.0/save';
import save1_74_0 from './1.74.0/save';
import save1_75_0 from './1.75.0/save';
import save1_78_0 from './1.78.0/save';
import save1_104_0 from './1.104.0/save';

const blockAttributes = {
	tabOptionJSON: {
		type: 'string',
		default: '[]',
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

const blockAttributes2 = {
	...blockAttributes,
	tabDisplayOptionsSp: {
		type: 'string',
		default: 'notSet'
	},
	tabDisplayOptionsTab: {
		type: 'string',
		default: 'notSet'
	},
	tabDisplayOptionsPc: {
		type: 'string',
		default: 'notSet'
	},
	displayManyTabs: {
		type: 'boolean',
		default: false
	}
}

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_104_0,
	},
	{
		attributes: blockAttributes,
		save: save1_78_0,
	},
	{
		attributes: blockAttributes,
		save: save1_75_0,
	},
	{
		attributes: blockAttributes,
		save: save1_74_0,
	},
	{
		attributes: blockAttributes,
		save: save1_73_0,
	},
];

export default deprecated;
