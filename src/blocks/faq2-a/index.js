/**
 * FAQ Answer Block
 */
import { content } from '../../utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content,
				},
			},
		],
	},
	edit,
	save,
	deprecated,
};
