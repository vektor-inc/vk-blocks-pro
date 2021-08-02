/**
 * icon block type
 *
 */
import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import { url, iconUser } from '@vkblocks/utils/example-data';
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
			iconSize: 80,
			iconMargin: 0,
			iconRadius: 0,
			iconUnit: 'px',
			iconType: '0',
			iconAlign: 'left',
			color: 'undefined',
			faIcon: iconUser,
		},
	},
	edit,
	save,
	deprecated,
};
