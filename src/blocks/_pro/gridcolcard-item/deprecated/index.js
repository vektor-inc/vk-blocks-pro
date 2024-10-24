import save1_38_0 from './1.38.0/save';
import save1_71_0 from './1.71.0/save';
import save1_87_0 from './1.87.0/save';

const blockAttributes = {
	editLock: {
		type: 'boolean',
		default: false,
	},
	textColor: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	containerSpace: {
		type: 'object',
		default: {
			top: null,
			left: null,
			right: null,
			bottom: null,
		},
	},
	headerImageAspectRatio: {
		type: 'string',
		default: '1.618/1',
	},
	headerImageFit: {
		type: 'boolean',
		default: true,
	},
	headerDisplay: {
		type: 'string',
		default: 'delete',
	},
	footerDisplay: {
		type: 'string',
		default: 'delete',
	},
	borderRadius: {
		type: 'string',
		default: null,
	},
	border: {
		type: 'boolean',
		default: false,
	},
	borderColor: {
		type: 'string',
		default: '#e5e5e5',
	},
	url: {
		type: 'string',
	},
	urlOpenType: {
		type: 'Boolean',
		default: false,
	},
};

// 1.38.0 からの変更で追加したもの
const blockAttributes2 = {
	...blockAttributes,
	borderWidth: {
		type: 'number',
		default: 1,
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_87_0,
	},
	{
		attributes: blockAttributes,
		save: save1_71_0,
	},
	{
		attributes: blockAttributes,
		save: save1_38_0,
	},
];

export default deprecated;
