import save1_96_2 from './1.96.2/save';

const blockAttributes = {
	iconSize: {
		type: 'number',
		default: 36,
	},
	iconSizeUnit: {
		type: 'string',
		default: 'px',
	},
	iconMargin: {
		type: 'number',
		default: 22,
	},
	iconMarginUnit: {
		type: 'string',
		default: 'px',
	},
	iconRadius: {
		type: 'number',
		default: 50,
	},
	iconsJustify: {
		type: 'string',
		default: 'left',
	},
	iconType: {
		type: 'string',
		default: '0'
	},
};

export const deprecated = [
	{
		attributes: blockAttributes,
		save: save1_96_2,
	},
];
