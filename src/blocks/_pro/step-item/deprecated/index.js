/* eslint camelcase: 0 */
import save1_36_2 from './1.36.2/save';
import save1_20_0 from './1.20.0/save';
import save0_60_1 from './0.60.1/save';
import save0_0_2 from './0.0.2/save';
import save0_0_1 from './0.0.1/save';
import save0_0_0 from './0.0.0/save';

const blockAttributes = {
	color: {
		type: 'string',
		default: '#337ab7',
	},
	style: {
		type: 'string',
		default: 'solid',
	},
	styleLine: {
		type: 'string',
		default: 'default',
	},
	dotCaption: {
		type: 'string',
		default: 'STEP',
	},
	dotNum: {
		type: 'number',
		default: 1,
	},
};

const blockAttributes2 = {
	...blockAttributes,
	faIcon: {
		type: 'string',
		default: '',
	},
}

const deprecated = [
	{
		attributes: blockAttributes2,
		save: save1_36_2,
	},
	{
		attributes: blockAttributes2,
		save: save1_20_0,
	},
	{
		attributes: blockAttributes2,
		save: save0_60_1,
	},
	{
		attributes: blockAttributes2,
		save: save0_0_2,
	},
	{
		attributes: blockAttributes2,
		save: save0_0_1,
	},
	{
		attributes: blockAttributes,
		save: save0_0_0,
	},
];
export default deprecated;
