import save1_16_2 from './1.16.2/save';
import save1_16_4 from './1.16.4/save';
import save1_18_1 from './1.18.1/save';
import save1_18_6 from './1.18.6/save';
import save1_29_2 from './1.29.2/save';
import save1_31_0 from './1.31.0/save';
import save1_35_0 from './1.35.0/save';
import save1_39_2 from './1.39.2/save';
import save1_43_0 from './1.43.0/save';
import save1_70_1 from './1.70.1/save';
import save1_72_1 from './1.72.1/save';

const blockAttributes = {
	content: {
		type: 'string',
		source: 'html',
		selector: 'span',
	},
	buttonUrl: {
		type: 'string',
		default: null,
	},
	buttonTarget: {
		type: 'Boolean',
		default: false,
	},
	buttonSize: {
		type: 'string',
		default: 'md',
	},
	buttonType: {
		type: 'string',
		default: '0',
	},
	buttonColor: {
		type: 'string',
		default: 'primary',
	},
	buttonColorCustom: {
		type: 'string',
		default: null,
	},
	buttonAlign: {
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
	subCaption: {
		type: 'string',
		default: '',
	},
}

const blockAttributes3 = {
	...blockAttributes2,
	buttonUrl: {
		type: 'string',
	},
	buttonColorCustom: {
		type: 'string',
	},
	fontAwesomeIconBefore: {
		type: 'string',
	},
	fontAwesomeIconAfter: {
		type: 'string',
	},
	subCaption: {
		type: 'string',
	},
	clientId: {
		type: 'string',
	},
};

const blockAttributes4 = {
	...blockAttributes3,
	blockId: {
		type: 'string',
	},
};

const blockAttributes5 = {
	...blockAttributes4,
	buttonTextColorCustom: {
		type: 'string',
	},
};

const blockAttributes6 = {
	...blockAttributes5,
	buttonWidth: {
		type: 'number',
		default: 0,
	},
};

const blockAttributes7 = {
	...blockAttributes6,
	buttonWidthMobile: {
		type: 'number',
		default: 0,
	},
	buttonWidthTablet: {
		type: 'number',
		default: 0,
	},
	buttonWidth: {
		type: 'number',
		default: 0,
	},
};

const blockAttributes8 = {
	...blockAttributes7,
	old_1_31_0: {
		type: 'string',
		default: true,
	}
};

const blockAttributes9 = {
	...blockAttributes8,
	outerGap: {
		type: 'string',
		default: null,
	},
};

const blockAttributes10 = {
	...blockAttributes9,
	iconSizeBefore: {
		type: 'string',
		default: null,
	},
	iconSizeAfter: {
		type: 'string',
		default: null,
	},
};

const blockAttributes11 = {
	...blockAttributes10,
	buttonEffect: {
		type: 'string',
		default: ''
	},
}

const blockAttributes12 = {
	...blockAttributes11,
	borderRadius: {
		type: 'string',
		default: null
	},
}


export const deprecated = [
	{
		attributes: blockAttributes12,
		save: save1_72_1,
	},
	{
		attributes: blockAttributes11,
		save: save1_70_1,
	},
	{
		attributes: blockAttributes10,
		save: save1_43_0,
	},
	{
		attributes: blockAttributes9,
		save: save1_39_2,
	},
	{
		attributes: blockAttributes8,
		save: save1_35_0,
	},
	{
		attributes: blockAttributes7,
		save: save1_31_0,
	},
	{
		attributes: blockAttributes6,
		save: save1_29_2,
	},
	{
		attributes: blockAttributes4,
		save: save1_18_6,
	},
	{
		attributes: blockAttributes3,
		save: save1_18_1,
	},
	{
		attributes: blockAttributes3,
		save: save1_16_4,
	},
	{
		attributes: blockAttributes2,
		save: save1_16_2,
	},
	// Fix: https://github.com/vektor-inc/vk-blocks-pro/issues/356
	// 独自後方互換処理のための、後方互換を追加
];
