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
	styles: [
		{
			name: 'vk_accordion-no-background-color',
			label: __('No background color', 'vk-blocks'),
			isDefault: true,
		},
		{
			name: 'vk_accordion-no-background-color-border',
			label: __('No background color Border', 'vk-blocks'),
		},
		{
			name: 'vk_accordion-with-background-color',
			label: __('With background color', 'vk-blocks'),
		},
		{
			name: 'vk_accordion-with-background-color-border',
			label: __('With background color Border', 'vk-blocks'),
		},
		{
			name: 'vk_accordion-with-background-color-rounded',
			label: __('With background color Rounded', 'vk-blocks'),
		},
		{
			name: 'vk_accordion-with-background-color-rounded-border',
			label: __('With background color Rounded Border', 'vk-blocks'),
		},
	],
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
