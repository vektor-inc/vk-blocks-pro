/**
 * Accordion Target Block
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated/';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Accordion Target', 'vk-blocks'),
	icon: <Icon />,
	category: 'vk-blocks-cat',
	edit,
	save,
	deprecated,
};
