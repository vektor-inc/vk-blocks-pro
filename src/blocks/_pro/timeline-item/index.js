/**
 * timeline-item block type
 *
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
	title: __('Timeline Item', 'vk-blocks'),
	icon: <Icon />,
	description: __(
		'This element sets the label, color, and style of the timeline.',
		'vk-blocks'
	),
	parent: ['vk-blocks/timeline'],
	edit,
	save,
	deprecated,
};
