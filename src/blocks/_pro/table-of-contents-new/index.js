/**
 * table-of-contents-new-new block type
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
	title: __('Table of Contents', 'vk-blocks'),
	icon: <Icon />,
	description: __('This is a table of contents that is automatically generated according to the headings when added.', 'vk-blocks'),
	edit,
	save,
	deprecated,
};
