/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const variations = [
	{
		name: 'single-term',
		title: __('Single Terms', 'vk-blocks-pro'),
		isDefault: true,
		attributes: {
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
