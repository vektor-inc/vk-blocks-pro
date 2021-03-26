/**
 * Tab Block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import { title, content } from '@vkblocks/utils/example-data';

import deprecated from './deprecated/index';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Tab', 'vk-blocks'), // Block title.
	icon: <Icon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	example: {
		innerBlocks: [
			{
				name: 'vk-blocks/tab-item',
				attributes: {
					title,
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content,
						},
					},
				],
			},
			{
				name: 'vk-blocks/tab-item',
				attributes: {
					title,
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content,
						},
					},
				],
			},
			{
				name: 'vk-blocks/tab-item',
				attributes: {
					title,
				},
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
