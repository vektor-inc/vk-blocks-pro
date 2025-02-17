import save1_13_2 from './1.13.2/save';
import save1_16_1 from './1.16.1/save';
import save1_94_2 from './1.94.2/save';
import save1_95_0 from './1.95.0/save';

const blockAttributes = {
	faIcon: {
		type: 'string',
		default: '<i class="fas fa-user"></i>',
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
	iconType: {
		type: 'string',
		default: '0'
	},
	iconColor: {
		type: 'string',
		default: 'undefined',
	},
	iconUrl: {
		type: 'string',
		default: "",
	},
	iconTarget: {
		type: 'Boolean',
		default: false,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	iconColor: {
		type: 'string',
	},
	iconUrl: {
		type: 'string',
	},
}

const blockAttributes3 = {
	...blockAttributes2,
	iconFontColor: {
		type: 'string',
	},
}

const blockAttributes4 = {
	...blockAttributes3,
	relAttribute: {
		type: 'string',
		default: ''
	},
	linkDescription: {
		type: 'string',
		default: ''
	}
}

/* 次回対応おねがいします
(iconColor のデフォルト値を変更しましたが、save1_95_0 で migrate しているので必要ないかもしれない)
const blockAttributes5 = {
	...blockAttributes4,
	iconColor: {
		type: 'string',
		default: 'inherit'
	}
}
*/

export const deprecated = [
	{
		attributes: blockAttributes4,
		save: save1_95_0,
		migrate: (attributes) => {
			return {
				...attributes,
				iconColor: 'undefined',
			};
		},
	},
	{
		attributes: blockAttributes3,
		save: save1_94_2,
		migrate: (attributes) => {
			return {
				...attributes,
				relAttribute: '',
				linkDescription: '',
			};
		},
	},
	{
		attributes: blockAttributes2,
		save: save1_16_1,
	},
	{
		attributes: blockAttributes,
		save: save1_13_2,
	},
];
