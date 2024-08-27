/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReactComponent as Icon } from './icon.svg';

const variations = [
	{
		name: 'new-badge',
		title: __('New Badge', 'vk-blocks-pro'),
		icon: <Icon />,
		isDefault: true,
		attributes: {
			textAlign: 'center',
			style: {
				color: {
					text: '#ff0000',
				},
				typography: {
					fontStyle: 'normal',
					fontWeight: '700',
				},
			},
		},
		scope: ['inserter'],
	},
];

export default variations;
