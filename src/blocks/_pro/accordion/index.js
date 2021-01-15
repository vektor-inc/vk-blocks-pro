/**
 * Accordion Outer Block
 */
import { content, title } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Accordion', 'vk-blocks'),
	icon: <Icon />,
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/accordion-trigger',
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: title,
						},
					},
				],
			},
			{
				name: 'vk-blocks/accordion-target',
				innerBlocks: [
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
};
