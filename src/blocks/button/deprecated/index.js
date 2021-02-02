import save0_0_0 from './0.0.0/save';
import save0_0_1 from './0.0.1/save';
import save0_0_2 from './0.0.2/save';
import save0_0_3 from './0.0.3/save';
import save0_0_4 from './0.0.4/save';
import save0_0_5 from './0.0.5/save';
import save0_41_0 from './0.41.0/save';
import save0_59_0 from './0.59.0/save';
import save0_59_1 from './0.59.1/save';
import save0_60_1 from './0.60.1/save';

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

export const deprecated = [
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_60_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_59_1,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_59_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_41_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_0_5,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_0_4,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_0_3,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_0_2,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save0_0_1,
	},
	{
		attributes: {
			...blockAttributes,
		},
		save0_0_0,
	},
	{
		attributes: {
			...blockAttributes,
			subCaption: {
				type: 'string',
				default: '',
			},
		},
		save0_60_1,
	},
];
