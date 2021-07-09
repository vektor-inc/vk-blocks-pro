const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'span',
	},
	iconUrl: {
		type: 'string',
		default: null,
	},
	iconTarget: {
		type: 'Boolean',
		default: false,
	},
	iconSize: {
		type: 'string',
		default: 'md',
	},
	iconType: {
		type: 'string',
		default: '0',
	},
	iconColor: {
		type: 'string',
		default: null,
	},
	iconAlign: {
		type: 'string',
		default: 'left',
	},
	fontAwesomeIconBefore: {
		type: 'string',
		default: null,
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default: null,
	},
};

const blockAttributes2 = {
	...blockAttributes,
}

export const deprecated = [

];
