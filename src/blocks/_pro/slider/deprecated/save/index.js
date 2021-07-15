/* eslint camelcase: 0 */
import save1_9_1 from './1.9.1/save';
import save1_2_1 from './1.2.1/save';
import save1_0_6 from './1.0.6/save';
import save0_60_1 from './0.60.1/save';
import save0_56_3 from './0.56.3/save';
import save0_49_1 from './0.49.1/save';

const blockAttributes = {
	unit: {
		type: 'string',
		default: 'px',
	},
	pc: {
		type: 'number',
		default: 600,
	},
	tablet: {
		type: 'number',
		default: 600,
	},
	mobile: {
		type: 'number',
		default: 600,
	},
	autoPlay: {
		type: 'boolean',
		default: true,
	},
	autoPlayDelay: {
		type: 'number',
		default: 2500,
	},
	pagination: {
		type: 'boolean',
		default: true,
	},
	clientId: {
		type: 'string',
		default: '',
	},
	width: {
		type: 'string',
		default: '',
	},
	loop: {
		type: 'boolean',
		default: true,
	},
	effect: {
		type: 'string',
		default: 'slide',
	},
	speed: {
		type: 'number',
		default: 300,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	slidesPerView: {
		type: 'number',
		default: 1
	},
	slidesPerGroup: {
		type: 'number',
		default: 1
	}
}

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_9_1,
	},
	{
		attributes: blockAttributes,
		save: save1_2_1,
	},
	{
		attributes: blockAttributes,
		save: save1_0_6,
	},
	{
		attributes: blockAttributes,
		save: save0_60_1,
	},
	{
		attributes: blockAttributes,
		save: save0_56_3,
	},
	{
		attributes: blockAttributes,
		save: save0_49_1,
	},
];

export default deprecated;
