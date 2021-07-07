/**
 * Column Responsive block type
 *
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';
import deprecated from './deprecated/';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Grid Column', 'vk-blocks'),
	icon: <Icon />,
	edit,
	save,
	deprecated,
};
