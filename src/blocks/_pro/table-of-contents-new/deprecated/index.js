import save1_78_0 from './1.78.0/save';
import save1_104_0 from './1.104.0/save';
import save1_106_0 from './1.106.0/save';

const blockAttributes = {
	style: {
		type: 'string',
		default: 'default',
	},
	renderHtml: {
		type: 'string',
		default: '',
	},
	open: {
		type: 'string',
		default: 'open',
	},
	className: {
		type: 'string',
		default: '',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	useCustomLevels: {
		type: 'boolean',
		default: false,
	},
	customHeadingLevels: {
		type: 'array',
		default: [],
	},
 	excludedHeadings: {
		type: 'array',
		default: [],
	},
};


const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_106_0,
	},
	{
		attributes: blockAttributes,
		save: save1_104_0,
	},
	{
		attributes: blockAttributes,
		save: save1_78_0,
	},
];
export default deprecated;
