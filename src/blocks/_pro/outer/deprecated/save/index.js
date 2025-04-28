import save1_0_13 from './1.0.13/save';
import save1_26_0 from './1.26.0/save';
import save1_34_1 from './1.34.1/save';
import save1_36_2 from './1.36.2/save';
import save1_50_1 from './1.50.1/save';
import save1_60_0 from './1.60.0/save';
import save1_61_2 from './1.61.2/save';
import save1_64_0 from './1.64.0/save';
import save1_71_0 from './1.71.0/save';
import save1_76_0 from './1.76.0/save';
import save1_89_0 from './1.89.0/save';
import save1_92_1 from './1.92.1/save';
import save1_93_0 from './1.93.0/save';
import save1_93_2 from './1.93.2/save';
import save1_101_0 from './1.101.0/save';
import save1_102_0 from './1.102.0/save';

const blockAttributes = {
	bgColor: {
		type: 'string',
		default: '#f3f4f5',
	},
	bgImage: {
		type: 'string',
		default: null,
	},
	outerWidth: {
		type: 'string',
		default: 'normal',
	},
	bgPosition: {
		type: 'string',
		default: 'normal',
	},
	padding_left_and_right: {
		type: 'string',
		default: '0',
	},
	padding_top_and_bottom: {
		type: 'string',
		default: '1',
	},
	opacity: {
		type: 'number',
		default: 0.5,
	},
	upper_level: {
		type: 'number',
		default: 0,
	},
	lower_level: {
		type: 'number',
		default: 0,
	},
	dividerType: {
		type: 'string',
		default: 'tilt',
	},
	upperDividerBgColor: {
		type: 'string',
		default: '#fff',
	},
	lowerDividerBgColor: {
		type: 'string',
		default: '#fff',
	},
	borderWidth: {
		type: 'number',
		default: 0,
	},
	borderStyle: {
		type: 'string',
		default: 'none',
	},
	borderColor: {
		type: 'string',
		default: '#fff',
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
	defaultBgColor: {
		type: 'string',
		default: '#f3f4f5',
	},
	bgImageTablet: {
		type: 'string',
		default: null,
	},
	bgImageMobile: {
		type: 'string',
		default: null,
	},
	clientId: {
		type: 'string',
		default: null,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	innerSideSpaceValuePC: {
		type: "number",
		default: 0
	},
	innerSideSpaceValueTablet: {
		type: "number",
		default: 0
	},
	innerSideSpaceValueMobile: {
		type: "number",
		default: 0
	},
	innerSideSpaceUnit: {
		type: "string",
		default: "px"
	},
};


// 1.34.1 から attributes を変更
const blockAttributes3 = {
	...blockAttributes2,
	clientId: {
		type: 'string',
	},
	blockId: {
		type: 'string',
	},
};

// 1.61.2 から attributes を変更
const blockAttributes4 = {
	...blockAttributes3,
	levelSettingPerDevice: {
		type: 'boolean',
		default: false
	},
	upper_level_mobile: {
		type: 'number',
		default: 0
	},
	upper_level_tablet: {
		type: 'number',
		default: 0
	},
	upper_level_pc: {
		type: 'number',
		default: 0
	},
	lower_level_mobile: {
		type: 'number',
		default: 0
	},
	lower_level_tablet: {
		type: 'number',
		default: 0
	},
	lower_level_pc: {
		type: 'number',
		default: 0
	},
};

// 1.64.0 から attributes を変更
const blockAttributes5 = {
	...blockAttributes4,
	minHeightValuePC: {
		type: 'number',
		default: 0
	},
	minHeightValueTablet: {
		type: 'number',
		default: 0
	},
	minHeightValueMobile: {
		type: 'number',
		default: 0
	},
	minHeightUnit: {
		type: 'string',
		default: 'px'
	},
};

// 1.71.0 から attributes を変更
const blockAttributes6 = {
	...blockAttributes5,
	linkUrl: {
		type: 'string',
	},
	linkTarget: {
		type: 'string',
		default: ''
	},
};

// 1.76.0 から attributes を変更
const blockAttributes7 = {
	...blockAttributes6,
	relAttribute: {
		type: 'string',
		default: '',
	},
	linkDescription: {
		type: 'string',
		default: '',
	},
};

// save1_89_0 から attributes を変更
const blockAttributes8 = {
	...blockAttributes7,
	bgFocalPointPC: {
		type: 'object',
		default: { 'x': 0.5, 'y': 0.5 }
	},
	bgFocalPointTablet: {
		type: 'object',
		default: { 'x': 0.5, 'y': 0.5 }
	},
	bgFocalPointMobile: {
		type: 'object',
		default: { 'x': 0.5, 'y': 0.5 }
	},
	enableFocalPointPC: {
	  type: 'boolean',
	  default: false
	},
	enableFocalPointTablet: {
	  type: 'boolean',
	  default: false
	},
	enableFocalPointMobile: {
	  type: 'boolean',
	  default: false
	},
};

// save1_101_0 から attributes を変更
const blockAttributes9 = {
	...blockAttributes8,
	bgOffsetTop: {
		type: 'number',
		default: 0
	},
	bgOffsetBottom: {
		type: 'number',
		default: 0
	},
	bgOffsetLeft: {
		type: 'number',
		default: 0
	},
	bgOffsetRight: {
		type: 'number',
		default: 0
	},
	bgOffsetUnit: {
		type: 'string',
		default: 'px'
	},
	bgOffsetDisableMobile: {
		type: 'boolean',
		default: false
	},
};

const deprecated = [
	{
		attributes: blockAttributes9,
		save: save1_102_0,
	},
	{
		attributes: blockAttributes8,
		save: save1_101_0,
	},
	{
		attributes: blockAttributes7,
		save: save1_93_2,
	},
	{
		attributes: blockAttributes7,
		save: save1_93_0,
	},
	{
		attributes: blockAttributes6,
		save: save1_92_1,
		migrate: (attributes) => {
			return {
				...attributes,
				relAttribute: attributes.relAttribute ?? '',
				linkDescription: attributes.linkDescription ?? '',
			};
		},
	},
	{
		attributes: blockAttributes6,
		save: save1_89_0,
	},
	{
		attributes: blockAttributes6,
		save: save1_76_0,
	},
	{
		attributes: blockAttributes5,
		save: save1_71_0,
	},
	{
		attributes: blockAttributes4,
		save: save1_64_0,
	},
	{
		attributes: blockAttributes3,
		save: save1_61_2,
	},
	{
		attributes: blockAttributes3,
		save: save1_60_0,
	},
	{
		attributes: blockAttributes3,
		save: save1_50_1,
	},
	//ブロックテンプレート用のdeprecated
	{
		attributes: blockAttributes3,
		save: save1_36_2,
	},
	{
		attributes: blockAttributes2,
		save: save1_34_1,
	},
	{
		attributes: blockAttributes2,
		save: save1_26_0,
	},
	{
		attributes: blockAttributes,
		save: save1_0_13,
	},
];

export default deprecated;
