/**
 * Flow block type
 *
 */
import deprecated from './deprecated/';
import { ReactComponent as Icon } from './icon.svg';
import { content, title, iconPicture } from '../../utils/example-data';
import edit from './edit';
import metadata from './block.json';
import save from './save';

import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Flow', 'vk-blocks'), // Block title.
	icon: <Icon />,
	example: {
		attributes: {
			heading: title,
			content,
			arrowFlag: 'vk_flow-arrow-on',
			insertImage: iconPicture,
		},
	},
	edit,
	save,
	deprecated,
};
