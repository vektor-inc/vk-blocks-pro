/**
 * timeline block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { title } from '@vkblocks/utils/example-data';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
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
};
