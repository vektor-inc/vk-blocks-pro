import save1_38_0 from './1.38.0/save';
import save1_71_0 from './1.71.0/save';
import save1_87_0 from './1.87.0/save';
import save1_94_2 from './1.94.2/save';

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
		type: 'string',
		default: '1px',
	},
};

// 1.87.0 からの変更で追加したもの
const blockAttributes3 = {
	...blockAttributes2,
	headerDisplay: {
		type: 'string',
		default: 'display'
	},
	footerDisplay: {
		type: 'string',
		default: 'display'
	},
};

const deprecated = [
	{
		attributes: blockAttributes3,
		save: save1_94_2,
	},
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
