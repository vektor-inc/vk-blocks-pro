/**
 * Buton Outer Block
 */

import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import { title, iconName, url, iconUser } from '@vkblocks/utils/example-data';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Button Outer', 'vk-blocks'),
	icon: <Icon />,
	styles: [],
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/button',
				attributes: {
					content: iconName,
					subCaption: title,
					buttonUrl: url,
					buttonTarget: false,
					buttonSize: 'md',
					buttonType: '0',
					buttonColor: 'primary',
					buttonAlign: 'left',
					fontAwesomeIconBefore: iconUser,
					fontAwesomeIconAfter: iconUser,
				},
			},
			{
				name: 'vk-blocks/button',
				attributes: {
					content: iconName,
					subCaption: title,
					buttonUrl: url,
					buttonTarget: false,
					buttonSize: 'md',
					buttonType: '0',
					buttonColor: 'primary',
					buttonAlign: 'left',
					fontAwesomeIconBefore: iconUser,
					fontAwesomeIconAfter: iconUser,
				},
			},
		],
	},
	edit,
	save,
};
