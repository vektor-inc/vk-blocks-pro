import save000 from './0.0.0/save';
import save001 from './0.0.1/save';
import save002 from './0.0.2/save';
import save003 from './0.0.3/save';
import save004 from './0.0.4/save';
import save005 from './0.58.6/save';
import save006 from './0.58.7/save';

const blockAttributes = {
	attributes: {
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
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save000,
	},
	{
		attributes: {
			...blockAttributes,
			balloonImageType: {
				type: 'string',
				default: 'normal',
			},
		},
		save: save001,
	},
	{
		attributes: {
			...blockAttributes,
			balloonImageType: {
				type: 'string',
				default: 'normal', // no image by default!
			},
			balloonAnimation: {
				type: 'string',
				default: 'none', // no image by default!
			},
		},
		save: save002,
	},
	{
		attributes: {
			...blockAttributes,
			balloonImageType: {
				type: 'string',
				default: 'normal', // no image by default!
			},
			balloonAnimation: {
				type: 'string',
				default: 'none', // no image by default!
			},
		},
		save: save003,
	},
	{
		attributes: {
			...blockAttributes,
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
		},
		save: save004,
	},
	{
		attributes: {
			...blockAttributes,
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
		},
		save: save005,
	},
	{
		attributes: {
			...blockAttributes,
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
				default: '#cccccc',
			},
			balloonBgColor: {
				type: 'string',
				default: '#f5f5f5',
			},
		},
		save: save006,
	},
];
export default deprecated;
