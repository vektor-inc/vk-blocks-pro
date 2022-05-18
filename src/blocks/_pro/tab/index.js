/**
 * Tab Block
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Tab', 'vk-blocks'), // Block title.
	icon: <Icon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	styles: [
		{
			name: 'vk_tab_labels-normal',
			label: __('Normal', 'vk-blocks'),
			isDefault: true,
		},
		{
			name: 'vk_tab_labels-normal-no-frame',
			label: __('Normal No Frame', 'vk-blocks'),
		},
		{
			name: 'vk_tab_labels-speech-balloon',
			label: __('Speech Balloon', 'vk-blocks'),
		},
		{
			name: 'vk_tab_labels-speech-balloon-no-frame',
			label: __('Speech Balloon No Frame', 'vk-blocks'),
		},
		{
			name: 'vk_tab_labels-line',
			label: __('Line', 'vk-blocks'),
		},
		{
			name: 'vk_tab_labels-line-no-frame',
			label: __('Line No Frame', 'vk-blocks'),
		},
		{
			name: 'vk_tab_labels-line-simple',
			label: __('Line Simple', 'vk-blocks'),
		},
	],
	edit,
	save,
};
