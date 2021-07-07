/**
 * post-list block type
 *
 */
// import React
import { ReactComponent as Icon } from './icon.svg';

// import WordPress Scripts
import { __ } from '@wordpress/i18n';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Selected Post List Item', 'vk-blocks'),
	icon: <Icon />,
	edit,
};
