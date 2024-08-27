import save1_3_2 from './1.3.2/save';
import save1_7_0 from './1.7.0/save';
import save1_9_1 from './1.9.1/save';
import save1_20_5 from './1.20.5/save';
import save1_21_0 from './1.21.0/save';

const blockAttributes = {
	level: {
		type: 'number',
		default: 2,
	},
	align: {
		type: 'string',
	},
	titleStyle: {
		type: 'string',
		default: 'default',
	},
	outerMarginBottom: {
		type: 'number',
		default: 0
	},
	title: {
		type: 'string',
		source: 'html',
		selector: 'span',
		default: '',
	},
	titleColor: {
		type: 'string',
		default: '#000000',
	},
	titleSize: {
		type: 'number',
		default: 2, // version < 0.17.7 は デフォルト値が 2.6
	},
	titleMarginBottom: {
		type: 'number',
		default: 1,
	},
	subText: {
		source: 'html',
		selector: 'p',
		default: '',
	},
	subTextFlag: {
		type: 'string',
		default: 'off'
	},
	subTextColor: {
		type: 'string',
		default: '#000000',
	},
	subTextSize: {
		type: 'number',
		default: 1.2,
	},
	anchor: {
		type: 'string',
		source: 'attribute',
		attribute: 'id',
		selector: '*',
	},
	fontAwesomeIconBefore: {
		type: 'string',
		default: '',
	},
	fontAwesomeIconAfter: {
		type: 'string',
		default: '',
	},
	fontAwesomeIconColor: {
		type: 'string',
		default: '#000000',
	},
};

const blockAttributes2 = {
	...blockAttributes,
	outerMarginBottom: {
		type: 'number',
		default: null
	},
	titleMarginBottom: {
		type: "number",
		default: null
	},
	titleColor: {
		type: "string",
		default: null
	},
	subTextColor: {
		type: "string",
		default: null
	},
	fontAwesomeIconColor: {
		type: 'string',
		default: "#000000",
	},
}

/* 1.9.1 で titleSize とsubTextSize を変更 */
const blockAttributes3 = {
	...blockAttributes2,
	titleSize: {
		type: 'number',
		default: 2,
	},
	subTextSize: {
		type: 'number',
		default: 1.2,
	},
	subTextColor: {
		type: "string",
	},
	subTextSize: {
		type: 'number',
	},
	fontAwesomeIconColor: {
		type: 'string',
	},
}

const blockAttributes4 = {
	...blockAttributes3,
	titleColor: {
		type: "string",
	},
	titleSize: {
		type: 'number',
	},
}

const deprecated = [
	{
		attributes: blockAttributes4,
		save: save1_21_0,
	},
	{
		attributes: blockAttributes4,
		save: save1_20_5,
	},
	{
		attributes: blockAttributes3,
		save: save1_9_1,
	},
	{
		attributes: blockAttributes2,
		save: save1_7_0,
	},
	{
		attributes: blockAttributes,
		save: save1_3_2,
	},
];
export default deprecated;
