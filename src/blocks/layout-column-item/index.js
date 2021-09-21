/**
 * Laypit Column Item block type
 *
 */
import { __ } from '@wordpress/i18n';
import edit from './edit';
import { ReactComponent as Icon } from './icon.svg';
import metadata from './block.json';
import save from './save';
//import { deprecated } from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Layout Column Item', 'vk-blocks'),
	icon: <Icon />,
	example: {
		attributes: {},
	},
	edit,
	save,
};
