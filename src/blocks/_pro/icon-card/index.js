/**
 * Pr Card block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { title, content, iconUser } from '@vkblocks/utils/example-data';

import deprecated from './deprecated/';
import edit from './edit';
import metadata from './block.json';
import save from './save';

import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Icon Card', 'vk-blocks'),
	icon: <Icon />,
	description: __(
		'Display card with icons, headings, text, and links.',
		'vk-blocks'
	),
	example: {
		attributes: {
			col_xs: 1,
			col_sm: 1,
			col_md: 1,
			col_lg: 1,
			col_xl: 1,
			col_xxl: 1,
			activeControl: '{"title":"center","text":"center"}',
		},
		innerBlocks: [
			{
				name: 'vk-blocks/icon-card-item',
				attributes: {
					col_xs: 1,
					col_sm: 1,
					col_md: 1,
					col_lg: 1,
					col_xl: 1,
					col_xxl: 1,
					activeControl: '{"title":"center","text":"center"}',
					urlOpenType: false,
					color: '#0693e3',
					bgType: '1',
					heading: title,
					content,
					faIcon: iconUser,
				},
			},
		],
	},
	edit,
	save,
	deprecated,
};
