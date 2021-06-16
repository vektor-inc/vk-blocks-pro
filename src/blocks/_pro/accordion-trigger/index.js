/**
 * Accordion Trigger Block
 */
import { ReactComponent as Icon } from './icon.svg';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Accordion Trigger', 'vk-blocks'),
	icon: <Icon />,
	description: __(
		'This is the title area where you can freely add blocks.',
		'vk-blocks'
	),
	category: 'vk-blocks-cat',
	edit,
	save,
};
