/**
 * Buton Outer Block
 */

import { ReactComponent as Icon } from './icon.svg';

import { title, iconName, url, iconUser } from '@vkblocks/utils/example-data';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
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
					gap: null,
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
					gap: null,
					fontAwesomeIconBefore: iconUser,
					fontAwesomeIconAfter: iconUser,
				},
			},
		],
	},
	edit,
	save,
};
