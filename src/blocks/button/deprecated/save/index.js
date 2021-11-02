import save0_0_0 from './0.0.0/save';
import save0_0_1 from './0.0.1/save';
import save0_0_2 from './0.0.2/save';
import save0_0_3 from './0.0.3/save';
import save0_0_4 from './0.0.4/save';
import save0_0_5 from './0.0.5/save';
import save0_0_6 from './0.0.6/save';
import save0_41_0 from './0.41.0/save';
import save0_59_0 from './0.59.0/save';
import save0_59_1 from './0.59.1/save';
import save0_60_0 from './0.60.0/save';
import save0_60_1 from './0.60.1/save';
import save1_16_2 from './1.16.2/save';
import save1_16_4 from './1.16.4/save';

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
}

export const deprecated = [
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
	{
		attributes: blockAttributes2,
		save: save0_0_6,
	},
	{
		attributes: blockAttributes2,
		save: save0_60_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_59_1,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_59_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_41_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_5,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_4,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_3,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_2,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save: save0_0_1,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save: save0_0_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save: save0_60_1,
	},
];
