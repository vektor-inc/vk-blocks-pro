/* eslint camelcase: 0 */
import save1_19_1 from './1.19.1/save';
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

const deprecated = [
	{
		attributes: {
			...blockAttributes,
			faIcon: {
				type: 'string',
				default: '',
			},
		},
		save: save1_19_1,
	},
	{
		attributes: {
			...blockAttributes,
			faIcon: {
				type: 'string',
				default: '',
			},
		},
		save: save0_60_1,
	},
	{
		attributes: {
			...blockAttributes,
			faIcon: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_2,
	},
	{
		attributes: {
			...blockAttributes,
			faIcon: {
				type: 'string',
				default: '',
			},
		},
		save: save0_0_1,
	},
	{
		attributes: blockAttributes,
		save: save0_0_0,
	},
];
export default deprecated;
