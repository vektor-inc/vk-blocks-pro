/**
 * Alert block type
 *
 */
import { content } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import deprecated from './deprecated/index';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import variations from './variations';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			style: 'info',
			content,
		},
	},
	save,
	edit,
	deprecated,
	variations,
};
