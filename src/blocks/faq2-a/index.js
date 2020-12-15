/**
 * FAQ Answer Block
 */
import { content } from '../../utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import deprecated from './deprecated/index';
import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('FAQ Answer', 'vk-blocks'),
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
