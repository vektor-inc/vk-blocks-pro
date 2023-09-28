/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const SCOPE_OPTIONS = [
	{
		name: 'inserter',
		label: __('インサーター', 'vk-blocks-pro'),
		help: __('インサーターに表示されます', 'vk-blocks-pro'),
	},
	{
		name: 'block',
		label: __('ブロック', 'vk-blocks-pro'),
		help: __('バリエーションピッカーに表示されます', 'vk-blocks-pro'),
	},
	{
		name: 'transform',
		label: __('変換', 'vk-blocks-pro'),
		help: __('ブロックバリエーション変換で表示されます', 'vk-blocks-pro'),
	},
];
