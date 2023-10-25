import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save003 from './0.0.3/save';
import save004 from './0.0.4/save';
import save005 from './0.0.5/save';
import save006 from './0.0.6/save';
import save007 from './0.0.7/save';
import save008 from './0.0.8/save';
import save009 from './0.0.9/save';
import save0_37_1 from './0.37.1/save';
import save0_60_0 from './0.60.0/save';
import save1_0_13 from './1.0.13/save';
import save1_26_0 from './1.26.0/save';
import save1_34_1 from './1.34.1/save';
import save1_36_2 from './1.36.2/save';
import save1_50_1 from './1.50.1/save';
import save1_60_0 from './1.60.0/save';
import save1_61_2 from './1.61.2/save';

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
		default: '#000',
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	defaultBgColor: {
		type: 'string',
		default: '#f3f4f5',
	},
};

const blockAttributes3 = {
	...blockAttributes2,
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

const blockAttributes4 = {
	...blockAttributes3,
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
const blockAttributes5 = {
	...blockAttributes4,
	clientId: {
		type: 'string',
	},
	blockId: {
		type: 'string',
	},
};

const deprecated = [
	{
		attributes: blockAttributes5,
		save: save1_61_2,
	},
	{
		attributes: blockAttributes5,
		save: save1_60_0,
	},
	{
		attributes: blockAttributes5,
		save: save1_50_1,
	},
	//ブロックテンプレート用のdeprecated
	{
		attributes: blockAttributes5,
		save: save1_36_2,
	},
	{
		attributes: blockAttributes4,
		save: save1_34_1,
	},
	{
		attributes: blockAttributes4,
		save: save1_26_0,
	},
	{
		attributes: blockAttributes3,
		save: save1_0_13,
	},
	{
		attributes: blockAttributes3,
		save: save0_60_0,
	},
	{
		attributes: blockAttributes3,
		save: save0_37_1,
	},
	{
		attributes: blockAttributes3,
		save: save009,
	},
	{
		attributes: blockAttributes2,
		save: save008,
	},
	{
		attributes: blockAttributes2,
		save: save007,
	},
	{
		attributes: blockAttributes2,
		save: save006,
	},
	{
		attributes: blockAttributes2,
		save: save005,
	},
	{
		attributes: blockAttributes2,
		save: save004,
	},
	{
		attributes: blockAttributes2,
		save: save003,
	},
	{
		attributes: blockAttributes2,
		save: save002,
	},
	{
		attributes: blockAttributes2,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];

export default deprecated;
