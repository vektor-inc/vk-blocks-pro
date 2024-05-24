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
	title: __('Tab', 'vk-blocks-pro'), // Block title.
	icon: <Icon />, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	styles: [
		{
			name: 'vk_tab_labels-normal',
			label: __('Normal', 'vk-blocks-pro'),
			isDefault: true,
		},
		{
			name: 'vk_tab_labels-line',
			label: __('Line', 'vk-blocks-pro'),
		},
	],
	edit,
	save,
};
