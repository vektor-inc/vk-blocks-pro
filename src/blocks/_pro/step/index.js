/**
 * step block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { title, content } from '@vkblocks/utils/example-data';

import deprecated from './deprecated/index';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	example: {
		attributes: {
			firstDotNum: 1,
		},
		innerBlocks: [
			{
				name: 'vk-blocks/step-item',
				attributes: {
					style: 'solid',
					styleLine: 'default',
					dotCaption: 'STEP',
					dotNum: 1,
					faIcon: '',
				},
				innerBlocks: [
					{
						name: 'core/heading',
						attributes: {
							level: 4,
							content: title,
						},
					},
					{
						name: 'core/paragraph',
						attributes: {
							content,
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
