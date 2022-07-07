import save1_31_0 from './1.31.0/save';
import save1_37_0 from './1.37.0/save';

const blockAttributes = {
	colWidthMin: {
		type: 'string',
		default: '300px'
	},
	gap: {
		type: 'string',
		default: '30px'
	},
	gapRow: {
		type: 'string',
		default: null
	},
	overwrite: {
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
		default: 'delete'
	},
	footerDisplay: {
		type: 'string',
		default: 'delete'
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
	}
};

// 1.31.0 からの変更で追加したもの
const blockAttributes2 = {
	...blockAttributes,
	colWidthMinTablet: {
		type: 'string',
		default: '300px'
	},
	colWidthMinPC: {
		type: 'string',
		default: '300px'
	},
	blockId: {
		type: 'string'
	},
	old_1_31_0: {
		type: 'string',
		default: true
	},
};

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_37_0,
	},
	{
		attributes: blockAttributes,
		save: save1_31_0,
	},
];
export default deprecated;
