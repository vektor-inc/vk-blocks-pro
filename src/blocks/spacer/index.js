/**
 * spacer block type
 */

import { __ } from '@wordpress/i18n';

import { ReactComponent as Icon } from './icon.svg';

import metadata from './block.json';
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
	},
	edit,
	save,
	// deprecated
};
