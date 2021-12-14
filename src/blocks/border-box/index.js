/**
 * Title group block type
 *
 */
import { __ } from '@wordpress/i18n';

import { ReactComponent as Icon } from './icon.svg';
import { title, iconUser, content } from '@vkblocks/utils/example-data';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	category: 'vk-blocks-cat',
	example: {
		attributes: {
			heading: title,
			color: 'red',
			borderColor: 'undefined',
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
	},
	styles: [
		{
			name: 'vk_borderBox-style-solid-kado-tit-tab',
			label: __('Solid Angle Tab', 'vk-blocks'),
			isDefault: true,
		},
		{
			name: 'vk_borderBox-style-solid-round-tit-tab',
			label: __('Solid Round Tab', 'vk-blocks'),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-banner',
			label: __('Solid Angle Banner', 'vk-blocks'),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-onborder',
			label: __('Solid Angle Onborder', 'vk-blocks'),
		},
		{
			name: 'vk_borderBox-style-solid-kado-tit-inner',
			label: __('Solid Angle Inner', 'vk-blocks'),
		},
		{
			name: 'vk_borderBox-style-solid-kado-iconFeature',
			label: __('Solid Angle iconFeature', 'vk-blocks'),
		},
	],
	edit,
	save,
	deprecated,
};
