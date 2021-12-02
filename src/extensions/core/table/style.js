import { __ } from '@wordpress/i18n';
import { registerBlockStyle } from '@wordpress/blocks';

registerBlockStyle('core/table', [
	{
		name: 'vk-table-border-top-bottom',
		label: __('Border Top Bottom', 'vk-blocks'),
	},

	{
		name: 'vk-table-border',
		label: __('Border', 'vk-blocks'),
	},

	{
		name: 'vk-table-border-stripes',
		label: __('Border / Stripes', 'vk-blocks'),
	},
]);
