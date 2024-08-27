/**
 * Accordion Outer Block
 */
import { content, title } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	styles: [
		{
			name: 'vk_accordion-no-background-color',
			label: __('No background color', 'vk-blocks-pro'),
			isDefault: true,
		},
		{
			name: 'vk_accordion-no-background-color-border',
			label: __('No background color / Border', 'vk-blocks-pro'),
		},
		{
			name: 'vk_accordion-background-color',
			label: __('Background color', 'vk-blocks-pro'),
		},
		{
			name: 'vk_accordion-background-color-border',
			label: __('Background color / Border', 'vk-blocks-pro'),
		},
		{
			name: 'vk_accordion-background-color-rounded',
			label: __('Background color / Rounded ', 'vk-blocks-pro'),
		},
		{
			name: 'vk_accordion-background-color-rounded-border',
			label: __('Background color / Rounded / Border', 'vk-blocks-pro'),
		},
		{
			name: 'vk_accordion-plain',
			label: __('Plain', 'vk-blocks-pro'),
		},
	],
	example: {
		attributes: {
			containerClass: 'vk_accordion',
		},
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
	deprecated,
};
