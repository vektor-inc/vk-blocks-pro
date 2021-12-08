import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save003 from './0.0.3/save';
import save004 from './0.0.4/save';
import save0_37_1 from './0.37.1/save';
import save0_58_6 from './0.58.6/save';
import save0_58_7 from './0.58.7/save';
import save1_20_4 from './1.20.4/save';

const blockAttributes = {
	content: {
		source: 'html',
		selector: 'p',
	},
	balloonName: {
		source: 'html',
		selector: 'figcaption',
	},
	balloonType: {
		type: 'string',
		default: 'type-serif',
	},
	balloonBgColor: {
		type: 'string',
	},
	balloonAlign: {
		type: 'string',
		default: 'position-left',
	},
	IconImage: {
		type: 'string',
		default: null, // no image by default!
	},
};

const blockAttributes2 = {
	...blockAttributes,
	balloonImageType: {
		type: 'string',
		default: 'normal',
	},
}

const blockAttributes3 = {
	...blockAttributes2,
	balloonImageType: {
		type: 'string',
		default: 'normal', // no image by default!
	},
	balloonAnimation: {
		type: 'string',
		default: 'none', // no image by default!
	},
}

const blockAttributes4 = {
	...blockAttributes3,
	balloonImageType: {
		type: 'string',
		default: 'normal', // no image by default!
	},
	balloonAnimation: {
		type: 'string',
		default: 'none', // no image by default!
	},
	balloonBorder: {
		type: 'boolean',
		default: false,
	},
	balloonImageBorder: {
		type: 'boolean',
		default: false,
	},
	balloonBorderWidth: {
		type: 'string',
		default: 'thin',
	},
	balloonBorderColor: {
		type: 'string',
		default: null,
	},
}

const blockAttributes5 = {
	...blockAttributes4,
	balloonBorderColor: {
		type: 'string'
	},
	balloonBgColor: {
		type: 'string'
	},
}

const deprecated = [
	{
		attributes: blockAttributes5,
		save: save1_20_4,
	},
	{
		attributes: blockAttributes4,
		save: save0_58_7,
	},
	{
		attributes: blockAttributes4,
		save: save0_58_6,
	},
	{
		attributes: blockAttributes4,
		save: save004,
	},
	{
		attributes: blockAttributes3,
		save: save003,
	},
	{
		attributes: blockAttributes3,
		save: save002,
	},
	{
		attributes: blockAttributes2,
		save:save0_37_1,
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
