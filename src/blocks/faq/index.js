/**
 * Faq block type
 *
 */
/**
 * Alert block type
 *
 */
import { title, content } from '@vkblocks/utils/example-data';
import { ReactComponent as Icon } from './icon.svg';
import deprecated from './deprecated/';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <Icon />,
	styles: [
		{
			name: 'vk_faq-normal',
			label: __('Normal', 'vk-blocks-pro'),
			isDefault: true,
		},
		{
			name: 'vk_faq-bgfill-circle',
			label: __('Bgfill Circle', 'vk-blocks-pro'),
		},
		{
			name: 'vk_faq-bgfill-square',
			label: __('Bgfill Square', 'vk-blocks-pro'),
		},
		{
			name: 'vk_faq-bgfill-rounded',
			label: __('Bgfill Rounded', 'vk-blocks-pro'),
		},
		{
			name: 'vk_faq-border-circle',
			label: __('Border Circle', 'vk-blocks-pro'),
		},
		{
			name: 'vk_faq-border-square',
			label: __('Border Square', 'vk-blocks-pro'),
		},
		{
			name: 'vk_faq-border-rounded',
			label: __('Border Rounded', 'vk-blocks-pro'),
		},
	],
	example: {
		attributes: {
			heading: title,
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
	save,
	edit,
	deprecated,
};
