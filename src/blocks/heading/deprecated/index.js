import save000 from './0.0.0/save';
import save001 from './0.0.1/save';

const blockAttributes = {
	anchor: {
		type: 'string',
		source: 'attribute',
		attribute: 'id',
		selector: '*',
	},
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
	},
	title: {
		type: 'string',
		source: 'html',
		selector: 'h1,h2,h3,h4,h5,h6',
		default: '',
	},
	titleColor: {
		type: 'string',
		default: '#000000',
	},
	titleSize: {
		type: 'number',
		default: 2.6,
	},
	titleMarginBottom: {
		type: 'number',
	},
	subText: {
		source: 'html',
		selector: 'p',
		default: '',
	},
	subTextFlag: {
		type: 'string',
		default: 'on',
	},
	subTextColor: {
		type: 'string',
		default: '#000000',
	},
	subTextSize: {
		type: 'number',
		default: 1.8,
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save: save001,
	},
	{
		attributes: blockAttributes,
		save: save000,
	},
];
export default deprecated;
