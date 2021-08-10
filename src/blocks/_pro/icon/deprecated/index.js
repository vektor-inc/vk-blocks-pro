const blockAttributes = {
	faIcon: {
		type: 'string',
		default: null,
	},
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
	iconAlign: {
		type: 'string',
		default: 'left',
	},
	"iconType": {
		"type": "string",
		"default": "0"
	},
	iconColor: {
		type: 'string',
		default: null,
	},
	iconUrl: {
		type: 'string',
		default: null,
	},
	iconTarget: {
		type: 'Boolean',
		default: false,
	},
};

const blockAttributes2 = {
	...blockAttributes,
}

export const deprecated = [

];
