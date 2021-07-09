/**
 * icon block type
 *
 */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import { title, iconName, url, iconUser } from '@vkblocks/utils/example-data';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { deprecated } from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Icon', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {
			iconUrl: url,
			iconTarget: false,
			iconSize: 'md',
			iconType: '0',
			iconColor: 'undefined',
			iconAlign: 'left',
			fontAwesomeIconBefore: iconUser,
			fontAwesomeIconAfter: iconUser,
		},
	},
	edit,
	save,
	deprecated,
};
