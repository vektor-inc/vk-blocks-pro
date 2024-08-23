import save1_38_0 from './1.38.0/save';
import save1_71_0 from './1.71.0/save';
import save1_82_0 from './1.82.0/save';

const blockAttributes = {
	editLock: {
		type: 'boolean',
		default: false
	},
	textColor: {
		type: 'string'
	},
	backgroundColor: {
		type: 'string'
	},
	containerSpace: {
		type: 'object',
		default: {
			'top': null,
			'left': null,
			'right': null,
			'bottom': null
		}
	},
	headerImageAspectRatio: {
		type: 'string',
		default: '1.618/1'
	},
	headerImageFit: {
		type: 'boolean',
		default: true
	},
	headerDisplay: {
		type: 'string',
		default: 'display' // デフォルト値を変更
	},
	footerDisplay: {
		type: 'string',
		default: 'display' // デフォルト値を変更
	},
	borderRadius: {
		type: 'string',
		default: null
	},
	border: {
		type: 'boolean',
		default: false
	},
	borderColor: {
		type: 'string',
		default: '#e5e5e5'
	},
	url: {
		type: 'string'
	},
	urlOpenType: {
		type: 'Boolean',
		default: false
	}
};

// 1.38.0 からの変更で追加したもの
const blockAttributes2 = {
	...blockAttributes,
	borderWidth: {
		type: 'number',
		default: 1
	},
};

const blockAttributes3 = {
	...blockAttributes2,
	headerDisplay: {
		type: 'string',
		default: 'delete' // 以前のデフォルト値
	},
	footerDisplay: {
		type: 'string',
		default: 'delete' // 以前のデフォルト値
	},
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_82_0,
		migrate: (attributes) => {
			// 必要に応じて、旧データから新データに変換するロジックをここに追加
			let newAttributes = { ...attributes };
			if (!attributes.headerDisplay) {
				newAttributes.headerDisplay = 'delete';
			}
			if (!attributes.footerDisplay) {
				newAttributes.footerDisplay = 'delete';
			}
			return newAttributes;
		},
	},
	{
		attributes: blockAttributes2,
		save: save1_71_0,
	},
	{
		attributes: blockAttributes,
		save: save1_38_0,
	},
];

export default deprecated;
