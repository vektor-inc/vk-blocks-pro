import { ReactComponent as Icon } from './icon.svg';
import { React } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import edit from './edit';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __('Page Content', 'vk-blocks'),
	icon: <Icon />,
	edit,
};
