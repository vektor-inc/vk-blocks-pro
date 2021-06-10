/**
 * timeline block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { title } from '@vkblocks/utils/example-data';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Timeline', 'vk-blocks'),
	icon: <Icon />,
	description: __('Displays a simple schedule and other information that is useful for explaining the order.', 'vk-blocks'),
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/timeline-item',
				attributes: {
					label: '6:00AM',
					color: '#337ab7',
					style: 'outlined',
					styleLine: 'default',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
				],
			},
		],
	},
	edit,
	save,
	deprecated,
};
