const { __ } = wp.i18n;
import { faSchema } from './font-awesome-new';
import { title, iconUser, content } from '../../utils/example-data';

export const originalSchema = {
	heading: {
		type: 'string',
		source: 'html',
		selector: 'h4',
	},
	color: {
		type: 'string',
		default: 'red',
	},
	bgColor: {
		type: 'string',
		default: 'transparent',
	},
};

const mergeSchema = () => {
	return Object.assign(originalSchema, faSchema);
};

export const schema = mergeSchema();

export const example = {
	attributes: {
		heading: title,
		color: 'red',
		faIcon: iconUser,
	},
	innerBlocks: [
		{
			name: 'core/paragraph',
			attributes: {
				content,
			},
		},
	],
};
