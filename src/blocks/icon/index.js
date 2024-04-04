/**
 * icon block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { url, iconUser } from '@vkblocks/utils/example-data';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { deprecated } from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	example: {
		attributes: {
			faIcon: iconUser,
			iconSize: 36,
			iconSizeUnit: 'px',
			iconMargin: 22,
			iconMarginUnit: 'px',
			iconRadius: 50,
			iconType: '0',
			iconAlign: 'left',
			iconColor: 'undefined',
			iconFontColor: 'undefined',
			iconUrl: url,
			iconTarget: false,
		},
	},
	edit,
	save,
	deprecated,
};
