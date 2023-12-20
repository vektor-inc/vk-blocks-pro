/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const variations = [
	{
		name: 'category-badge',
		title: __('Category Badge', 'vk-blocks-pro'),
		isDefault: true,
		attributes: {
			textAlign: 'center',
			style: {
				typography: {
					fontSize: '0.8rem',
					fontWeight: '500',
				},
				spacing: {
					padding: {
						top: '0',
						bottom: '0',
						left: '1em',
						right: '1em',
					},
				},
			},
		},
		scope: ['inserter'],
	},
];

export default variations;
