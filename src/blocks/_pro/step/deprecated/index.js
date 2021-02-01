/* eslint camelcase: 0 */
import save0_60_1 from './0.60.1/save';

const blockAttributes = {
	firstDotNum: {
		type: 'number',
		default: 1,
	},
};

const deprecated = [
	{
		attributes: blockAttributes,
		save0_60_1,
	},
];
export default deprecated;
