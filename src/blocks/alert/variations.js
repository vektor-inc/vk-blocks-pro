import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';

const variations = [
	{
		name: 'alert-success',
		title: __('Alert Success', 'vk-blocks'),
		icon: <Icon />,
		scope: ['block', 'inserter', 'transform'],
		attributes: {
			style: 'success',
			content: __('This is success alert.', 'vk-blocks'),
		},
	},
	{
		name: 'alert-info',
		title: __('Alert Info', 'vk-blocks'),
		icon: <Icon />,
		scope: ['block', 'inserter', 'transform'],
		attributes: {
			style: 'info',
			content: __('This is info alert.', 'vk-blocks'),
		},
	},
	{
		name: 'alert-warning',
		title: __('Alert Warning', 'vk-blocks'),
		icon: <Icon />,
		scope: ['block', 'inserter', 'transform'],
		attributes: {
			style: 'warning',
			content: __('This is warning alert.', 'vk-blocks'),
		},
	},
	{
		name: 'alert-danger',
		title: __('Alert Danger', 'vk-blocks'),
		icon: <Icon />,
		scope: ['block', 'inserter', 'transform'],
		attributes: {
			style: 'danger',
			content: __('This is danger alert.', 'vk-blocks'),
		},
	},
];

export default variations;
