/**
 * Icon Outer Block
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Icon Outer', 'vk-blocks'),
	icon: <Icon />,
	styles: [],
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/icon',
			},
			{
				name: 'vk-blocks/icon',
			},
		],
	},
	edit,
	save,
};
