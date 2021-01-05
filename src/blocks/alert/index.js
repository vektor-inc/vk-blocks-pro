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

import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Alert', 'vk-blocks'),
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
};
