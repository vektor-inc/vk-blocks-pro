/**
 * child-page block type
 *
 */

import { __ } from '@wordpress/i18n';
import { ReactComponent as Icon } from './icon.svg';

// import block files
import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Child page list', 'vk-blocks'),
	icon: <Icon />,
	edit,
};
