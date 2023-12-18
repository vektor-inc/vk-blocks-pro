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
					fontWeight: '700',
				},
				spacing: {
					padding: {
						top: '0',
						bottom: '0',
						left: '5px',
						right: '5px',
					},
				},
			},
		},
		scope: ['inserter'],
	},
];

export default variations;
