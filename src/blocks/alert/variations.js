import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';
import { ReactComponent as IconSuccess } from './icon-success.svg';
import { ReactComponent as IconInfo } from './icon-info.svg';
import { ReactComponent as IconWarning } from './icon-warning.svg';

const variations = [
	{
		name: 'alert-success',
		title: __('Alert Success', 'vk-blocks-pro'),
		scope: ['inserter', 'transform'],
		icon: <IconSuccess />,
		attributes: {
			style: 'success',
			icon: '<i class="fa-solid fa-circle-check"></i>',
			iconText: __('Success', 'vk-blocks-pro'),
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __('This is a success alert.', 'vk-blocks-pro'),
				},
			},
		],
	},
	{
		name: 'alert-info',
		title: __('Alert Info', 'vk-blocks-pro'),
		scope: ['inserter', 'transform'],
		icon: <IconInfo />,
		attributes: {
			style: 'info',
			icon: '<i class="fa-solid fa-circle-info"></i>',
			iconText: __('Information', 'vk-blocks-pro'),
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __(
						'This is a information alert.',
						'vk-blocks-pro'
					),
				},
			},
		],
	},
	{
		name: 'alert-warning',
		title: __('Alert Warning', 'vk-blocks-pro'),
		scope: ['inserter', 'transform'],
		icon: <IconWarning />,
		attributes: {
			style: 'warning',
			icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
			iconText: __('Warning', 'vk-blocks-pro'),
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __('This is a warning alert.', 'vk-blocks-pro'),
				},
			},
		],
	},
	{
		name: 'alert-danger',
		title: __('Alert Danger', 'vk-blocks-pro'),
		scope: ['inserter', 'transform'],
		icon:  <Icon />,
		attributes: {
			style: 'danger',
			icon: '<i class="fa-solid fa-circle-exclamation"></i>',
			iconText: __('Danger', 'vk-blocks-pro'),
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __('This is a danger alert.', 'vk-blocks-pro'),
				},
			},
		],
	},
];

export default variations;
