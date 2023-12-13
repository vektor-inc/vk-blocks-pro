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
					fontStyle: 'normal',
					fontWeight: '700',
				},
			},
		},
		scope: ['inserter'],
	},
];

export default variations;
