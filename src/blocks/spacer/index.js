/**
 * spacer block type
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import deprecated from './deprecated/index';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Responsive Spacer', 'vk-blocks'),
	icon: <Icon />,
	example: {
		anchor: null,
		spaceType: 'height',
		unit: 'px',
		pc: 40,
		tablet: 30,
		mobile: 20,
		spaceSize: 'custom',
	},
	edit,
	save,
	deprecated,
};
